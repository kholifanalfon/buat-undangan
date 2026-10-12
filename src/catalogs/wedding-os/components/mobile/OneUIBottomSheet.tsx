import React from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { X, Sparkles, Heart } from 'lucide-react'

interface OneUIBottomSheetProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export const OneUIBottomSheet: React.FC<OneUIBottomSheetProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  const dragControls = useDragControls()

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-testid="oneui-bottom-sheet"
          className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden"
        >
          {/* Backdrop Blur Overlay with Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Bottom Drawer with Drag Limited Only to Handle Bar Header */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 260,
              mass: 0.85,
            }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 400) {
                onClose()
              }
            }}
            onClick={e => e.stopPropagation()}
            className="relative z-10 w-full bg-white rounded-t-[36px] max-h-[85vh] flex flex-col shadow-2xl overflow-visible border-t-2 border-rose-200/90 shadow-rose-950/20"
          >
            {/* Top Floral Frame Ornaments - Exactly like Windows 11 Frame */}
            {/* Top-Left Corner Blossom & Vine */}
            <div className="absolute -top-3 left-3 z-30 pointer-events-none select-none flex items-center">
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl drop-shadow-md filter"
              >
                🌸
              </motion.div>
              <span className="text-xs text-rose-300 font-serif opacity-75 -ml-1">❧</span>
            </div>

            {/* Top-Right Floral Accent near Close */}
            <div className="absolute -top-2.5 right-12 z-30 pointer-events-none select-none flex items-center gap-1">
              <span className="text-xs text-rose-300 font-serif opacity-75">☙</span>
              <motion.div
                animate={{ rotate: [2, -2, 2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-base drop-shadow-md filter"
              >
                🌺
              </motion.div>
            </div>

            {/* Top Titlebar Header - Styled like Windows 11 Titlebar */}
            <div
              onPointerDown={e => dragControls.start(e)}
              className="relative w-full pt-3 pb-3 flex flex-col items-center cursor-grab active:cursor-grabbing select-none touch-none bg-gradient-to-r from-rose-50/95 via-pink-50/90 to-slate-50/90 border-b border-rose-200/70 rounded-t-[36px]"
            >
              {/* One UI Pill Handle */}
              <div className="w-10 h-1.5 bg-rose-200 rounded-full mb-2.5 hover:bg-rose-300 transition" />

              {/* Titlebar Row */}
              <div className="w-full px-5 pl-7 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight font-serif-wedding flex items-center gap-1.5">
                    {title}
                  </h3>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] bg-rose-100/90 text-rose-600 font-bold border border-rose-200 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-rose-500" />
                    Wedding OS
                  </span>
                </div>

                {/* Right controls: Close Button */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    onClose()
                  }}
                  className="w-7 h-7 rounded-lg hover:bg-rose-500 hover:text-white bg-slate-100 text-slate-600 flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs"
                  aria-label="Tutup Sheet"
                >
                  <X className="w-3.5 h-3.5 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Sheet Scrollable Content (Clean White Background, Compact Padding) */}
            <div className="flex-1 overflow-y-auto p-1.5 sm:p-2 pb-6 overscroll-contain relative bg-white">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
