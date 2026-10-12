import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { OSType } from '../../hooks/useDevice.ts'

export interface LightboxPhotoItem {
  url: string
  caption?: string
}

interface LightboxModalProps {
  isOpen?: boolean
  photoUrl?: string | null
  caption?: string
  photos?: LightboxPhotoItem[]
  currentIndex?: number
  onIndexChange?: (index: number) => void
  onClose: () => void
  activeOS?: OSType
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  photoUrl,
  caption,
  photos,
  currentIndex = 0,
  onIndexChange,
  onClose,
  activeOS = 'windows',
}) => {
  const shouldShow = isOpen !== undefined ? isOpen : Boolean(photoUrl)

  // Track swipe direction for slide animation
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)

  // Determine list of items and active index
  const items: LightboxPhotoItem[] = photos && photos.length > 0
    ? photos
    : photoUrl
    ? [{ url: photoUrl, caption: caption }]
    : []

  const activeIdx = Math.max(0, Math.min(currentIndex, Math.max(0, items.length - 1)))
  const currentItem = items[activeIdx]

  const hasMultiple = items.length > 1

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!hasMultiple || !onIndexChange) return
    setSlideDirection('left')
    const prevIdx = activeIdx > 0 ? activeIdx - 1 : items.length - 1
    onIndexChange(prevIdx)
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!hasMultiple || !onIndexChange) return
    setSlideDirection('right')
    const nextIdx = activeIdx < items.length - 1 ? activeIdx + 1 : 0
    onIndexChange(nextIdx)
  }

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIdx, items.length])

  if (!shouldShow || !currentItem) return null

  return (
    <AnimatePresence>
      <div
        data-testid="lightbox-modal"
        className="fixed inset-0 z-[100] flex flex-col justify-between items-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-hidden select-none"
        onClick={onClose}
      >
        {/* Spacer top for centering */}
        <div className="w-full h-2 sm:h-4 shrink-0" />

        {/* Center Main Photo Frame with Horizontal Drag/Swipe */}
        <div
          className="relative flex flex-col items-center max-w-[95vw] sm:max-w-lg w-full my-auto"
          onClick={e => e.stopPropagation()}
        >
          {activeOS === 'windows' ? (
            /* =========================================================================
               WINDOWS 11 POLAROID FRAME PREVIEW
               ========================================================================= */
            <motion.div
              key={currentItem.url}
              initial={{
                opacity: 0,
                x: slideDirection === 'right' ? 80 : slideDirection === 'left' ? -80 : 0,
                scale: 0.92,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              drag={hasMultiple ? 'x' : false}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -300) {
                  handleNext()
                } else if (info.offset.x > 60 || info.velocity.x > 300) {
                  handlePrev()
                }
              }}
              className="relative bg-white p-3.5 pb-4 pt-3.5 rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] border border-slate-200/90 w-full cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Top-Left Cute Pink Ribbon / Bow Ornament */}
              <div className="absolute -top-3.5 -left-3 z-30 select-none pointer-events-none drop-shadow-md">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 18 C10 10 4 16 8 23 C12 28 18 20 18 18 Z"
                    fill="#f472b6"
                    stroke="#db2777"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M22 18 C30 10 36 16 32 23 C28 28 22 20 22 18 Z"
                    fill="#f472b6"
                    stroke="#db2777"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17 21 C13 28 9 32 6 36 L11 35 L15 31 Z"
                    fill="#ec4899"
                    stroke="#db2777"
                    strokeWidth="1"
                  />
                  <path
                    d="M23 21 C27 28 31 32 34 36 L29 35 L25 31 Z"
                    fill="#ec4899"
                    stroke="#db2777"
                    strokeWidth="1"
                  />
                  <circle
                    cx="20"
                    cy="19"
                    r="4.5"
                    fill="#f43f5e"
                    stroke="#be123c"
                    strokeWidth="1.5"
                  />
                  <circle cx="19" cy="18" r="1.5" fill="#fbcfe8" />
                </svg>
              </div>

              {/* Top-Right Windows Acrylic Close Button */}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute -top-3.5 -right-3.5 z-40 w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shadow-lg border-2 border-white transition active:scale-90 group cursor-pointer"
                aria-label="Tutup Preview"
              >
                <X className="w-4 h-4 stroke-[2.5] transition-transform group-hover:rotate-90 pointer-events-none" />
              </button>

              {/* Middle-Right Floating Golden Sparkle */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 select-none pointer-events-none drop-shadow">
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-300 animate-pulse" />
              </div>

              {/* Bottom-Right Cherry Blossom Flower Sticker */}
              <div className="absolute -bottom-3 -right-2.5 z-30 select-none pointer-events-none drop-shadow-md">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="18" cy="11" r="5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="24" cy="15" r="5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="22" cy="23" r="5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="14" cy="23" r="5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="12" cy="15" r="5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="18" cy="18" r="4" fill="#fb7185" />
                  <circle cx="18" cy="18" r="2" fill="#fef08a" />
                </svg>
              </div>

              {/* Main Polaroid Photo Container */}
              <div className="relative w-full bg-slate-900 rounded-xs overflow-hidden shadow-inner max-h-[50vh] sm:max-h-[55vh] flex items-center justify-center group pointer-events-none">
                <img
                  src={currentItem.url}
                  alt={currentItem.caption || 'Preview'}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[55vh] object-cover block"
                  draggable={false}
                />

                {/* Left/Right Floating Navigation Buttons */}
                {hasMultiple && (
                  <div className="pointer-events-auto">
                    <button
                      onClick={handlePrev}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition active:scale-90 backdrop-blur-xs border border-white/20 shadow-md cursor-pointer"
                      aria-label="Foto Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition active:scale-90 backdrop-blur-xs border border-white/20 shadow-md cursor-pointer"
                      aria-label="Foto Selanjutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Handwritten Caption at bottom */}
              <div className="pt-3 pb-1 text-center select-none">
                <p className="font-handwriting text-slate-800 text-xl font-bold tracking-wide leading-none">
                  {currentItem.caption || 'Sweet Moments'}
                </p>
                {hasMultiple && (
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    {activeIdx + 1} / {items.length} • Geser foto ke kiri / kanan
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            /* =========================================================================
               SAMSUNG ONE UI SQUIRCLE GALLERY PREVIEW
               ========================================================================= */
            <motion.div
              key={currentItem.url}
              initial={{
                opacity: 0,
                x: slideDirection === 'right' ? 80 : slideDirection === 'left' ? -80 : 0,
                scale: 0.92,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              drag={hasMultiple ? 'x' : false}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -300) {
                  handleNext()
                } else if (info.offset.x > 60 || info.velocity.x > 300) {
                  handlePrev()
                }
              }}
              className="relative bg-slate-900/95 backdrop-blur-2xl text-white p-3.5 pb-4 rounded-[32px] shadow-2xl border border-white/20 w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Top Samsung Gallery Header Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-400/30">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">
                    Samsung Gallery {hasMultiple && `(${activeIdx + 1}/${items.length})`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    onClose()
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4 pointer-events-none" />
                </button>
              </div>

              {/* Photo with Samsung Curved Corners & Controls */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black/60 max-h-[50vh] sm:max-h-[55vh] flex items-center justify-center border border-white/10 shadow-lg pointer-events-none">
                <img
                  src={currentItem.url}
                  alt={currentItem.caption || 'Preview'}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[55vh] object-cover block"
                  draggable={false}
                />

                {/* Left/Right Floating Navigation Buttons */}
                {hasMultiple && (
                  <div className="pointer-events-auto">
                    <button
                      onClick={handlePrev}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition active:scale-90 backdrop-blur-xs border border-white/20 shadow-md cursor-pointer"
                      aria-label="Foto Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition active:scale-90 backdrop-blur-xs border border-white/20 shadow-md cursor-pointer"
                      aria-label="Foto Selanjutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption & Info */}
              <div className="mt-3 px-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white leading-tight font-sans">
                    {currentItem.caption || 'Sweet Moments'}
                  </p>
                  <span className="text-[10px] text-white/60">Swipe untuk berpindah foto</span>
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    onClose()
                  }}
                  className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold shadow-md shadow-rose-500/30 transition cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* =========================================================================
           FIXED FOOTER THUMBNAIL STRIP (Always Fixed at bottom)
           ========================================================================= */}
        {hasMultiple ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="w-full flex justify-center pb-2 pt-2 shrink-0 z-40"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 p-2 px-3 rounded-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/20 shadow-2xl max-w-[92vw] sm:max-w-md overflow-x-auto scrollbar-none">
              {items.map((item, idx) => {
                const isActive = idx === activeIdx
                return (
                  <button
                    key={`${item.url}-${idx}`}
                    type="button"
                    onClick={() => {
                      if (onIndexChange) {
                        setSlideDirection(idx > activeIdx ? 'right' : 'left')
                        onIndexChange(idx)
                      }
                    }}
                    className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'ring-2 ring-rose-500 scale-105 opacity-100 shadow-lg shadow-rose-500/30'
                        : 'opacity-40 hover:opacity-80 hover:scale-98'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.caption || `Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </button>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <div className="w-full h-2 shrink-0" />
        )}
      </div>
    </AnimatePresence>
  )
}
