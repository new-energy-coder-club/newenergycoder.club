import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation, Clock, Route, ExternalLink, Compass } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import NECBuilding from '@/image/NEC-A416.png?url'

interface LocationInfo {
  latitude: number
  longitude: number
  address: string
}

interface AmapLocationProps {
  className?: string
}

// 高德地图API配置
const AMAP_CONFIG = {
  key: '1ca01fb0f1c18a620b7a4eeb5b01c637',
  securityJsCode: '56b9003040769f3afb14593ca6c4a8ae',
  serviceUrl: '/_AMapService/' // Nginx代理路径
}

// 常州工学院坐标 (根据公开信息获取的准确坐标)
const DESTINATION = {
  longitude: 119.9736,
  latitude: 31.8117,
  address: '江苏常州新北区辽河路666号，东一门，玉衡楼'
}

// 计算两点间距离 (使用Haversine公式)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // 地球半径 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// 估算行驶时间 (基于距离和平均速度)
function estimateDuration(distance: number): string {
  const avgSpeed = 40 // 平均速度 40km/h (城市道路)
  const hours = distance / avgSpeed
  const minutes = Math.round(hours * 60)
  
  if (minutes < 60) {
    return `${minutes} 分钟`
  } else {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}小时${m > 0 ? m + '分钟' : ''}`
  }
}

export function AmapLocation({ className }: AmapLocationProps) {
  const [userLocation, setUserLocation] = useState<LocationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [distance, setDistance] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const { toast } = useToast()

  // 获取用户位置
  const getUserLocation = () => {
    setIsLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          try {
            // 使用高德地图逆地理编码获取地址
            const response = await fetch(
              `${AMAP_CONFIG.serviceUrl}v3/geocode/regeo?key=${AMAP_CONFIG.key}&location=${longitude},${latitude}&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0&jscode=${AMAP_CONFIG.securityJsCode}`
            )
            const data = await response.json()
            const address = data.regeocode?.formatted_address || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            
            setUserLocation({ latitude, longitude, address })
            
            // 计算距离和时间
            const dist = calculateDistance(latitude, longitude, DESTINATION.latitude, DESTINATION.longitude)
            const distanceStr = dist.toFixed(1) + ' km'
            const durationStr = estimateDuration(dist)
            
            setDistance(distanceStr)
            setDuration(durationStr)
            
            toast({
              title: '定位成功',
              description: `距离目的地 ${distanceStr}，预计 ${durationStr}`
            })
          } catch (error) {
            console.error('获取地址失败:', error)
            // 即使地址获取失败，也保存坐标
            const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            setUserLocation({ latitude, longitude, address })
            
            const dist = calculateDistance(latitude, longitude, DESTINATION.latitude, DESTINATION.longitude)
            const distanceStr = dist.toFixed(1) + ' km'
            const durationStr = estimateDuration(dist)
            
            setDistance(distanceStr)
            setDuration(durationStr)
            
            toast({
              title: '定位成功',
              description: `距离目的地 ${distanceStr}，预计 ${durationStr}`
            })
          } finally {
            setIsLoading(false)
          }
        },
        (error) => {
          console.error('定位失败:', error)
          let errorMessage = '请允许浏览器访问您的位置信息'
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '位置访问被拒绝，请在浏览器设置中允许位置访问'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = '位置信息不可用'
              break
            case error.TIMEOUT:
              errorMessage = '定位请求超时，请重试'
              break
          }
          
          toast({
            title: '定位失败',
            description: errorMessage,
            variant: 'destructive'
          })
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000 // 5分钟缓存
        }
      )
    } else {
      toast({
        title: '不支持定位',
        description: '您的浏览器不支持地理定位功能',
        variant: 'destructive'
      })
      setIsLoading(false)
    }
  }

  // 打开高德地图导航
  const openAmapNavigation = () => {
    if (!userLocation) {
      toast({
        title: '请先获取位置',
        description: '需要先获取您的当前位置才能导航',
        variant: 'destructive'
      })
      return
    }

    // 高德地图URI Scheme
    const url = `https://uri.amap.com/navigation?from=${userLocation.longitude},${userLocation.latitude},我的位置&to=${DESTINATION.longitude},${DESTINATION.latitude},常州工学院玉衡楼&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=1`
    window.open(url, '_blank')
  }

  // 打开百度地图导航
  const openBaiduNavigation = () => {
    if (!userLocation) {
      toast({
        title: '请先获取位置',
        description: '需要先获取您的当前位置才能导航',
        variant: 'destructive'
      })
      return
    }

    // 百度地图URI Scheme
    const url = `https://api.map.baidu.com/direction?origin=${userLocation.latitude},${userLocation.longitude}&destination=${DESTINATION.latitude},${DESTINATION.longitude}&mode=driving&region=常州&output=html&src=webapp.baidu.openAPIdemo`
    window.open(url, '_blank')
  }

  // 打开腾讯地图导航
  const openQQNavigation = () => {
    if (!userLocation) {
      toast({
        title: '请先获取位置',
        description: '需要先获取您的当前位置才能导航',
        variant: 'destructive'
      })
      return
    }

    // 腾讯地图URI Scheme
    const url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=我的位置&fromcoord=${userLocation.latitude},${userLocation.longitude}&to=常州工学院玉衡楼&tocoord=${DESTINATION.latitude},${DESTINATION.longitude}&policy=1&referer=myapp`
    window.open(url, '_blank')
  }

  return (
    <Card className={`glass-card overflow-hidden ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          校园位置导航
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 静态地图显示 */}
         <div className="w-full h-64 rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.1),transparent_50%)]" />
            <div className="text-center z-10">
              <Compass className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <h3 className="font-semibold mb-2 text-lg">常州工学院玉衡楼</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                {DESTINATION.address}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{DESTINATION.latitude.toFixed(4)}, {DESTINATION.longitude.toFixed(4)}</span>
              </div>
            </div>
          </div>
        
        {/* 位置信息 */}
        {userLocation && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">您的位置</p>
                <p className="text-xs text-muted-foreground break-all">{userLocation.address}</p>
              </div>
            </div>
            
            {distance && duration && (
              <div className="flex items-center gap-4 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Route className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{duration}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 获取位置按钮 */}
        <Button 
          onClick={getUserLocation} 
          disabled={isLoading}
          className="w-full"
          variant="outline"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
              定位中...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              获取我的位置
            </>
          )}
        </Button>
        
        {/* 导航按钮组 */}
        {userLocation && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">选择导航应用</p>
            <div className="grid grid-cols-1 gap-2">
              <Button 
                onClick={openAmapNavigation}
                className="w-full justify-start"
                variant="default"
              >
                <Navigation className="h-4 w-4 mr-2" />
                高德地图导航
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              
              <Button 
                onClick={openBaiduNavigation}
                className="w-full justify-start"
                variant="outline"
              >
                <Navigation className="h-4 w-4 mr-2" />
                百度地图导航
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
              
              <Button 
                onClick={openQQNavigation}
                className="w-full justify-start"
                variant="outline"
              >
                <Navigation className="h-4 w-4 mr-2" />
                腾讯地图导航
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
            </div>
          </div>
        )}
        
        {/* 目的地信息 */}
        <div className="bg-primary/5 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">目的地</p>
              <p className="text-xs text-muted-foreground">{DESTINATION.address}</p>
              <p className="text-xs text-muted-foreground mt-1">
                坐标: {DESTINATION.latitude}, {DESTINATION.longitude}
              </p>
            </div>
          </div>
        </div>
        
        {/* 地点图片 */}
        <div className="mt-4">
          <img 
            src={NECBuilding} 
            alt="常州工学院玉衡楼" 
            className="w-full h-64 rounded-lg object-cover shadow-lg border border-primary/20"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AmapLocation