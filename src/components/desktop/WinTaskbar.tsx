import React, { useState } from 'react'
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  LayoutGrid,
} from 'lucide-react'

interface TaskbarApp {
  id: string
  label: string
  icon: React.ElementType
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
  onClick: () => void
}

interface WinTaskbarProps {
  apps: TaskbarApp[]
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
  onToggleWidgets?: () => void
  showWidgets?: boolean
}

export const WinTaskbar: React.FC<WinTaskbarProps> = ({
  apps,
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onToggleWidgets,
  showWidgets,
}) => {
  const [showStart, setShowStart] = useState(false)
  const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  const currentDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'numeric', year: 'numeric' })

  return (
    <div
      data-testid="win-taskbar"
      className="fixed bottom-0 left-0 right-0 h-12 glass-acrylic-dark border-t border-white/10 z-50 flex items-center justify-between px-3 select-none text-white backdrop-blur-2xl"
    >
      {/* Left empty spacer for true center alignment */}
      <div className="w-32 flex items-center gap-1">
        {onToggleWidgets && (
          <button
            onClick={onToggleWidgets}
            className={`p-2 rounded-xl transition ${
              showWidgets ? 'bg-white/20 text-rose-300' : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Toggle Widgets"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Centered Windows 11 App Icons */}
      <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-2xl border border-white/5">
        {/* Windows 11 Start Icon */}
        <button
          onClick={() => setShowStart(!showStart)}
          className={`p-2 rounded-xl transition relative group ${
            showStart ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title="Start"
        >
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-sky-400 rounded-xs" />
            <div className="bg-sky-400 rounded-xs" />
            <div className="bg-sky-400 rounded-xs" />
            <div className="bg-sky-400 rounded-xs" />
          </div>
        </button>

        {/* Running Apps */}
        {apps.map(app => {
          const Icon = app.icon
          return (
            <button
              key={app.id}
              onClick={app.onClick}
              className={`p-2 rounded-xl transition relative flex flex-col items-center justify-center ${
                app.isActive
                  ? 'bg-white/20 text-rose-300'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
              title={app.label}
            >
              <Icon className="w-4 h-4" />
              {/* Running underline indicator */}
              {app.isOpen && (
                <div
                  className={`absolute bottom-0.5 w-1.5 h-0.5 rounded-full ${
                    app.isActive ? 'bg-rose-400 w-3' : 'bg-slate-400'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* System Tray (Audio, Network, Clock) */}
      <div className="flex items-center gap-3 text-xs text-slate-300 pr-2">
        {/* Music Controls */}
        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-xl">
          <button
            onClick={onTogglePlay}
            className="hover:text-rose-300 p-0.5 transition"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-rose-400" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onToggleMute}
            className="hover:text-rose-300 p-0.5 transition"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Date and Time */}
        <div className="text-right leading-tight cursor-default">
          <div className="font-semibold text-white">{currentTime}</div>
          <div className="text-[10px] text-slate-400">{currentDate}</div>
        </div>
      </div>
    </div>
  )
}
