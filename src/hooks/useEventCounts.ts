import { useMemo } from 'react'

// 从EventsPage导入类型定义
type EventCategory = 'all' | 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'networking'
type EventStatus = 'upcoming' | 'past'

interface Event {
  id: string
  title: string
  description: string
  image: string
  category: EventCategory
  date: string
  time: string
  location: string
  participants: number
  maxParticipants?: number
  status: EventStatus
  registrationUrl?: string
  detailsUrl?: string
}

interface EventCounts {
  all: number
  workshop: number
  hackathon: number
  seminar: number
  competition: number
  networking: number
}

/**
 * 计算各分类事件数量的Hook
 * 支持按状态过滤和实时更新
 */
export const useEventCounts = (
  events: Event[],
  status?: EventStatus
): EventCounts => {
  const eventCounts = useMemo(() => {
    // 根据状态过滤事件
    const filteredEvents = status 
      ? events.filter(event => event.status === status)
      : events

    // 计算各分类数量
    const counts: EventCounts = {
      all: filteredEvents.length,
      workshop: 0,
      hackathon: 0,
      seminar: 0,
      competition: 0,
      networking: 0
    }

    // 统计各分类事件数量
    filteredEvents.forEach(event => {
      if (event.category !== 'all') {
        counts[event.category]++
      }
    })

    return counts
  }, [events, status])

  return eventCounts
}

export default useEventCounts

// 导出类型供其他组件使用
export type { EventCounts, Event, EventCategory, EventStatus }