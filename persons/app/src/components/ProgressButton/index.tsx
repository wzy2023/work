import { type ReactNode } from 'react'
import styles from './index.module.scss'

interface ProgressButtonProps {
  colors: { bg: string, ring: string },
  showRing?: boolean,
  progress?: number;
  padding?: number;
  size?: number;
  strokeWidth?: number;
  children?: ReactNode;
  className?: string;
}

export const ProgressButton = (props: ProgressButtonProps) => {
  const {
    colors,
    showRing = false,
    progress = 0,
    padding = 0,
    strokeWidth = 5,
    size = 50,
    children,
    className = '',
  } = props

  const radius = (size / 2) - strokeWidth - padding + 2.5
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div className={styles.progressButton}>
      <div
        style={{ width: size, height: size }}
        className={`relative rounded-full
          flex items-center justify-center
          cursor-pointer hover:opacity-90
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${colors?.bg}
          ${colors.ring}
          transform-gpu transition-all duration-300
          perspective
          ${className}`}
      >
        {showRing && (
          <>
            <svg
              className='absolute inset-0 w-full h-full'
              viewBox={`0 0 ${size} ${size}`}
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill='none'
                stroke='currentColor'
                strokeWidth={strokeWidth}
                className='opacity-30'
              />
            </svg>

            <svg
              className='absolute inset-0 w-full h-full -rotate-90'
              viewBox={`0 0 ${size} ${size}`}
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill='none'
                stroke='currentColor'
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap='round'
                className='transition-all duration-300'
              />
            </svg>
          </>
        )}

        <div
          className={`
            relative z-10 text-white text-xs text-center whitespace-pre select-none
            ${className ? 'animate-counter-rotate' : ''}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
