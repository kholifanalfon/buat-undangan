import React from 'react'
import { Sun, CloudSun, Droplets } from 'lucide-react'
import { weddingData } from '../../../data/weddingData.ts'

export const WinWeather: React.FC = () => {
  const { city, temperature, condition, humidity } = weddingData.venueWeather

  return (
    <div
      data-testid="win-weather"
      className="w-56 p-3.5 rounded-2xl glass-acrylic shadow-xl border border-white/30 backdrop-blur-md text-slate-800"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="block text-xs font-bold text-slate-900">{city}</span>
          <span className="text-[10px] text-slate-500">Venue Forecast</span>
        </div>
        <CloudSun className="w-6 h-6 text-amber-500 animate-bounce" />
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-black text-slate-900">{temperature}</span>
        <span className="text-[11px] font-semibold text-slate-700">{condition}</span>
      </div>

      <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-slate-600">
        <span className="flex items-center gap-1">
          <Droplets className="w-3 h-3 text-sky-500" />
          Kelembapan {humidity}
        </span>
        <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
          <Sun className="w-3 h-3 text-amber-500" /> Perfect Day
        </span>
      </div>
    </div>
  )
}
