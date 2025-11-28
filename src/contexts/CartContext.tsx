'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Wine, Tour } from '@/types'

// Types for cart items
export interface WineCartItem {
  type: 'wine'
  wine: Wine
  quantity: number
}

export interface TourCartItem {
  type: 'tour'
  tour: Tour
  date: string
  time: string
  persons: number
  totalPrice: number
}

export type CartItem = WineCartItem | TourCartItem

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_WINE'; wine: Wine; quantity?: number }
  | { type: 'REMOVE_WINE'; wineId: string }
  | { type: 'UPDATE_WINE_QUANTITY'; wineId: string; quantity: number }
  | { type: 'ADD_TOUR'; tour: Tour; date: string; time: string; persons: number }
  | { type: 'REMOVE_TOUR'; tourId: string; date: string }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] }

const initialState: CartState = {
  items: [],
  isOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_WINE': {
      const existingIndex = state.items.findIndex(
        item => item.type === 'wine' && item.wine.id === action.wine.id
      )

      if (existingIndex > -1) {
        const newItems = [...state.items]
        const existingItem = newItems[existingIndex] as WineCartItem
        newItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + (action.quantity || 1),
        }
        return { ...state, items: newItems }
      }

      return {
        ...state,
        items: [
          ...state.items,
          { type: 'wine', wine: action.wine, quantity: action.quantity || 1 },
        ],
      }
    }

    case 'REMOVE_WINE': {
      return {
        ...state,
        items: state.items.filter(
          item => !(item.type === 'wine' && item.wine.id === action.wineId)
        ),
      }
    }

    case 'UPDATE_WINE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            item => !(item.type === 'wine' && item.wine.id === action.wineId)
          ),
        }
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.type === 'wine' && item.wine.id === action.wineId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      }
    }

    case 'ADD_TOUR': {
      const tourPrice = action.tour.price * (action.tour.priceType === 'persona' ? action.persons : 1)

      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'tour',
            tour: action.tour,
            date: action.date,
            time: action.time,
            persons: action.persons,
            totalPrice: tourPrice,
          },
        ],
      }
    }

    case 'REMOVE_TOUR': {
      return {
        ...state,
        items: state.items.filter(
          item =>
            !(
              item.type === 'tour' &&
              item.tour.id === action.tourId &&
              item.date === action.date
            )
        ),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    case 'LOAD_CART':
      return { ...state, items: action.items }

    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  wineItems: WineCartItem[]
  tourItems: TourCartItem[]
  totalItems: number
  subtotal: number
  addWine: (wine: Wine, quantity?: number) => void
  removeWine: (wineId: string) => void
  updateWineQuantity: (wineId: string, quantity: number) => void
  addTour: (tour: Tour, date: string, time: string, persons: number) => void
  removeTour: (tourId: string, date: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vsc-cart')
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', items })
      } catch (e) {
        console.error('Error loading cart from localStorage:', e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('vsc-cart', JSON.stringify(state.items))
  }, [state.items])

  const wineItems = state.items.filter((item): item is WineCartItem => item.type === 'wine')
  const tourItems = state.items.filter((item): item is TourCartItem => item.type === 'tour')

  const totalItems = wineItems.reduce((sum, item) => sum + item.quantity, 0) + tourItems.length

  const subtotal =
    wineItems.reduce((sum, item) => sum + item.wine.price * item.quantity, 0) +
    tourItems.reduce((sum, item) => sum + item.totalPrice, 0)

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    wineItems,
    tourItems,
    totalItems,
    subtotal,
    addWine: (wine, quantity) => dispatch({ type: 'ADD_WINE', wine, quantity }),
    removeWine: (wineId) => dispatch({ type: 'REMOVE_WINE', wineId }),
    updateWineQuantity: (wineId, quantity) =>
      dispatch({ type: 'UPDATE_WINE_QUANTITY', wineId, quantity }),
    addTour: (tour, date, time, persons) =>
      dispatch({ type: 'ADD_TOUR', tour, date, time, persons }),
    removeTour: (tourId, date) => dispatch({ type: 'REMOVE_TOUR', tourId, date }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
