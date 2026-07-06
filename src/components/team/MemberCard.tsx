import { useRef, useLayoutEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Linkedin, Mail, ExternalLink } from 'lucide-react'
import BonjourIcon from '@/bonjour.ico?url'
import GithubIcon from '@/github.ico?url'
import { GiteeIcon } from '@/components/ui/gitee-icon'
import { ImageProxy } from '@/components/ui/image-proxy'
import { getProjectById } from '@/data/projects'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import type { TeamMember } from '@/lib/i18n/types/translations'
import type { AspectRatio } from '@/types/ui'

export type MemberCardVariant = 'featured' | 'compact'

interface MemberCardProps {
  member: TeamMember
  variant?: MemberCardVariant
  aspectRatio?: AspectRatio
  onClick?: () => void
  /** 是否首屏卡片，首屏卡片不懒加载以优化 LCP */
  priority?: boolean
  className?: string
}

const CARD_BASE_STYLES =
  'team-card group overflow-hidden hover:shadow-lg transition-colors duration-300 bg-card/90 backdrop-blur-md border-primary/30 hover:border-primary/50 shadow-lg'

function SocialLinks({ member, compact = false }: { member: TeamMember; compact?: boolean }) {
  const iconSize = compact ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const buttonSize = compact ? 'h-7 w-7' : 'h-8 w-8'

  return (
    <div className="flex justify-center gap-2">
      {member.gitee && (
        <Button variant="ghost" size="icon" className={buttonSize} asChild>
          <a href={member.gitee} target="_blank" rel="noopener noreferrer" aria-label="Gitee profile">
            <GiteeIcon className={iconSize} />
          </a>
        </Button>
      )}
      {member.github && (
        <Button variant="ghost" size="icon" className={buttonSize} asChild>
          <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <img src={GithubIcon} alt="GitHub" className={`${iconSize} object-contain dark:invert`} />
          </a>
        </Button>
      )}
      {member.bonjour && (
        <Button variant="ghost" size="icon" className={buttonSize} asChild>
          <a href={member.bonjour} target="_blank" rel="noopener noreferrer" aria-label="Bonjour profile">
            <img src={BonjourIcon} alt="Bonjour" className={iconSize} />
          </a>
        </Button>
      )}
      {member.linkedin && (
        <Button variant="ghost" size="icon" className={buttonSize} asChild>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <Linkedin className={iconSize} />
          </a>
        </Button>
      )}
      {member.email && (
        <Button variant="ghost" size="icon" className={buttonSize} asChild>
          <a href={`mailto:${member.email}`} aria-label={`Send email to ${member.name}`}>
            <Mail className={iconSize} />
          </a>
        </Button>
      )}
    </div>
  )
}

function MemberAvatar({
  member,
  aspectRatio = 'aspect-[3/4]',
  priority = false,
}: {
  member: TeamMember
  aspectRatio?: AspectRatio
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${aspectRatio}`}>
      <Avatar className="w-full h-full rounded-none bg-muted/40 dark:bg-muted/20">
        <div className="w-full h-full">
          <ImageProxy
            src={member.image}
            alt={member.name}
            className={cn(
              'w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500',
              member.avatarStyle === 'bilevel' && 'avatar-bilevel'
            )}
            fallbackSrc={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <AvatarFallback className="w-full h-full rounded-none text-2xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20">
          {member.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

function RoleBadge({ role, compact = false }: { role: string; compact?: boolean }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'font-medium border transition-colors',
        compact
          ? 'text-[10px] px-1.5 py-0.5 truncate max-w-full bg-primary/15 text-primary border-primary/25 hover:bg-primary/25'
          : 'text-xs px-2.5 py-0.5 bg-primary/15 text-primary border-primary/25 hover:bg-primary/25'
      )}
    >
      {role}
    </Badge>
  )
}

export function MemberCard({
  member,
  variant = 'compact',
  aspectRatio = 'aspect-[3/4]',
  onClick,
  priority = false,
  className,
}: MemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const isFeatured = variant === 'featured'

  // Hover timeline：头像放大 + 浮动 + 卡片上浮
  useLayoutEffect(() => {
    const card = cardRef.current
    const avatar = avatarRef.current
    if (!card) return

    const tl = gsap.timeline({ paused: true })
    tl.to(card, {
      y: -10,
      scale: 1.015,
      boxShadow: '0 24px 48px -12px rgba(0,0,0,0.35), 0 0 40px hsl(var(--primary) / 0.35)',
      borderColor: 'hsl(var(--primary) / 0.6)',
      duration: 0.35,
      ease: 'power2.out',
    })

    if (avatar) {
      tl.to(
        avatar,
        {
          scale: 1.05,
          y: -4,
          duration: 0.35,
          ease: 'power2.out',
        },
        0
      )
      tl.to(
        avatar,
        {
          y: -8,
          duration: 0.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
        0.35
      )
    }

    timelineRef.current = tl

    const onEnter = () => tl.play()
    const onLeave = () => tl.reverse()

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)

    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
      tl.kill()
    }
  }, [])

  return (
    <Card
      ref={cardRef}
      className={cn(CARD_BASE_STYLES, onClick && 'cursor-pointer', className)}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest('a, button')) return
        onClick?.()
      }}
    >
      <div ref={avatarRef}>
        <MemberAvatar member={member} aspectRatio={aspectRatio} priority={priority} />
      </div>

      <CardHeader
        className={cn(
          'text-center relative z-10',
          isFeatured ? 'py-4 px-4' : 'py-3 px-2'
        )}
      >
        <CardTitle
          className={cn(
            'text-foreground dark:text-white drop-shadow-md truncate',
            isFeatured ? 'text-xl' : 'text-sm'
          )}
        >
          {member.github ? (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {member.name}
            </a>
          ) : (
            member.name
          )}
        </CardTitle>
        <div className={cn('font-medium flex justify-center', isFeatured ? 'text-base mt-1.5' : 'text-xs mt-1')}>
          <RoleBadge role={member.role} compact={!isFeatured} />
        </div>
      </CardHeader>

      {isFeatured && (
        <CardContent className="px-4 pb-4 pt-0">
          <p className="text-sm text-muted-foreground dark:text-gray-200 text-center mb-4 leading-relaxed drop-shadow-sm line-clamp-3">
            {member.bio}
          </p>

          {/* 技术栈标签 */}
          {member.tags && member.tags.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-muted-foreground dark:text-gray-300 mb-2 text-center drop-shadow-sm">
                技能标签
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.tags.slice(0, 6).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-2.5 py-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 hover:from-primary/30 hover:via-secondary/30 hover:to-primary/30 transition-all duration-300 border-primary/30 hover:border-primary/50 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-white/20 font-medium cursor-default shadow-sm hover:shadow-md"
                  >
                    {tag}
                  </Badge>
                ))}
                {member.tags.length > 6 && (
                  <Badge
                    variant="outline"
                    className="text-xs px-2 py-1 border-primary/20 text-muted-foreground"
                  >
                    +{member.tags.length - 6}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* 代表作 / 参与项目 */}
          {member.projects && member.projects.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-muted-foreground dark:text-gray-300 mb-2 text-center">
                代表作
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.projects.slice(0, 2).map((project) => {
                  const fullProject = getProjectById(project.id)
                  return (
                    <a
                      key={project.id}
                      href={
                        project.url ||
                        fullProject?.projectUrl ||
                        fullProject?.githubUrl ||
                        `/projects#project-${project.id}`
                      }
                      target={
                        project.url?.startsWith('http') || fullProject?.githubUrl?.startsWith('http')
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        project.url?.startsWith('http') || fullProject?.githubUrl?.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="group/badge inline-flex flex-col items-center px-3 py-1.5 rounded-md bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 hover:border-primary/50 hover:from-primary/30 hover:via-secondary/30 hover:to-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                    >
                      <span className="text-xs font-medium text-foreground dark:text-white leading-tight flex items-center gap-1">
                        {project.name}
                        <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover/badge:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[10px] text-primary/80 dark:text-primary/90 leading-tight">
                        {project.role}
                      </span>
                    </a>
                  )
                })}
                {member.projects.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] text-muted-foreground bg-muted/50 border border-border/50">
                    +{member.projects.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          <SocialLinks member={member} />
        </CardContent>
      )}

      {!isFeatured && member.github && (
        <CardContent className="px-2 pb-3 pt-0">
          <SocialLinks member={member} compact />
        </CardContent>
      )}
    </Card>
  )
}
