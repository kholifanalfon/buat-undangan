import React from 'react'
import { PolaroidPhoto } from '../../types/wedding.ts'

interface WinPolaroidProps {
  polaroid: PolaroidPhoto
  onClick: (polaroid: PolaroidPhoto) => void
}

export const WinPolaroid: React.FC<WinPolaroidProps> = ({ polaroid, onClick }) => {
  return (
    <div
      data-testid={`win-polaroid-${polaroid.id}`}
      onClick={() => onClick(polaroid)}
      style={{
        transform: `rotate(${polaroid.rotation}deg)`,
      }}
      className="group cursor-pointer bg-white p-3 pb-5 shadow-2xl rounded-sm border border-slate-200 transition-all duration-300 hover:scale-105 hover:z-30 hover:shadow-rose-500/20 w-44 select-none relative"
    >
      {/* Tape effect at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-rose-200/70 backdrop-blur-xs rotate-[-2deg] shadow-xs" />

      {/* Photo Frame */}
      <div className="w-full h-36 bg-slate-100 overflow-hidden mb-2.5">
        <img
          src={polaroid.url}
          alt={polaroid.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Handwritten Caption */}
      <p className="text-center font-handwriting text-slate-800 text-sm font-semibold tracking-wide">
        {polaroid.caption}
      </p>
    </div>
  )
}
