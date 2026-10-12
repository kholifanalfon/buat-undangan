import React from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import type { OSType } from '../../hooks/useDevice.ts'

interface DeviceSwitcherProps {
  activeOS: OSType
  onToggle: () => void
}

export const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  activeOS,
  onToggle,
}) => {
  return (
    <div
      data-testid="device-switcher"
      className="fixed bottom-14 right-4 z-50 group"
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-95 text-xs font-semibold"
        title="Ganti Mode OS Preview"
      >
        {activeOS === 'windows' ? (
          <>
            <Smartphone className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Preview: Samsung One UI</span>
            <span className="sm:hidden">Samsung UI</span>
          </>
        ) : (
          <>
            <Monitor className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="hidden sm:inline">Preview: Windows 11</span>
            <span className="sm:hidden">Windows 11</span>
          </>
        )}
      </button>
    </div>
  )
}
