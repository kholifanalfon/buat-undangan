import { useState, useEffect } from 'react'
import { WishItem } from '../types/wedding.ts'
import { initialWishes } from '../data/weddingData.ts'

const STORAGE_KEY = 'wedding_wishes'

export function useWishes() {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Fallback
    }
    return initialWishes
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes))
    } catch {
      // Fallback
    }
  }, [wishes])

  const addWish = (newWish: Omit<WishItem, 'id' | 'createdAt'>) => {
    const item: WishItem = {
      ...newWish,
      id: 'wish_' + Date.now(),
      createdAt: 'Baru saja',
    }
    setWishes(prev => [item, ...prev])
  }

  return { wishes, addWish }
}
