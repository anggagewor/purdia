import { describe, it, expect } from 'vitest'
import { clamp, randomInt, uid } from '../src/misc'

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('clamps to min when value is below', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('clamps to max when value is above', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('handles min === max', () => {
    expect(clamp(5, 3, 3)).toBe(3)
  })

  it('handles negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(0, -10, -1)).toBe(-1)
  })
})

describe('randomInt', () => {
  it('returns integer within range (inclusive)', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('works when min equals max', () => {
    expect(randomInt(5, 5)).toBe(5)
  })

  it('works with negative ranges', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInt(-10, -5)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(-5)
    }
  })
})

describe('uid', () => {
  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => uid()))
    expect(ids.size).toBe(100)
  })

  it('applies prefix when provided', () => {
    const id = uid('user')
    expect(id).toMatch(/^user_/)
  })

  it('returns string without prefix when none provided', () => {
    const id = uid()
    expect(id).not.toContain('_')
    expect(id.length).toBeGreaterThan(0)
  })
})
