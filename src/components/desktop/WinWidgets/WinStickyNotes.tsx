import React from 'react'
import { Pin } from 'lucide-react'
import { weddingData } from '../../../data/weddingData.ts'

export const WinStickyNotes: React.FC = () => {
  return (
    <div
      data-testid="win-sticky-notes"
      className="w-72 p-5 rounded-2xl bg-amber-100/90 backdrop-blur-md shadow-2xl border border-amber-200/70 text-slate-800 relative select-none"
    >
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-amber-200/70">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <Pin className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Catatan Untuk Tamu
        </span>
        <span className="text-[10px] text-amber-800/80 font-mono font-medium">Pinned</span>
      </div>

      <p className="font-handwriting text-slate-800 leading-relaxed text-base">
        "Kehadiran dan doa restu Anda adalah pelengkap kebahagiaan bagi kami. Sampai jumpa di hari bahagia kami! 💖"
      </p>

      <div className="mt-3.5 pt-2 border-t border-amber-200/40 text-right">
        <span className="text-sm font-bold font-serif-wedding text-amber-950">
          - {weddingData.couple.groom.name} & {weddingData.couple.bride.name}
        </span>
      </div>
    </div>
  )
}
