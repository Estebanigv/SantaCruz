'use client'

import React from 'react'
// import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-light' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  icon,
  type = 'button',
}: ButtonProps) {
  const baseClasses = `btn btn-${variant} btn-${size} ${className}`

  // Make all buttons interactive but prevent navigation
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  if (href && !disabled) {
    return (
      <button type="button" onClick={handleClick} disabled={disabled} className={baseClasses}>
        {icon && <span>{icon}</span>}
        {children}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick || handleClick}
      disabled={disabled}
      className={baseClasses}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}
