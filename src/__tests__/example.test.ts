import { describe, it, expect } from 'vitest'

describe('Basic Tests', () => {
  it('should pass a simple test', () => {
    expect(true).toBe(true)
  })

  it('should perform basic arithmetic', () => {
    expect(2 + 2).toBe(4)
  })

  it('should work with strings', () => {
    const text = 'Viña Santa Cruz'
    expect(text).toContain('Santa Cruz')
  })
})
