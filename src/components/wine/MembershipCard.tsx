import { MembershipTier } from '@/types'
// import Button from '../ui/Button'

interface MembershipCardProps {
  tier: MembershipTier
}

export default function MembershipCard({ tier }: MembershipCardProps) {
  const formatPrice = (price: number) => {
    // Format without thousand separators for cleaner look
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const tierColors = {
    bronce: 'text-[#CD7F32]',
    plata: 'text-gray-400',
    oro: 'text-gold-500',
    platino: 'text-gray-200'
  }

  const tierNames = {
    bronce: 'Bronce',
    plata: 'Plata',
    oro: 'Oro',
    platino: 'Platino'
  }

  return (
    <div
      className={`group relative bg-white border overflow-visible transition-all duration-500 flex flex-col rounded-sm h-full ${
        tier.featured
          ? 'border-gold-500 shadow-2xl hover:-translate-y-3 hover:shadow-3xl'
          : 'border-gray-200 hover:border-gold-500/50 hover:-translate-y-2 hover:shadow-2xl'
      }`}
    >
      {/* Popular Badge - Elegant and clean */}
      {tier.popular && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase px-7 py-2.5 rounded-full shadow-2xl tracking-[0.25em] leading-none">
              Más Popular
            </div>
            {/* Static glow effect */}
            <div className="absolute inset-0 bg-gold-500 rounded-full blur-xl opacity-40 -z-10" />
          </div>
        </div>
      )}

      {/* Header Section with subtle gradient */}
      <div className={`relative pt-14 pb-12 px-6 ${tier.featured ? 'bg-gradient-to-b from-gold-50 via-cream-50 to-white' : 'bg-gradient-to-b from-gray-50/50 to-white'}`}>
        {/* Minimal decorative element */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-10 mx-auto opacity-50" />

        {/* Tier Name */}
        <h3 className={`font-[family-name:var(--font-raleway)] text-2xl font-light text-center mb-10 tracking-[0.2em] uppercase ${tierColors[tier.name]}`}>
          {tierNames[tier.name]}
        </h3>

        {/* Price - Elegant and readable */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-[family-name:var(--font-raleway)] text-2xl font-light text-black-900">$</span>
            <span className="font-[family-name:var(--font-raleway)] text-5xl font-extralight text-black-900 tabular-nums">
              {formatPrice(tier.price)}
            </span>
          </div>
          <p className="font-[family-name:var(--font-raleway)] text-xs text-gray-500 uppercase tracking-[0.25em] font-medium mt-2">/año</p>
        </div>
      </div>

      {/* Benefits Section - Clean & spacious */}
      <div className="flex-1 p-8 md:p-10">
        <div className="space-y-5">
          {tier.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 group/item">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 group-hover/item:scale-150 transition-transform flex-shrink-0" />
              <span className="font-[family-name:var(--font-raleway)] text-sm text-gray-700 leading-relaxed font-light group-hover/item:text-black-900 transition-colors">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Always at bottom */}
      <div className="p-6 pt-0">
        <a
          href="/club"
          className={`group/btn relative inline-flex items-center justify-center w-full px-8 py-4 font-[family-name:var(--font-raleway)] font-medium tracking-[0.15em] uppercase text-xs rounded-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
            tier.featured
              ? 'bg-black text-white hover:bg-black-800 hover:shadow-2xl'
              : 'border border-black/30 text-black hover:bg-black/5 hover:border-black'
          }`}
        >
          <span className="relative z-10">Unirse Ahora</span>
          {tier.featured && (
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          )}
        </a>
      </div>
    </div>
  )
}
