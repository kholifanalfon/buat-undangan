import { useState, useEffect } from 'react'

export type OSType = 'windows' | 'samsung'

export function useDevice() {
  const [activeOS, setActiveOS] = useState<OSType>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'windows' : 'samsung'
    }
    return 'windows'
  })

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024
    }
    return true
  })

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleOS = () => {
    setActiveOS(prev => (prev === 'windows' ? 'samsung' : 'windows'))
  }

  const setOS = (os: OSType) => {
    setActiveOS(os)
  }

  return { isDesktop, activeOS, toggleOS, setOS }
}
