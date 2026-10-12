import React from 'react'
import {
  Sparkles,
  Unlock,
  Bell,
  Wifi,
  BatteryCharging,
  Power,
  Heart,
  Calendar,
} from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

interface WinLockScreenProps {
  guestName: string
  onUnlock: () => void
}

export const WinLockScreen: React.FC<WinLockScreenProps> = ({ guestName, onUnlock }) => {
  const today = new Date()
  const hours = today.getHours().toString().padStart(2, '0')
  const minutes = today.getMinutes().toString().padStart(2, '0')
  const dayName = today.toLocaleDateString('id-ID', { weekday: 'long' })
  const dateFormatted = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div
      data-testid="win-lock-screen"
      className="relative w-screen h-screen overflow-hidden flex flex-col justify-between items-center text-white select-none"
    >
      {/* Windows 11 Lockscreen Background with acrylic blur */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/35 to-slate-950/70 backdrop-blur-[2px]" />
      </div>

      {/* Top Lock Screen Clock & Date (Windows 11 Centered Font) */}
      <div className="relative z-10 pt-14 text-center space-y-1">
        <h1 className="text-7xl md:text-8xl font-light tracking-tight drop-shadow-xl font-sans">
          {hours}:{minutes}
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-200 drop-shadow">
          {dayName}, {dateFormatted}
        </p>
      </div>

      {/* Center Windows 11 Sign-In & Toast Notification Stack */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-[92%] space-y-4">
        {/* User Account Tile (Windows 11 Login Profile) */}
        <div className="flex flex-col items-center space-y-2.5">
          {/* Avatar Ring */}
          <div className="relative w-20 h-20 rounded-full p-1 bg-white/20 backdrop-blur-md shadow-2xl border border-white/30">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white overflow-hidden shadow-inner">
              <Heart className="w-9 h-9 fill-current text-white/95 animate-pulse" />
            </div>
            {/* Status dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-xs" />
          </div>

          {/* Account Name: Romeo & Juliet */}
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif-wedding text-white tracking-wide drop-shadow-md">
              {weddingData.couple.groom.name} & {weddingData.couple.bride.name}
            </h2>
            <p className="text-[11px] font-medium uppercase tracking-wider text-rose-300">
              Wedding Account • Active
            </p>
          </div>
        </div>

        {/* Windows 11 Acrylic Toast Notification Banner */}
        <div
          onClick={onUnlock}
          className="w-full rounded-2xl bg-slate-900/65 hover:bg-slate-900/80 active:scale-98 backdrop-blur-2xl border border-white/20 p-4 shadow-2xl transition duration-200 cursor-pointer group"
        >
          {/* Notification Header */}
          <div className="flex items-center justify-between text-xs text-slate-300 pb-2 mb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-rose-500/80 flex items-center justify-center text-white">
                <Bell className="w-3 h-3" />
              </div>
              <span className="font-semibold text-white tracking-wide text-[11px]">
                Windows Notification Center
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Baru saja</span>
          </div>

          {/* Notification Body */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Undangan Pernikahan
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h3 className="text-xl font-bold text-rose-200 font-serif-wedding">
              {guestName}
            </h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
              <Calendar className="w-3 h-3 text-rose-400" />
              <span>{weddingData.events.akad.date} • {weddingData.events.akad.venue}</span>
            </p>
          </div>

          {/* Action Button inside Notification (Sign In / Unlock) */}
          <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-end">
            <button
              onClick={e => {
                e.stopPropagation()
                onUnlock()
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 active:scale-98 text-white font-semibold text-xs shadow-lg shadow-rose-500/30 transition flex items-center justify-center gap-2 group-hover:shadow-rose-500/50"
            >
              <Unlock className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>Masuk & Buka Undangan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Windows 11 Lock Screen System Controls */}
      <div className="relative z-10 pb-7 w-full max-w-4xl px-8 flex items-center justify-between text-xs text-slate-300/80">
        <span className="text-[11px] hidden sm:inline-block">
          Tekan "Masuk & Buka Undangan" untuk memulai pengalaman desktop
        </span>
        <span className="text-[11px] sm:hidden">
          Klik notifikasi untuk masuk
        </span>

        {/* Quick Tray Status Icons (Network, Battery, Power) */}
        <div className="flex items-center gap-4 text-white/90">
          <Wifi className="w-4 h-4 cursor-pointer hover:text-white transition" />
          <BatteryCharging className="w-4 h-4 cursor-pointer hover:text-white transition" />
          <Power className="w-4 h-4 cursor-pointer hover:text-white transition" />
        </div>
      </div>
    </div>
  )
}
