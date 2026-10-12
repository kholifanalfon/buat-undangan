import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, X, LucideIcon, Sparkles } from 'lucide-react'

interface WinWindowProps {
  id: string
  title: string
  icon?: LucideIcon
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  width?: string
  romanticFloral?: boolean
}

export const WinWindow: React.FC<WinWindowProps> = ({
  id,
  title,
  icon: Icon,
  isOpen,
  isMinimized,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  children,
  initialPosition = { x: 80, y: 50 },
  width = 'max-w-2xl',
  romanticFloral = true,
}) => {
  const [position, setPosition] = useState(initialPosition)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  if (!isOpen || isMinimized) return null

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus()
    if (isMaximized) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMaximized) return
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragStart.x)),
      y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragStart.y)),
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      data-testid={`win-window-${id}`}
      onMouseDown={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: isMaximized ? '100vw' : undefined,
        height: isMaximized ? 'calc(100vh - 48px)' : undefined,
      }}
      className={`fixed ${isMaximized ? 'rounded-none' : `${width} rounded-2xl`} ${
        isActive ? 'z-40 ring-1 ring-rose-300/60 shadow-2xl shadow-rose-900/10' : 'z-20 opacity-95 shadow-lg'
      } bg-white/95 backdrop-blur-2xl border ${
        romanticFloral ? 'border-rose-200/90 ring-1 ring-rose-200/50' : 'border-white/40'
      } flex flex-col overflow-hidden transition-shadow select-auto`}
    >
      {/* Romantic Window Frame Floral Corner Ornaments */}
      {romanticFloral && !isMaximized && (
        <>
          {/* Top-Left Corner Bouquet & Vine */}
          <div className="absolute -top-1 -left-1 z-30 pointer-events-none select-none flex items-center">
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl drop-shadow-sm filter"
            >
              🌸
            </motion.div>
            <span className="text-xs text-rose-300 font-serif opacity-75 -ml-1">❧</span>
          </div>

          {/* Top-Right Corner Floral Accent */}
          <div className="absolute top-1 right-28 z-30 pointer-events-none select-none hidden sm:flex items-center gap-1">
            <span className="text-xs text-rose-300 font-serif opacity-75">☙</span>
            <motion.div
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-sm drop-shadow-xs"
            >
              🌺
            </motion.div>
          </div>

          {/* Bottom-Left Rose Accent */}
          <div className="absolute bottom-1.5 left-2 z-30 pointer-events-none select-none flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-base drop-shadow-xs"
            >
              💐
            </motion.div>
            <span className="text-xs font-serif text-rose-300 opacity-60">❧</span>
          </div>

          {/* Bottom-Right Blossom Accent */}
          <div className="absolute bottom-1 right-2 z-30 pointer-events-none select-none flex items-center gap-1">
            <span className="text-xs font-serif text-rose-300 opacity-60">☙</span>
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-base drop-shadow-xs"
            >
              🌷
            </motion.div>
          </div>
        </>
      )}

      {/* Titlebar Windows 11 */}
      <div
        onMouseDown={handleMouseDown}
        className={`h-10 px-4 ${
          romanticFloral
            ? 'bg-gradient-to-r from-rose-50/95 via-pink-50/90 to-slate-100/90 border-b border-rose-200/70'
            : 'bg-slate-100/80 border-b border-slate-200/60'
        } flex items-center justify-between cursor-move select-none`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-rose-500" />}
          <span className="text-xs font-semibold text-slate-800 tracking-wide flex items-center gap-1.5">
            {title}
            {romanticFloral && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] bg-rose-100/80 text-rose-600 font-bold border border-rose-200">
                <Sparkles className="w-2.5 h-2.5 text-rose-500" />
                {id === 'couple' ? 'Wedding Couple' : 'Wedding OS'}
              </span>
            )}
          </span>
        </div>

        {/* Windows Controls (Minimize, Maximize, Close) */}
        <div className="flex items-center space-x-1" onMouseDown={e => e.stopPropagation()}>
          <button
            onClick={onMinimize}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
            aria-label="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
            aria-label="Maximize"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-600 transition"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-y-auto max-h-[75vh] bg-slate-50/50 relative">
        {children}
      </div>
    </div>
  )
}
