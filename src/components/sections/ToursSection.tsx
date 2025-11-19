import { tours } from '@/data/mockData'
import TourCard from '../wine/TourCard'
import SectionHeader from '../ui/SectionHeader'

export default function ToursSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black-900 section-padding relative overflow-hidden">
      {/* Ambient background effect - More vibrant */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <SectionHeader
          label="Vive la Experiencia"
          title="Experiencias que Transforman"
          subtitle="Sumérgete en el mundo del vino con experiencias inmersivas diseñadas para despertar todos tus sentidos"
          theme="dark"
        />

        {/* Elegant Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
