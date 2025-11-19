interface BadgeProps {
  children: React.ReactNode
  variant?: 'new' | 'award' | 'exclusive' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Badge({
  children,
  variant = 'info',
  size = 'md',
  className = '',
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] leading-[14px]',
    md: 'px-3 py-1 text-xs leading-4',
    lg: 'px-4 py-1.5 text-sm leading-5',
  }

  return (
    <span className={`badge badge-${variant} ${sizeClasses[size]} ${className}`}>{children}</span>
  )
}
