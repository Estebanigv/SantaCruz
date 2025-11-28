'use client'

import { useState, useEffect } from 'react'

export function useAgeVerification() {
  const [isAdult, setIsAdult] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for age verification status
    const ageVerified = localStorage.getItem('ageVerified')
    const ageStatus = localStorage.getItem('isAdult')

    if (ageVerified === 'true') {
      setIsAdult(ageStatus === 'true')
    } else {
      setIsAdult(null) // Not verified yet
    }

    setIsLoading(false)
  }, [])

  return { isAdult, isLoading }
}
