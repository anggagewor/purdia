import { describe, it, expect } from 'vitest'
import { formatCurrency, formatNumber, formatDate } from '../src/format'

describe('formatCurrency', () => {
  it('formats number as IDR by default', () => {
    const result = formatCurrency(50000)
    expect(result).toContain('50.000')
    // Should contain currency indicator (Rp or IDR depending on env)
    expect(result).toMatch(/Rp|IDR/)
  })

  it('formats zero correctly', () => {
    const result = formatCurrency(0)
    expect(result).toMatch(/0/)
  })

  it('formats large numbers with thousand separators', () => {
    const result = formatCurrency(1500000)
    expect(result).toContain('1.500.000')
  })

  it('respects custom currency option', () => {
    const result = formatCurrency(1000, { locale: 'en-US', currency: 'USD' })
    expect(result).toContain('$')
    expect(result).toContain('1,000')
  })
})

describe('formatNumber', () => {
  it('adds thousand separators for id-ID locale', () => {
    expect(formatNumber(1234567)).toBe('1.234.567')
  })

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('handles negative numbers', () => {
    const result = formatNumber(-5000)
    expect(result).toContain('5.000')
    expect(result).toContain('-')
  })
})

describe('formatDate', () => {
  it('formats Date object', () => {
    const date = new Date('2024-03-15T00:00:00Z')
    const result = formatDate(date)
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('formats ISO string', () => {
    const result = formatDate('2024-01-01T12:00:00Z')
    expect(result).toContain('2024')
  })

  it('respects custom format options', () => {
    const date = new Date('2024-06-15T00:00:00Z')
    const result = formatDate(date, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    expect(result).toContain('2024')
    expect(result).toContain('15')
  })
})
