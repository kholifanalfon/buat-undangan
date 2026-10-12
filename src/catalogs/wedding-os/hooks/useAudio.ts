import { useState, useRef, useEffect } from 'react'

export function useAudio(audioUrl: string) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(audioUrl)
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.pause()
      audioRef.current = null
    }
  }, [audioUrl])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay policy prevented playback until user interaction
      })
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const toggle = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return { isPlaying, isMuted, play, pause, toggle, toggleMute }
}
