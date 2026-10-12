import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Gift,
  Play,
  Pause,
  SkipForward,
  Music,
  BookHeart,
  Sparkles,
} from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

// Bottom Sheet
import { OneUIBottomSheet } from './OneUIBottomSheet.tsx'

// Shared App Components
import { AppCouple } from '../apps/AppCouple.tsx'
import { AppEvents } from '../apps/AppEvents.tsx'
import { AppGallery } from '../apps/AppGallery.tsx'
import { AppRSVP } from '../apps/AppRSVP.tsx'
import { AppGift } from '../apps/AppGift.tsx'
import { AppStory } from '../apps/AppStory.tsx'

interface OneUIHomeScreenProps {
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
  triggerSheet?: SheetKey
}

type SheetKey = 'couple' | 'story' | 'events' | 'gallery' | 'rsvp' | 'gift' | null

export const OneUIHomeScreen: React.FC<OneUIHomeScreenProps> = ({
  isPlaying,
  onTogglePlay,
  triggerSheet,
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetKey>(null)

  useEffect(() => {
    if (triggerSheet) {
      setActiveSheet(triggerSheet)
    }
  }, [triggerSheet])

  const apps = [
    {
      id: 'couple',
      name: 'Mempelai',
      icon: Heart,
      color: 'bg-rose-500 text-white',
      flower: '🌸',
      vine: '❧',
      corner: '-top-2 -left-2',
      rotation: 'group-hover:rotate-12',
    },
    {
      id: 'story',
      name: 'Cerita',
      icon: BookHeart,
      color: 'bg-purple-500 text-white',
      flower: '🌺',
      vine: '☙',
      corner: '-top-2 -right-2',
      rotation: 'group-hover:-rotate-12',
    },
    {
      id: 'events',
      name: 'Acara',
      icon: Calendar,
      color: 'bg-indigo-500 text-white',
    },
    {
      id: 'gallery',
      name: 'Galeri',
      icon: ImageIcon,
      color: 'bg-amber-500 text-white',
    },
    {
      id: 'rsvp',
      name: 'RSVP',
      icon: MessageSquare,
      color: 'bg-emerald-500 text-white',
    },
    {
      id: 'gift',
      name: 'Amplop',
      icon: Gift,
      color: 'bg-pink-500 text-white',
    },
  ]

  return (
    <div
      data-testid="oneui-home-screen"
      className="relative w-full h-full min-h-screen overflow-y-auto pb-24 text-white select-none"
    >
      {/* Full Bleed Prewedding Wallpaper (no polaroids) */}
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none animate-in fade-in duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 p-5 space-y-6">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-xs font-semibold px-1 text-white/90 animate-in fade-in duration-500">
          <span>12:00</span>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <span>98%</span>
          </div>
        </div>

        {/* Romantic 'Menuju Hari Bahagia' Feature Widget with Shimmer and Heartbeat Animation */}
        {/* Romantic 'Menuju Hari Bahagia' Flat Feature Widget (Matching image dark translucent style, No Shadow) */}
        <motion.div
          onClick={() => setActiveSheet('events')}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative overflow-hidden p-5 rounded-3xl bg-black/40 border border-white/10 cursor-pointer select-none"
        >
          {/* Floating flower petals inside widget (flat animation without shadow) */}
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2.5 right-20 text-sm pointer-events-none select-none opacity-60"
          >
            🌸
          </motion.span>
          <motion.span
            animate={{ y: [0, -6, 0], rotate: [0, -20, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-3 right-6 text-xs pointer-events-none select-none opacity-50"
          >
            ✨
          </motion.span>

          {/* Header Row: Label & Animated D-Day Pill */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-6 rounded-lg bg-rose-500/30 border border-rose-500/40 flex items-center justify-center text-rose-300"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-300" />
              </motion.div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">
                Menuju Hari Bahagia
              </span>
            </div>

            <div className="flex items-center gap-1 bg-rose-500/20 px-2.5 py-0.5 rounded-full font-bold text-xs text-rose-200 border border-rose-500/30">
              <Sparkles className="w-3 h-3 text-rose-300" />
              <span>D-14</span>
            </div>
          </div>

          {/* Couple Name with Serif Font (Flat, no drop-shadow) */}
          <h4 className="text-xl font-bold font-serif-wedding text-white tracking-wide">
            {weddingData.couple.groom.name} & {weddingData.couple.bride.name}
          </h4>

          {/* Wedding Date & Venue info */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-xs text-white/70">
            <span className="font-medium">Minggu, 25 Oktober 2026</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white font-semibold">
              Bandung
            </span>
          </div>
        </motion.div>

        {/* Samsung Music Mini Player Widget (Flat, No Shadow) */}
        <div className="p-3.5 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-between animate-in fade-in slide-in-from-bottom-3 duration-600 delay-300 fill-mode-both">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/30 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Music className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold leading-none mb-1">{weddingData.music.title}</p>
              <p className="text-[10px] text-white/70 leading-none">{weddingData.music.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePlay}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition active:scale-90"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-rose-300" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              className="p-2 rounded-full hover:bg-white/10 text-white/80 transition"
              aria-label="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* App Icons Grid (One UI 6.1 Squircle Style) with staggered bounce */}
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400 fill-mode-both">
          <div className="flex items-center gap-1.5 mb-3 px-1 text-white/80">
            <span className="text-xs">🌸</span>
            <h4 className="text-xs font-semibold uppercase tracking-wider">
              Menu Undangan
            </h4>
            <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent ml-1" />
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            {apps.map(app => {
              const Icon = app.icon
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveSheet(app.id as SheetKey)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative">
                    {/* Flower & botanical vine attached only when suitable */}
                    {app.flower && (
                      <div className={`absolute ${app.corner} z-20 pointer-events-none select-none flex items-center`}>
                        <span className={`text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] filter transition-transform group-hover:scale-125 ${app.rotation} duration-200 inline-block`}>
                          {app.flower}
                        </span>
                        <span className="text-[10px] text-rose-200 font-serif opacity-80 -ml-0.5 pointer-events-none select-none">
                          {app.vine}
                        </span>
                      </div>
                    )}

                    {/* Clean Solid Squircle Icon Container */}
                    <div
                      className={`relative w-14 h-14 rounded-2xl ${app.color} shadow-md flex items-center justify-center transition-all group-active:scale-90 group-hover:scale-105 duration-200 overflow-hidden ring-1 ring-white/20`}
                    >
                      <Icon className="w-6 h-6 drop-shadow-xs transition-transform group-hover:scale-110 duration-200" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-white/95 mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-tight">
                    {app.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* One UI Bottom Sheets */}
      <OneUIBottomSheet
        isOpen={activeSheet === 'couple'}
        title="Mempelai Pengantin"
        onClose={() => setActiveSheet(null)}
      >
        <AppCouple />
      </OneUIBottomSheet>

      <OneUIBottomSheet
        isOpen={activeSheet === 'story'}
        title="Our Love Story"
        onClose={() => setActiveSheet(null)}
      >
        <AppStory />
      </OneUIBottomSheet>

      <OneUIBottomSheet
        isOpen={activeSheet === 'events'}
        title="Jadwal Acara & Lokasi"
        onClose={() => setActiveSheet(null)}
      >
        <AppEvents />
      </OneUIBottomSheet>

      <OneUIBottomSheet
        isOpen={activeSheet === 'gallery'}
        title="Sweet Memories"
        onClose={() => setActiveSheet(null)}
      >
        <AppGallery />
      </OneUIBottomSheet>

      <OneUIBottomSheet
        isOpen={activeSheet === 'rsvp'}
        title="Buku Tamu & RSVP"
        onClose={() => setActiveSheet(null)}
      >
        <AppRSVP />
      </OneUIBottomSheet>

      <OneUIBottomSheet
        isOpen={activeSheet === 'gift'}
        title="Amplop Digital"
        onClose={() => setActiveSheet(null)}
      >
        <AppGift />
      </OneUIBottomSheet>
    </div>
  )
}
