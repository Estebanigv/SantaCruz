interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  theme = 'light'
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const labelColor = theme === 'light' ? 'text-gold-600' : 'text-gold-400'
  const titleColor = theme === 'light' ? 'text-black-900' : 'text-white'
  const subtitleColor = theme === 'light' ? 'text-gray-600' : 'text-white/80'

  return (
    <div className={`max-w-4xl mb-16 ${alignClass}`}>
      {/* Label with decorative elements - vanguardist design */}
      <div className="flex items-center gap-4 mb-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500" />
          <div className={`relative px-6 py-3 ${labelColor}`}>
            <div className="absolute inset-0 bg-gold-500/5 backdrop-blur-sm rounded-full" />
            <span className="relative font-[family-name:var(--font-raleway)] text-xs font-semibold tracking-[0.3em] uppercase">
              {label}
            </span>
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500" />
        </div>
      </div>

      {/* Main title - large and elegant */}
      <h2
        className={`font-[family-name:var(--font-raleway)] text-5xl md:text-6xl lg:text-7xl font-extralight ${titleColor} mb-6 leading-[1.1] tracking-tight`}
        style={{
          textShadow: theme === 'dark' ? '0 2px 20px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        {title}
      </h2>

      {/* Subtitle if provided */}
      {subtitle && (
        <p className={`font-[family-name:var(--font-raleway)] text-lg md:text-xl ${subtitleColor} leading-relaxed font-light max-w-2xl ${alignClass}`}>
          {subtitle}
        </p>
      )}

      {/* Decorative element */}
      <div className="flex items-center gap-2 mt-8 justify-center">
        <div className="w-2 h-2 rounded-full bg-gold-500/30" />
        <div className="w-16 h-px bg-gradient-to-r from-gold-500/50 via-gold-500 to-gold-500/50" />
        <div className="w-2 h-2 rounded-full bg-gold-500/30" />
      </div>
    </div>
  )
}
