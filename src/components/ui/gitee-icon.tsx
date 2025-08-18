import React from 'react'

interface GiteeIconProps {
  className?: string
  size?: number
}

export function GiteeIcon({ className = '', size = 20 }: GiteeIconProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778V9.777a.594.594 0 0 1 .593-.592h1.482c.327 0 .593.265.593.592v3.556a4.74 4.74 0 0 1-4.741 4.741H7.704A4.74 4.74 0 0 1 2.963 13.333V7.704A4.74 4.74 0 0 1 7.704 2.963h10.37z" fill="#C71D23"/>
    </svg>
  )
}