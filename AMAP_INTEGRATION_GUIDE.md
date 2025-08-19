# 高德地图集成指南

本指南详细说明了如何在 Energy Coder Club 网站中集成高德地图定位导航功能。

## 📋 功能概述

### 已实现功能
- ✅ 浏览器定位获取用户当前位置
- ✅ 高德地图逆地理编码获取详细地址
- ✅ 精确距离计算（Haversine公式）
- ✅ 行驶时间估算
- ✅ 多平台地图导航（高德/百度/腾讯）
- ✅ 现代化UI界面设计

### 目标地点
- **名称**: 常州工学院玉衡楼
- **地址**: 江苏常州新北区辽河路666号，东一门，玉衡楼
- **坐标**: 31.8117, 119.9736

## 🔑 API配置信息

### 高德地图API密钥
```javascript
const AMAP_CONFIG = {
  key: '1ca01fb0f1c18a620b7a4eeb5b01c637',           // API Key
  securityJsCode: '56b9003040769f3afb14593ca6c4a8ae',  // 安全密钥
  serviceUrl: '/_AMapService/'                        // Nginx代理路径
}
```

### 密钥说明
- **Key名称**: NEC
- **Key**: 1ca01fb0f1c18a620b7a4eeb5b01c637
- **安全密钥**: 56b9003040769f3afb14593ca6c4a8ae

## 🚀 部署配置

### 1. Nginx代理配置

为了解决跨域问题并保护API密钥，需要配置Nginx代理服务器。

#### 配置文件位置
```bash
# 配置文件已创建在项目根目录
./nginx-amap-proxy.conf
```

#### 使用步骤

1. **复制配置文件内容到Nginx配置**
   ```bash
   # 将 nginx-amap-proxy.conf 内容添加到您的 nginx.conf 或单独的配置文件中
   sudo cp nginx-amap-proxy.conf /etc/nginx/sites-available/amap-proxy
   sudo ln -s /etc/nginx/sites-available/amap-proxy /etc/nginx/sites-enabled/
   ```

2. **修改配置中的路径**
   ```nginx
   # 修改为您的实际网站构建目录
   root /path/to/your/website/dist;
   ```

3. **测试并重启Nginx**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 2. 开发环境配置

#### Vite开发服务器代理配置

在 `vite.config.ts` 中添加代理配置：

```typescript
export default defineConfig({
  // ... 其他配置
  server: {
    proxy: {
      '/_AMapService': {
        target: 'https://restapi.amap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_AMapService/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 添加安全密钥
            const url = new URL(proxyReq.path, 'https://restapi.amap.com')
            url.searchParams.append('jscode', '56b9003040769f3afb14593ca6c4a8ae')
            proxyReq.path = url.pathname + url.search
          })
        }
      }
    }
  }
})
```

## 📱 组件使用说明

### 组件位置
```
src/components/ui/amap-location.tsx
```

### 在页面中使用
```tsx
import { AmapLocation } from '@/components/ui/amap-location'

// 在组件中使用
<AmapLocation className="w-full" />
```

### 功能特性

1. **定位功能**
   - 点击"获取我的位置"按钮
   - 浏览器会请求位置权限
   - 自动获取精确坐标和地址信息

2. **距离计算**
   - 使用Haversine公式计算直线距离
   - 基于城市道路平均速度估算行驶时间
   - 实时显示距离和预计到达时间

3. **导航功能**
   - 支持高德地图、百度地图、腾讯地图
   - 自动传递起点和终点坐标
   - 一键跳转到对应地图应用

## 🔧 技术实现细节

### API调用示例

```javascript
// 逆地理编码API调用
const response = await fetch(
  `${AMAP_CONFIG.serviceUrl}v3/geocode/regeo?key=${AMAP_CONFIG.key}&location=${longitude},${latitude}&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0&jscode=${AMAP_CONFIG.securityJsCode}`
)
```

### 距离计算算法

```javascript
// Haversine公式计算两点间距离
function calculateDistance(lat1, lon1, lat2, lon2) {
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
```

## 🛠️ 故障排除

### 常见问题

1. **定位失败**
   - 检查浏览器是否允许位置访问
   - 确保使用HTTPS协议（生产环境）
   - 检查网络连接

2. **API调用失败**
   - 检查Nginx代理配置是否正确
   - 验证API密钥是否有效
   - 查看浏览器控制台错误信息

3. **跨域问题**
   - 确保Nginx配置了正确的CORS头部
   - 检查代理路径是否正确

### 调试方法

```javascript
// 在浏览器控制台中测试API
fetch('/_AMapService/v3/geocode/regeo?key=1ca01fb0f1c18a620b7a4eeb5b01c637&location=119.9736,31.8117&jscode=56b9003040769f3afb14593ca6c4a8ae')
  .then(response => response.json())
  .then(data => console.log(data))
```

## 📈 性能优化

### 缓存策略
- 位置信息缓存5分钟
- API响应适当缓存
- 避免频繁的定位请求

### 用户体验优化
- 加载状态提示
- 错误信息友好显示
- 响应式设计适配移动端

## 🔒 安全考虑

1. **API密钥保护**
   - 使用Nginx代理隐藏真实API密钥
   - 配置安全密钥验证

2. **HTTPS部署**
   - 生产环境必须使用HTTPS
   - 地理定位API要求安全上下文

3. **权限控制**
   - 合理处理位置权限请求
   - 提供清晰的权限说明

## 📞 技术支持

如遇到问题，请检查：
1. 浏览器控制台错误信息
2. Nginx错误日志
3. 网络连接状态
4. API配额使用情况

---

**注意**: 本集成方案已针对常州工学院的具体需求进行优化，包含完整的定位、导航和用户体验功能。