import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { calculateEMI, formatCurrency, isValidEmail, isValidPhone } from '../utils/helpers'

describe('Utility Functions', () => {
  describe('calculateEMI', () => {
    it('should calculate EMI correctly', () => {
      const result = calculateEMI(100000, 10, 5)
      expect(result.emi).toBe(2125)
      expect(result.totalAmount).toBe(127500)
      expect(result.totalInterest).toBe(27500)
    })

    it('should handle zero interest rate', () => {
      const result = calculateEMI(100000, 0, 5)
      expect(result.emi).toBe(1667)
      expect(result.totalAmount).toBe(100000)
      expect(result.totalInterest).toBe(0)
    })
  })

  describe('formatCurrency', () => {
    it('should format BHD currency correctly', () => {
      expect(formatCurrency(1000)).toBe('BHD 1,000')
      expect(formatCurrency(1500.5)).toBe('BHD 1,501')
      expect(formatCurrency(999.999)).toBe('BHD 1,000')
    })
  })

  describe('Email Validation', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@company.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@domain.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('user name@domain.com')).toBe(false)
    })
  })

  describe('Phone Validation (Bahrain)', () => {
    it('should validate correct Bahrain phone numbers', () => {
      expect(isValidPhone('33001234')).toBe(true)
      expect(isValidPhone('66001234')).toBe(true)
      expect(isValidPhone('+97333001234')).toBe(true)
      expect(isValidPhone('+973 3300 1234')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('12345678')).toBe(false)
      expect(isValidPhone('3300123')).toBe(false) // Too short
      expect(isValidPhone('330012345')).toBe(false) // Too long
      expect(isValidPhone('+97412345678')).toBe(false) // Wrong country code
    })
  })
})
