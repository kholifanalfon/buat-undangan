import React, { useState, useEffect } from 'react'
import { Heart, Calendar, Image as ImageIcon, Gift, MessageSquare, BookHeart } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'
import { PolaroidPhoto } from '../../types/wedding.ts'

// Widgets
import { WinAnalogClock } from './WinWidgets/WinAnalogClock.tsx'
import { WinLoveMeter } from './WinWidgets/WinLoveMeter.tsx'
import { WinCalendar } from './WinWidgets/WinCalendar.tsx'
import { WinStickyNotes } from './WinWidgets/WinStickyNotes.tsx'
import { WinPolaroid } from './WinPolaroid.tsx'
import { LightboxModal } from '../common/LightboxModal.tsx'

// Windows & Apps
import { WinWindow } from './WinWindow.tsx'
import { WinTaskbar } from './WinTaskbar.tsx'
import { AppCouple } from '../apps/AppCouple.tsx'
import { AppEvents } from '../apps/AppEvents.tsx'
import { AppGallery } from '../apps/AppGallery.tsx'
import { AppRSVP } from '../apps/AppRSVP.tsx'
import { AppGift } from '../apps/AppGift.tsx'
import { AppStory } from '../apps/AppStory.tsx'

interface WinDesktopProps {
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
  triggerWindow?: WindowKey | null
}

type WindowKey = 'couple' | 'story' | 'events' | 'gallery' | 'rsvp' | 'gift'

export const WinDesktop: React.FC<WinDesktopProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  triggerWindow,
}) => {
  // Window states
  const [windows, setWindows] = useState<Record<WindowKey, { isOpen: boolean; isMinimized: boolean }>>({
    couple: { isOpen: true, isMinimized: false },
    story: { isOpen: false, isMinimized: false },
    events: { isOpen: false, isMinimized: false },
    gallery: { isOpen: false, isMinimized: false },
    rsvp: { isOpen: false, isMinimized: false },
    gift: { isOpen: false, isMinimized: false },
  })
  const [activeWindow, setActiveWindow] = useState<WindowKey>('couple')

  // Lightbox for Polaroid
  const [selectedPolaroid, setSelectedPolaroid] = useState<PolaroidPhoto | null>(null)
  const [showWidgets, setShowWidgets] = useState(true)

  const openWindow = (key: WindowKey) => {
    setWindows(prev => ({
      ...prev,
      [key]: { isOpen: true, isMinimized: false },
    }))
    setActiveWindow(key)
  }

  useEffect(() => {
    if (triggerWindow) {
      openWindow(triggerWindow)
    }
  }, [triggerWindow])

  const closeWindow = (key: WindowKey) => {
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], isOpen: false },
    }))
  }

  const minimizeWindow = (key: WindowKey) => {
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], isMinimized: true },
    }))
  }

  const toggleWindow = (key: WindowKey) => {
    if (!windows[key].isOpen) {
      openWindow(key)
    } else if (windows[key].isMinimized) {
      setWindows(prev => ({
        ...prev,
        [key]: { ...prev[key], isMinimized: false },
      }))
      setActiveWindow(key)
    } else if (activeWindow === key) {
      minimizeWindow(key)
    } else {
      setActiveWindow(key)
    }
  }

  const taskbarApps = [
    {
      id: 'couple',
      label: 'Mempelai',
      icon: Heart,
      isOpen: windows.couple.isOpen,
      isMinimized: windows.couple.isMinimized,
      isActive: activeWindow === 'couple' && windows.couple.isOpen && !windows.couple.isMinimized,
      onClick: () => toggleWindow('couple'),
    },
    {
      id: 'story',
      label: 'Love Story',
      icon: BookHeart,
      isOpen: windows.story.isOpen,
      isMinimized: windows.story.isMinimized,
      isActive: activeWindow === 'story' && windows.story.isOpen && !windows.story.isMinimized,
      onClick: () => toggleWindow('story'),
    },
    {
      id: 'events',
      label: 'Jadwal Acara',
      icon: Calendar,
      isOpen: windows.events.isOpen,
      isMinimized: windows.events.isMinimized,
      isActive: activeWindow === 'events' && windows.events.isOpen && !windows.events.isMinimized,
      onClick: () => toggleWindow('events'),
    },
    {
      id: 'gallery',
      label: 'Galeri Foto',
      icon: ImageIcon,
      isOpen: windows.gallery.isOpen,
      isMinimized: windows.gallery.isMinimized,
      isActive: activeWindow === 'gallery' && windows.gallery.isOpen && !windows.gallery.isMinimized,
      onClick: () => toggleWindow('gallery'),
    },
    {
      id: 'rsvp',
      label: 'Buku Tamu & RSVP',
      icon: MessageSquare,
      isOpen: windows.rsvp.isOpen,
      isMinimized: windows.rsvp.isMinimized,
      isActive: activeWindow === 'rsvp' && windows.rsvp.isOpen && !windows.rsvp.isMinimized,
      onClick: () => toggleWindow('rsvp'),
    },
    {
      id: 'gift',
      label: 'Amplop Digital',
      icon: Gift,
      isOpen: windows.gift.isOpen,
      isMinimized: windows.gift.isMinimized,
      isActive: activeWindow === 'gift' && windows.gift.isOpen && !windows.gift.isMinimized,
      onClick: () => toggleWindow('gift'),
    },
  ]

  return (
    <div
      data-testid="win-desktop"
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center select-none"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80')`,
      }}
    >
      {/* Subtle wallpaper gradient overlay */}
      <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[1px]" />

      {/* Desktop App Shortcuts (Left Column) with staggered entrance */}
      <div className="relative z-10 p-4 space-y-4 w-28 animate-in fade-in slide-in-from-left-6 duration-700 delay-100 fill-mode-both">
        {taskbarApps.map(app => {
          const Icon = app.icon
          return (
            <button
              key={app.id}
              onClick={() => openWindow(app.id as WindowKey)}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/15 text-white transition group w-24 text-center cursor-pointer"
            >
              <div className="p-2.5 rounded-2xl bg-white/10 group-hover:bg-white/25 border border-white/20 shadow-md backdrop-blur-md mb-1.5 transition">
                <Icon className="w-6 h-6 text-rose-300" />
              </div>
              <span className="text-[11px] font-medium drop-shadow text-slate-100 tracking-wide line-clamp-1">
                {app.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Polaroid Ornaments on Wallpaper (Cute Tilted Photos) */}
      <div className="absolute top-10 left-36 z-10 flex flex-col gap-6 pointer-events-auto animate-in fade-in zoom-in-75 duration-700 delay-300 fill-mode-both">
        {weddingData.polaroids.map(polaroid => (
          <WinPolaroid
            key={polaroid.id}
            polaroid={polaroid}
            onClick={p => setSelectedPolaroid(p)}
          />
        ))}
      </div>

      {/* Desktop Acrylic Widgets (Right Side floating gadgets) with slide entrance */}
      {showWidgets && (
        <div className="absolute top-8 right-8 z-10 flex flex-col items-end gap-4 pointer-events-auto animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both">
          {/* Top row: Clock & Love Meter */}
          <div className="flex items-center gap-3">
            <WinAnalogClock />
            <WinLoveMeter loveLevel={100} dDayCount={14} />
          </div>

          {/* Calendar Widget (Enlarged) */}
          <WinCalendar />

          {/* Sticky Notes (Enlarged) */}
          <WinStickyNotes />
        </div>
      )}

      {/* Draggable Windows with smooth pop entrance */}
      <div className="animate-in fade-in zoom-in-95 duration-500 delay-200 fill-mode-both">
        <WinWindow
          id="couple"
          title="Mempelai - Romeo & Juliet"
          icon={Heart}
          isOpen={windows.couple.isOpen}
          isMinimized={windows.couple.isMinimized}
          isActive={activeWindow === 'couple'}
          onClose={() => closeWindow('couple')}
          onMinimize={() => minimizeWindow('couple')}
          onFocus={() => setActiveWindow('couple')}
          initialPosition={{ x: 260, y: 40 }}
          romanticFloral={true}
        >
          <AppCouple />
        </WinWindow>

        <WinWindow
          id="story"
          title="Perjalanan Cinta (Our Love Story)"
          icon={BookHeart}
          isOpen={windows.story.isOpen}
          isMinimized={windows.story.isMinimized}
          isActive={activeWindow === 'story'}
          onClose={() => closeWindow('story')}
          onMinimize={() => minimizeWindow('story')}
          onFocus={() => setActiveWindow('story')}
          initialPosition={{ x: 280, y: 55 }}
          width="max-w-2xl"
        >
          <AppStory />
        </WinWindow>

        <WinWindow
          id="events"
          title="Jadwal Acara & Lokasi"
          icon={Calendar}
          isOpen={windows.events.isOpen}
          isMinimized={windows.events.isMinimized}
          isActive={activeWindow === 'events'}
          onClose={() => closeWindow('events')}
          onMinimize={() => minimizeWindow('events')}
          onFocus={() => setActiveWindow('events')}
          initialPosition={{ x: 300, y: 70 }}
        >
          <AppEvents />
        </WinWindow>

        <WinWindow
          id="gallery"
          title="Sweet Memories - Galeri Foto"
          icon={ImageIcon}
          isOpen={windows.gallery.isOpen}
          isMinimized={windows.gallery.isMinimized}
          isActive={activeWindow === 'gallery'}
          onClose={() => closeWindow('gallery')}
          onMinimize={() => minimizeWindow('gallery')}
          onFocus={() => setActiveWindow('gallery')}
          initialPosition={{ x: 320, y: 50 }}
          width="max-w-3xl"
        >
          <AppGallery />
        </WinWindow>

        <WinWindow
          id="rsvp"
          title="Buku Tamu & RSVP"
          icon={MessageSquare}
          isOpen={windows.rsvp.isOpen}
          isMinimized={windows.rsvp.isMinimized}
          isActive={activeWindow === 'rsvp'}
          onClose={() => closeWindow('rsvp')}
          onMinimize={() => minimizeWindow('rsvp')}
          onFocus={() => setActiveWindow('rsvp')}
          initialPosition={{ x: 340, y: 80 }}
        >
          <AppRSVP />
        </WinWindow>

        <WinWindow
          id="gift"
          title="Tanda Kasih (Amplop Digital)"
          icon={Gift}
          isOpen={windows.gift.isOpen}
          isMinimized={windows.gift.isMinimized}
          isActive={activeWindow === 'gift'}
          onClose={() => closeWindow('gift')}
          onMinimize={() => minimizeWindow('gift')}
          onFocus={() => setActiveWindow('gift')}
          initialPosition={{ x: 360, y: 90 }}
        >
          <AppGift />
        </WinWindow>
      </div>

      {/* Lightbox for clicked polaroid with thumbnails & next/prev navigation */}
      <LightboxModal
        isOpen={Boolean(selectedPolaroid)}
        photos={weddingData.polaroids}
        currentIndex={
          selectedPolaroid
            ? weddingData.polaroids.findIndex(p => p.id === selectedPolaroid.id)
            : 0
        }
        onIndexChange={idx => setSelectedPolaroid(weddingData.polaroids[idx] || null)}
        photoUrl={selectedPolaroid?.url || null}
        caption={selectedPolaroid?.caption}
        onClose={() => setSelectedPolaroid(null)}
        activeOS="windows"
      />

      {/* Windows 11 Centered Taskbar with slide up entrance */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
        <WinTaskbar
          apps={taskbarApps}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={onTogglePlay}
          onToggleMute={onToggleMute}
          onToggleWidgets={() => setShowWidgets(!showWidgets)}
          showWidgets={showWidgets}
        />
      </div>
    </div>
  )
}
