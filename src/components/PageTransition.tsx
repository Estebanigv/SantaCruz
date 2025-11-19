'use client'

import { useEffect } from 'react'
import barba from '@barba/core'

export default function PageTransition() {
  useEffect(() => {
    // Initialize Barba.js
    barba.init({
      transitions: [
        {
          name: 'fade',
          async leave(data) {
            const done = this.async()

            // Fade out animation
            await new Promise<void>((resolve) => {
              data.current.container.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
              data.current.container.style.opacity = '0'
              data.current.container.style.transform = 'translateY(20px)'

              setTimeout(() => {
                resolve()
              }, 500)
            })

            done()
          },
          async enter(data) {
            // Set initial state
            data.next.container.style.opacity = '0'
            data.next.container.style.transform = 'translateY(-20px)'

            // Fade in animation
            await new Promise<void>((resolve) => {
              requestAnimationFrame(() => {
                data.next.container.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
                data.next.container.style.opacity = '1'
                data.next.container.style.transform = 'translateY(0)'

                setTimeout(() => {
                  resolve()
                }, 600)
              })
            })

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      ],
      views: [
        {
          namespace: 'home',
          beforeEnter() {
            // Additional animations for home page
            console.log('Entering home page')
          }
        }
      ]
    })

    return () => {
      barba.destroy()
    }
  }, [])

  return null
}
