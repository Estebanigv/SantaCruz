import { membershipTiers } from '@/data/mockData'
import MembershipCard from '../wine/MembershipCard'
import SectionHeader from '../ui/SectionHeader'

export default function MembershipsSection() {
  return (
    <section className="bg-gradient-to-b from-black-950 via-black-900 to-black-950 section-padding relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-600/8 rounded-full blur-3xl" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container-custom relative">
        <SectionHeader
          label="Beneficios Exclusivos"
          title="Club de Vinos Santa Cruz"
          subtitle="Únete a nuestra comunidad exclusiva y disfruta de beneficios únicos, acceso prioritario y experiencias memorables durante todo el año"
          theme="dark"
        />

        {/* Membership Grid - Perfectly aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-24 items-end pt-8">
          {membershipTiers.map((tier) => (
            <div key={tier.id} className="h-full flex">
              <MembershipCard tier={tier} />
            </div>
          ))}
        </div>

        {/* CTA Section - Refined for dark background */}
        <div className="text-center pt-16 border-t border-white/10">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-300">
            <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-[family-name:var(--font-raleway)] font-light">Todos los planes incluyen envío gratis y acceso a eventos exclusivos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
