import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGuest } from '../src/hooks/useGuest.ts'
import { useWishes } from '../src/hooks/useWishes.ts'
import { useDevice } from '../src/hooks/useDevice.ts'

describe('Core Hooks', () => {
  describe('useGuest', () => {
    beforeEach(() => {
      window.history.pushState({}, '', '/')
    })

    it('returns default guest name when URL has no query param', () => {
      const { result } = renderHook(() => useGuest())
      expect(result.current.guestName).toBe('Tamu Undangan')
    })

    it('parses guest name from ?to= parameter', () => {
      window.history.pushState({}, '', '/?to=Budi+Santoso')
      const { result } = renderHook(() => useGuest())
      expect(result.current.guestName).toBe('Budi Santoso')
    })

    it('parses guest name from ?guest= parameter as fallback', () => {
      window.history.pushState({}, '', '/?guest=Keluarga+Bpk+Rahmat')
      const { result } = renderHook(() => useGuest())
      expect(result.current.guestName).toBe('Keluarga Bpk Rahmat')
    })
  })

  describe('useWishes', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    it('initializes with default wishes if localStorage is empty', () => {
      const { result } = renderHook(() => useWishes())
      expect(result.current.wishes.length).toBeGreaterThan(0)
    })

    it('can add a new wish and persist to localStorage', () => {
      const { result } = renderHook(() => useWishes())
      act(() => {
        result.current.addWish({
          name: 'Andi',
          message: 'Selamat menempuh hidup baru!',
          presence: 'attending',
        })
      })

      expect(result.current.wishes[0].name).toBe('Andi')
      expect(result.current.wishes[0].message).toBe('Selamat menempuh hidup baru!')
      const stored = JSON.parse(localStorage.getItem('wedding_wishes') || '[]')
      expect(stored[0].name).toBe('Andi')
    })
  })

  describe('useDevice', () => {
    it('initializes and can toggle active OS between windows and samsung', () => {
      const { result } = renderHook(() => useDevice())
      const initialOS = result.current.activeOS
      act(() => {
        result.current.toggleOS()
      })
      expect(result.current.activeOS).toBe(initialOS === 'windows' ? 'samsung' : 'windows')
    })
  })
})
