'use client'

import { useState } from 'react'
import { Tour } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { X, Calendar, Clock, Users, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import Image from 'next/image'

interface BookingModalProps {
  tour: Tour
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ tour, isOpen, onClose }: BookingModalProps) {
  const { addTour, openCart } = useCart()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [persons, setPersons] = useState(tour.priceType === 'pareja' ? 2 : tour.minPersons || 1)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [step, setStep] = useState(1)

  // Available times (would come from API in production)
  const availableTimes = ['10:00', '12:00', '14:00', '16:00']

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL')
  }

  // Calculate total price
  const calculateTotal = () => {
    if (tour.priceType === 'persona') {
      return tour.price * persons
    }
    return tour.price
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates and Mondays (closed)
    return date < today || date.getDay() === 1
  }

  const handleDateSelect = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
      setStep(2)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      addTour(
        tour,
        selectedDate.toISOString().split('T')[0],
        selectedTime,
        persons
      )
      onClose()
      openCart()
    }
  }

  const resetAndClose = () => {
    setSelectedDate(null)
    setSelectedTime('')
    setPersons(tour.priceType === 'pareja' ? 2 : tour.minPersons || 1)
    setStep(1)
    onClose()
  }

  if (!isOpen) return null

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={resetAndClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-gray-900 border border-gray-800 rounded-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative h-40 flex-shrink-0">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white mb-1">
              {tour.name}
            </h2>
            <p className="font-[family-name:var(--font-raleway)] text-gray-300 text-sm">
              {tour.duration} • {tour.schedule || 'Martes a Domingo'}
            </p>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-2 py-4 border-b border-gray-800">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? 'bg-gold-500 text-black-900'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 ${step > s ? 'bg-gold-500' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Select Date */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gold-500" />
                <h3 className="font-[family-name:var(--font-raleway)] text-lg font-medium text-white">
                  Selecciona una fecha
                </h3>
              </div>

              {/* Calendar */}
              <div className="bg-gray-800/50 rounded-xl p-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                      )
                    }
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-[family-name:var(--font-raleway)] text-white font-medium">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                      )
                    }
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs text-gray-500 font-[family-name:var(--font-raleway)] py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-3" />
                  ))}

                  {/* Days of month */}
                  {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                    const day = i + 1
                    const disabled = isDateDisabled(day)
                    const isSelected =
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentMonth.getMonth() &&
                      selectedDate?.getFullYear() === currentMonth.getFullYear()

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        disabled={disabled}
                        className={`p-3 rounded-lg text-sm font-[family-name:var(--font-raleway)] transition-all ${
                          disabled
                            ? 'text-gray-700 cursor-not-allowed'
                            : isSelected
                            ? 'bg-gold-500 text-black-900 font-medium'
                            : 'text-white hover:bg-gray-700'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center font-[family-name:var(--font-raleway)]">
                  Cerrado los lunes
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-gray-400 hover:text-white mb-4 font-[family-name:var(--font-raleway)] text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Cambiar fecha
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-gold-500" />
                <h3 className="font-[family-name:var(--font-raleway)] text-lg font-medium text-white">
                  Selecciona un horario
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-4 px-6 rounded-xl border text-center font-[family-name:var(--font-raleway)] transition-all ${
                      selectedTime === time
                        ? 'bg-gold-500 border-gold-500 text-black-900 font-medium'
                        : 'border-gray-700 text-white hover:border-gold-500/50 hover:bg-gray-800'
                    }`}
                  >
                    {time} hrs
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Persons & Confirm */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-gray-400 hover:text-white mb-4 font-[family-name:var(--font-raleway)] text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Cambiar horario
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-gold-500" />
                <h3 className="font-[family-name:var(--font-raleway)] text-lg font-medium text-white">
                  Número de personas
                </h3>
              </div>

              {/* Persons Selector */}
              {tour.priceType === 'persona' && (
                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={() => setPersons(Math.max(tour.minPersons || 1, persons - 1))}
                    disabled={persons <= (tour.minPersons || 1)}
                    className="w-12 h-12 rounded-full border border-gray-700 text-white hover:border-gold-500 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <div className="text-center">
                    <span className="font-[family-name:var(--font-playfair)] text-4xl text-white font-semibold">
                      {persons}
                    </span>
                    <p className="font-[family-name:var(--font-raleway)] text-gray-500 text-sm">
                      {persons === 1 ? 'persona' : 'personas'}
                    </p>
                  </div>
                  <button
                    onClick={() => setPersons(Math.min(tour.maxCapacity || 20, persons + 1))}
                    disabled={persons >= (tour.maxCapacity || 20)}
                    className="w-12 h-12 rounded-full border border-gray-700 text-white hover:border-gold-500 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              )}

              {/* Booking Summary */}
              <div className="bg-gray-800/50 rounded-xl p-5 mb-6">
                <h4 className="font-[family-name:var(--font-raleway)] text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  Resumen de tu reserva
                </h4>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-raleway)] text-gray-400">
                      Fecha
                    </span>
                    <span className="font-[family-name:var(--font-raleway)] text-white">
                      {selectedDate?.toLocaleDateString('es-CL', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-raleway)] text-gray-400">
                      Horario
                    </span>
                    <span className="font-[family-name:var(--font-raleway)] text-white">
                      {selectedTime} hrs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-raleway)] text-gray-400">
                      Personas
                    </span>
                    <span className="font-[family-name:var(--font-raleway)] text-white">
                      {persons}
                    </span>
                  </div>
                  <div className="h-px bg-gray-700 my-2" />
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-raleway)] text-gray-400">
                      Precio por {tour.priceType === 'persona' ? 'persona' : 'grupo'}
                    </span>
                    <span className="font-[family-name:var(--font-raleway)] text-white">
                      ${formatPrice(tour.price)}
                    </span>
                  </div>
                  {tour.priceType === 'persona' && persons > 1 && (
                    <div className="flex justify-between">
                      <span className="font-[family-name:var(--font-raleway)] text-gray-400">
                        × {persons} personas
                      </span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-700 my-4" />

                <div className="flex justify-between items-center">
                  <span className="font-[family-name:var(--font-raleway)] text-white font-medium">
                    Total
                  </span>
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-gold-400 font-semibold">
                    ${formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 3 && (
          <div className="border-t border-gray-800 p-6">
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-[family-name:var(--font-raleway)] font-medium tracking-wide rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/30"
            >
              Agregar al Carrito
            </button>
          </div>
        )}
      </div>
    </>
  )
}
