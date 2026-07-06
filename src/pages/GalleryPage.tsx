import { useState, useMemo, useCallback, useEffect } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageIcon, ChevronLeft, ChevronRight, X, Grid3X3, Images } from 'lucide-react'
import { cn } from '@/lib/utils'
import galleryData from '@/data/gallery.json'

interface Photo {
  src: string
  alt: string
  filename: string
}

interface Album {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  cover: string
  count: number
  photos: Photo[]
}

const typedGalleryData = galleryData as Album[]
const PHOTOS_PER_PAGE = 30

/**
 * Derive a thumbnail URL from the original CDN URL.
 * Thumbnails are expected to live in `/images/gallery-thumbnails/...`,
 * mirroring the original `/images/gallery/...` structure.
 * Falls back to the original URL if parsing fails.
 */
function getThumbnailUrl(src: string): string {
  try {
    const url = new URL(src)
    url.pathname = url.pathname.replace(
      /^\/images\/gallery\//,
      '/images/gallery-thumbnails/'
    )
    return url.toString()
  } catch {
    return src
  }
}

export function GalleryPage() {
  const t = useTranslation()
  const { language } = useLanguage()
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_PAGE)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [loadedOriginals, setLoadedOriginals] = useState<Set<string>>(new Set())

  const isZh = language === 'zh'

  const allPhotos = useMemo(() => {
    return typedGalleryData.flatMap(album =>
      album.photos.map(photo => ({
        ...photo,
        albumId: album.id,
        albumTitle: isZh ? album.title : album.titleEn,
      }))
    )
  }, [isZh])

  const displayedPhotos = useMemo(() => {
    const source = selectedAlbumId === 'all'
      ? allPhotos
      : typedGalleryData.find(a => a.id === selectedAlbumId)?.photos.map(photo => ({
          ...photo,
          albumId: selectedAlbumId,
          albumTitle: isZh
            ? typedGalleryData.find(a => a.id === selectedAlbumId)!.title
            : typedGalleryData.find(a => a.id === selectedAlbumId)!.titleEn,
        })) || []
    return source.slice(0, visibleCount)
  }, [selectedAlbumId, allPhotos, visibleCount, isZh])

  const hasMore = useMemo(() => {
    const source = selectedAlbumId === 'all'
      ? allPhotos
      : typedGalleryData.find(a => a.id === selectedAlbumId)?.photos || []
    return source.length > visibleCount
  }, [selectedAlbumId, allPhotos, visibleCount])

  const currentPhoto = displayedPhotos[currentPhotoIndex]

  const openLightbox = useCallback((index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const showNext = useCallback(() => {
    setCurrentPhotoIndex(prev => (prev + 1) % displayedPhotos.length)
  }, [displayedPhotos.length])

  const showPrev = useCallback(() => {
    setCurrentPhotoIndex(prev => (prev - 1 + displayedPhotos.length) % displayedPhotos.length)
  }, [displayedPhotos.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'Escape') closeLightbox()
    },
    [lightboxOpen, showNext, showPrev, closeLightbox]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }, [])

  const handleOriginalLoad = useCallback((src: string) => {
    setLoadedOriginals(prev => new Set(prev).add(src))
  }, [])

  const handleAlbumChange = useCallback((value: string) => {
    setSelectedAlbumId(value)
    setVisibleCount(PHOTOS_PER_PAGE)
  }, [])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_75%_75%,hsl(var(--accent)/0.1),transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Images className="h-4 w-4" />
              ROBOCON
            </div>
            <h1 className="text-4xl font-bold gradient-text sm:text-5xl lg:text-6xl mb-6">
              {t.gallery.title}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.gallery.description}
            </p>
          </div>
        </section>

        {/* Album Overview Cards */}
        <section className="py-12 border-b bg-background/50 backdrop-blur-sm">
          <div className="container">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card
                className={cn(
                  'cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden',
                  selectedAlbumId === 'all' ? 'ring-2 ring-primary' : ''
                )}
                onClick={() => handleAlbumChange('all')}
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Grid3X3 className="h-10 w-10 text-primary/60" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{t.gallery.allAlbums}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {allPhotos.length} {t.gallery.photoCount}
                  </p>
                </CardContent>
              </Card>

              {typedGalleryData.map(album => (
                <Card
                  key={album.id}
                  className={cn(
                    'cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden',
                    selectedAlbumId === album.id ? 'ring-2 ring-primary' : ''
                  )}
                  onClick={() => handleAlbumChange(album.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    {album.cover ? (
                      <img
                        src={getThumbnailUrl(album.cover)}
                        alt={isZh ? album.title : album.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        onError={e => {
                          e.currentTarget.src = album.cover
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">
                      {isZh ? album.title : album.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {album.count} {t.gallery.photoCount}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b">
          <div className="container">
            <Tabs value={selectedAlbumId} onValueChange={handleAlbumChange}>
              <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-start">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t.gallery.allAlbums}
                </TabsTrigger>
                {typedGalleryData.map(album => (
                  <TabsTrigger
                    key={album.id}
                    value={album.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {isZh ? album.title : album.titleEn}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Photo Masonry Grid */}
        <section className="py-12">
          <div className="container">
            {displayedPhotos.length > 0 ? (
              <>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                  {displayedPhotos.map((photo, index) => (
                    <figure
                      key={`${photo.src}-${index}`}
                      className="break-inside-avoid group relative rounded-xl overflow-hidden bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                      onClick={() => openLightbox(index)}
                    >
                      {!loadedImages.has(photo.src) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse z-10">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                      )}
                      <img
                        src={getThumbnailUrl(photo.src)}
                        alt={photo.alt}
                        className={cn(
                          'w-full h-auto object-cover transition-all duration-500 group-hover:scale-105',
                          loadedImages.has(photo.src) ? 'opacity-100' : 'opacity-0'
                        )}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => handleImageLoad(photo.src)}
                        onError={e => {
                          e.currentTarget.src = photo.src
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          {photo.albumTitle}
                        </Badge>
                      </div>
                    </figure>
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <Button
                      size="lg"
                      onClick={() => setVisibleCount(prev => prev + PHOTOS_PER_PAGE)}
                    >
                      {t.common.loading || '加载更多'}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">{t.gallery.noPhotos}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 border-none bg-black/95 overflow-hidden">
          <DialogTitle className="sr-only">{t.gallery.openLightbox}</DialogTitle>
          <DialogDescription className="sr-only">
            {currentPhoto ? currentPhoto.alt : t.gallery.loading}
          </DialogDescription>

          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
            aria-label={t.gallery.closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative flex items-center justify-center w-[95vw] h-[95vh]">
            {currentPhoto && (
              <>
                {!loadedOriginals.has(currentPhoto.src) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 z-10">
                    <ImageIcon className="h-12 w-12 animate-pulse mb-3" />
                    <span className="text-sm">{t.gallery.loading}</span>
                  </div>
                )}
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className={cn(
                    'max-w-full max-h-full object-contain transition-opacity duration-300',
                    loadedOriginals.has(currentPhoto.src) ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={() => handleOriginalLoad(currentPhoto.src)}
                />
              </>
            )}

            {displayedPhotos.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                  aria-label={t.gallery.previousPhoto}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                  aria-label={t.gallery.nextPhoto}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>

          {currentPhoto && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-sm font-medium">{currentPhoto.albumTitle}</p>
              <p className="text-xs text-white/70 mt-1">
                {currentPhotoIndex + 1} / {displayedPhotos.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
