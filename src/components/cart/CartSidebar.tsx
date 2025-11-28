'use client'

import { useEffect, useState } from 'react'
import { useCart, WineCartItem, TourCartItem } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Wine, Calendar, Trash2, ArrowRight } from 'lucide-react'

export default function CartSidebar() {
  const {
    isOpen,
    closeCart,
    wineItems,
    tourItems,
    totalItems,
    subtotal,
    updateWineQuantity,
    removeWine,
    removeTour,
    clearCart,
  } = useCart()

  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL')
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-CL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  if (!shouldRender) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: isAnimating ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: isAnimating ? 'blur(4px)' : 'blur(0px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 flex flex-col shadow-2xl"
        style={{
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-500" />
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
              Tu Carrito
            </h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 bg-gold-500 text-black text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white mb-2">
                Tu carrito está vacío
              </h3>
              <p className="font-[family-name:var(--font-raleway)] text-gray-500 text-sm mb-6">
                Agrega vinos o reserva experiencias para comenzar
              </p>
              <div className="flex flex-col gap-3 w-full max-w-[220px]">
                <button
                  onClick={() => {
                    closeCart()
                    alert('Página en construcción - Próximamente disponible')
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-wine-600 hover:bg-wine-500 text-white font-[family-name:var(--font-raleway)] text-sm font-medium rounded-full transition-all hover:shadow-lg hover:shadow-wine-600/30 cursor-pointer"
                >
                  <Wine className="w-4 h-4" />
                  <span>Ver Vinos</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-white/20 rounded">Pronto</span>
                </button>
                <Link
                  href="/experiencias"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 py-3 px-6 border border-gold-500/50 hover:border-gold-500 text-gold-500 hover:text-gold-400 font-[family-name:var(--font-raleway)] text-sm font-medium rounded-full transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Ver Experiencias
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Wine Items */}
              {wineItems.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wine className="w-4 h-4 text-wine-500" />
                    <h3 className="font-[family-name:var(--font-raleway)] text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Productos ({wineItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {wineItems.map((item: WineCartItem, index: number) => (
                      <div
                        key={item.wine.id}
                        className="flex gap-4 p-4 bg-gray-800/50 rounded-xl group hover:bg-gray-800/70 transition-all duration-300"
                        style={{
                          opacity: isAnimating ? 1 : 0,
                          transform: isAnimating ? 'translateX(0)' : 'translateX(20px)',
                          transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${150 + index * 50}ms`,
                        }}
                      >
                        <div className="relative w-14 h-18 flex-shrink-0 bg-gray-700/30 rounded-lg overflow-hidden">
                          <Image
                            src={item.wine.image}
                            alt={item.wine.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-[family-name:var(--font-playfair)] text-white font-medium truncate text-sm">
                            {item.wine.name}
                          </h4>
                          <p className="font-[family-name:var(--font-raleway)] text-gray-500 text-xs">
                            {item.wine.varietal}
                          </p>
                          <p className="font-[family-name:var(--font-raleway)] text-gold-400 text-sm mt-1">
                            ${formatPrice(item.wine.price)} c/u
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateWineQuantity(item.wine.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-[family-name:var(--font-raleway)] text-white text-sm w-6 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateWineQuantity(item.wine.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeWine(item.wine.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="font-[family-name:var(--font-raleway)] text-white font-semibold">
                            ${formatPrice(item.wine.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tour Items */}
              {tourItems.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    <h3 className="font-[family-name:var(--font-raleway)] text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Experiencias ({tourItems.length})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {tourItems.map((item: TourCartItem, index: number) => (
                      <div
                        key={`${item.tour.id}-${item.date}`}
                        className="p-4 bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-xl group hover:border-gold-500/40 transition-all duration-300"
                        style={{
                          opacity: isAnimating ? 1 : 0,
                          transform: isAnimating ? 'translateX(0)' : 'translateX(20px)',
                          transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${200 + (wineItems.length + index) * 50}ms`,
                        }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="inline-block px-2 py-0.5 bg-gold-500/20 text-gold-400 text-[10px] font-medium uppercase tracking-wider rounded mb-1.5">
                              {item.tour.category}
                            </span>
                            <h4 className="font-[family-name:var(--font-playfair)] text-white font-medium">
                              {item.tour.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeTour(item.tour.id, item.date)}
                            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-[family-name:var(--font-raleway)]">
                              {formatDate(item.date)} a las {item.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-[family-name:var(--font-raleway)]">
                              {item.persons} {item.persons === 1 ? 'persona' : 'personas'}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-gold-500/10">
                          <span className="font-[family-name:var(--font-raleway)] text-gold-400 font-semibold">
                            ${formatPrice(item.totalPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {totalItems > 0 && (
          <div
            className="border-t border-gray-800 p-6 space-y-4 bg-gray-900"
            style={{
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 300ms',
            }}
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-raleway)] text-gray-400">
                Subtotal
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-2xl text-white font-semibold">
                ${formatPrice(subtotal)}
              </span>
            </div>

            <p className="text-gray-500 text-xs font-[family-name:var(--font-raleway)]">
              Envío e impuestos calculados en el checkout
            </p>

            {/* Buttons */}
            <button className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-[family-name:var(--font-raleway)] font-medium tracking-wide rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/30 flex items-center justify-center gap-2 group">
              Proceder al Pago
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={clearCart}
              className="w-full py-3 text-gray-500 hover:text-red-400 font-[family-name:var(--font-raleway)] text-sm transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  )
}
