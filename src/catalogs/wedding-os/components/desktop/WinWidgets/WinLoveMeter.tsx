import React from 'react'
import { Heart } from 'lucide-react'

interface WinLoveMeterProps {
  loveLevel?: number // percentage 0 - 100
  dDayCount?: number // days remaining
}

export const WinLoveMeter: React.FC<WinLoveMeterProps> = ({
  loveLevel = 100,
  dDayCount = 14,
}) => {
  return (
    <div
      data-testid="win-love-meter"
      className="flex items-center gap-2 p-2.5 rounded-2xl glass-acrylic shadow-lg border border-white/30 backdrop-blur-md"
    >
      {/* Gauge 1: Love Level */}
      <div className="relative w-16 h-16 rounded-full bg-white/30 border border-white/40 flex flex-col items-center justify-center p-1 text-center">
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mb-0.5 animate-pulse" />
        <span className="text-[11px] font-extrabold text-slate-800 leading-none">{loveLevel}%</span>
        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Love</span>
      </div>

      {/* Gauge 2: D-Day */}
      <div className="relative w-14 h-14 rounded-full bg-white/30 border border-white/40 flex flex-col items-center justify-center p-1 text-center">
        <span className="text-[11px] font-black text-rose-600 leading-none">D-{dDayCount}</span>
        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Days</span>
      </div>
    </div>
  )
}
