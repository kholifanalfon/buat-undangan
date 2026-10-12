import React from 'react'
import { ChevronUp, Sparkles } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

interface OneUILockScreenProps {
  guestName: string
  onUnlock: () => void
}

export const OneUILockScreen: React.FC<OneUILockScreenProps> = ({ guestName, onUnlock }) => {
  const today = new Date()
  const hours = today.getHours().toString().padStart(2, '0')
  const minutes = today.getMinutes().toString().padStart(2, '0')
  const dayName = today.toLocaleDateString('id-ID', { weekday: 'long' })
  const dateFormatted = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })

  return (
    <div
      data-testid="oneui-lock-screen"
      onClick={onUnlock}
      className="relative w-full h-full min-h-screen overflow-hidden flex flex-col justify-between items-center text-white select-none cursor-pointer p-6"
    >
      {/* Prewedding Photo Background (Full Bleed, No Polaroids per user prompt) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
      </div>

      {/* Top Status Bar Placeholder */}
      <div className="relative z-10 w-full flex justify-between items-center text-xs font-semibold px-2 pt-2 text-white/90">
        <span>12:00</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <span>98%</span>
        </div>
      </div>

      {/* Center-Top One UI 6.1 Thick Lock Clock */}
      <div className="relative z-10 text-center space-y-1 mt-6">
        <h1 className="text-7xl font-bold tracking-tight drop-shadow-md font-sans">
          {hours}:{minutes}
        </h1>
        <p className="text-sm font-medium text-white/90 tracking-wide drop-shadow">
          {dayName}, {dateFormatted}
        </p>
      </div>

      {/* Middle Squircle Notification Card for Guest */}
      <div className="relative z-10 w-full max-w-sm p-4 rounded-3xl bg-black/45 backdrop-blur-xl border border-white/15 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-rose-500/80 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white tracking-wide">
              Wedding Invitation
            </span>
            <span className="block text-[10px] text-white/70">
              {weddingData.couple.groom.name} & {weddingData.couple.bride.name}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <p className="text-[11px] text-white/70">Undangan Spesial untuk:</p>
          <p className="text-base font-bold text-rose-300 font-serif-wedding">
            {guestName}
          </p>
        </div>
      </div>

      {/* Bottom Swipe Up Hint */}
      <div className="relative z-10 text-center pb-8 space-y-2 animate-bounce">
        <ChevronUp className="w-6 h-6 mx-auto text-white/80" />
        <p className="text-xs font-medium text-white/80 tracking-wider uppercase">
          Usap ke atas atau sentuh layar untuk membuka
        </p>
      </div>
    </div>
  )
}
