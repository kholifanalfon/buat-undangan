import React, { useState, useEffect } from 'react'

export const WinAnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  const secondDegrees = (seconds / 60) * 360
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360
  const hourDegrees = ((hours + minutes / 60) / 12) * 360

  return (
    <div
      data-testid="win-analog-clock"
      className="w-36 h-36 rounded-full glass-acrylic border-2 border-white/40 shadow-xl flex items-center justify-center relative p-2 select-none"
    >
      {/* Numbers / Dials */}
      <div className="absolute inset-1 rounded-full border border-white/20 bg-sky-100/10 backdrop-blur-md">
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => {
          const angle = (num / 12) * 360
          return (
            <span
              key={num}
              style={{
                transform: `rotate(${angle}deg) translate(0, -48px) rotate(-${angle}deg)`,
              }}
              className="absolute inset-0 m-auto w-4 h-4 text-[10px] font-semibold text-slate-800 flex items-center justify-center"
            >
              {num}
            </span>
          )
        })}

        {/* Hour Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-1.5 h-8 bg-slate-800 rounded-full origin-bottom -translate-x-1/2 -translate-y-full transition-transform duration-75"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hourDegrees}deg)` }}
        />

        {/* Minute Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-12 bg-slate-700 rounded-full origin-bottom -translate-x-1/2 -translate-y-full transition-transform duration-75"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minuteDegrees}deg)` }}
        />

        {/* Second Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-0.5 h-13 bg-rose-500 rounded-full origin-bottom -translate-x-1/2 -translate-y-full transition-transform duration-75"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondDegrees}deg)` }}
        />

        {/* Center pin */}
        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white -translate-x-1/2 -translate-y-1/2 shadow-sm" />
      </div>
    </div>
  )
}
