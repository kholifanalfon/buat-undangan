import React from 'react'
import { Heart } from 'lucide-react'

export const WinCalendar: React.FC = () => {
  // Calendar preview for Oktober 2026
  // Highlight: 25 Oktober (Day of Wedding)
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  
  // Oct 1 2026 is Thursday (index 4)
  // Total days in Oct = 31
  const dates = Array.from({ length: 31 }, (_, i) => i + 1)
  const emptySlots = [null, null, null, null] // Thurs start

  return (
    <div
      data-testid="win-calendar"
      className="w-72 p-4 rounded-2xl glass-acrylic shadow-2xl border border-white/40 backdrop-blur-md text-slate-800"
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/20">
        <div>
          <span className="font-bold text-sm text-slate-900 tracking-wide block">Oktober 2026</span>
          <span className="text-[11px] text-slate-500 font-medium">Bulan Pernikahan</span>
        </div>
        <span className="text-[11px] bg-rose-500/20 text-rose-700 font-bold px-2.5 py-1 rounded-full border border-rose-300/40">
          The Big Day
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center font-bold text-slate-600 text-xs mb-2">
        {days.map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
        {emptySlots.map((_, i) => (
          <div key={`empty-${i}`} className="h-7" />
        ))}
        {dates.map(date => {
          const isWeddingDay = date === 25
          return (
            <div
              key={date}
              className={`h-7 w-7 mx-auto flex items-center justify-center rounded-full transition-all relative ${
                isWeddingDay
                  ? 'bg-rose-500 text-white font-extrabold shadow-lg ring-2 ring-rose-300 scale-105'
                  : 'hover:bg-white/50 text-slate-700 font-medium'
              }`}
            >
              {date}
              {isWeddingDay && (
                <Heart className="w-3 h-3 text-white fill-white absolute -top-1.5 -right-1.5 drop-shadow" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
