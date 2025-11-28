'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AgeContextType {
  isAdult: boolean | null // null = not yet verified
  isVerified: boolean
  setAge: (isAdult: boolean) => void
  resetVerification: () => void
}

const AgeContext = createContext<AgeContextType | undefined>(undefined)

export function AgeProvider({ children }: { children: ReactNode }) {
  const [isAdult, setIsAdult] = useState<boolean | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const verified = localStorage.getItem('ageVerified')
    const adultStatus = localStorage.getItem('isAdult')

    if (verified === 'true') {
      setIsVerified(true)
      setIsAdult(adultStatus === 'true')
    }
  }, [])

  const setAge = (adult: boolean) => {
    localStorage.setItem('ageVerified', 'true')
    localStorage.setItem('isAdult', adult ? 'true' : 'false')
    setIsVerified(true)
    setIsAdult(adult)
  }

  const resetVerification = () => {
    localStorage.removeItem('ageVerified')
    localStorage.removeItem('isAdult')
    setIsVerified(false)
    setIsAdult(null)
    window.location.reload()
  }

  // Don't render children until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <AgeContext.Provider value={{ isAdult, isVerified, setAge, resetVerification }}>
      {children}
    </AgeContext.Provider>
  )
}

export function useAge() {
  const context = useContext(AgeContext)
  if (context === undefined) {
    throw new Error('useAge must be used within an AgeProvider')
  }
  return context
}
