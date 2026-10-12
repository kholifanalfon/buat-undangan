import { useState, useEffect } from 'react'

export function useGuest() {
  const [guestName, setGuestName] = useState<string>('Tamu Undangan')

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const toParam = params.get('to') || params.get('guest') || params.get('name')
      if (toParam && toParam.trim()) {
        setGuestName(toParam.trim())
      }
    } catch {
      // Fallback
    }
  }, [])

  return { guestName }
}
