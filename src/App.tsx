import { useState } from 'react'
import { useDevice } from './hooks/useDevice.ts'
import { useGuest } from './hooks/useGuest.ts'
import { useAudio } from './hooks/useAudio.ts'
import { weddingData } from './data/weddingData.ts'

// Desktop Windows 11 components
import { WinLockScreen } from './components/desktop/WinLockScreen.tsx'
import { WinDesktop } from './components/desktop/WinDesktop.tsx'

// Mobile Samsung One UI 6.1 components
import { OneUILockScreen } from './components/mobile/OneUILockScreen.tsx'
import { OneUIHomeScreen } from './components/mobile/OneUIHomeScreen.tsx'

// Common switcher & modals
import { DeviceSwitcher } from './components/common/DeviceSwitcher.tsx'
import { EventBriefModal } from './components/common/EventBriefModal.tsx'

export default function App() {
  const { activeOS, toggleOS } = useDevice()
  const { guestName } = useGuest()
  const { isPlaying, isMuted, play, toggle, toggleMute } = useAudio(weddingData.music.audioUrl)

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [showEventBrief, setShowEventBrief] = useState(false)
  const [targetAction, setTargetAction] = useState<'rsvp' | 'gift' | null>(null)

  const handleUnlock = () => {
    setIsUnlocking(true)
    play()
    setTimeout(() => {
      setIsUnlocked(true)
      setIsUnlocking(false)
      setShowEventBrief(true)
    }, 650)
  }

  const handleOpenRSVP = () => {
    setShowEventBrief(false)
    setTargetAction('rsvp')
  }

  const handleOpenGift = () => {
    setShowEventBrief(false)
    setTargetAction('gift')
  }

  return (
    <main className="w-screen h-screen overflow-hidden relative font-sans">
      {/* Operating System Render Branch */}
      {activeOS === 'windows' ? (
        <div className="relative w-full h-full">
          {/* Main Desktop (always rendered in background, no animation needed) */}
          <div className="w-full h-full">
            <WinDesktop
              isPlaying={isPlaying}
              isMuted={isMuted}
              onTogglePlay={toggle}
              onToggleMute={toggleMute}
              triggerWindow={targetAction}
            />
          </div>

          {/* Windows Lock Screen Overlay */}
          {!isUnlocked && (
            <div
              className={`absolute inset-0 z-50 transition-transform duration-700 ease-out ${
                isUnlocking
                  ? '-translate-y-full pointer-events-none'
                  : 'translate-y-0'
              }`}
            >
              <WinLockScreen guestName={guestName} onUnlock={handleUnlock} />
            </div>
          )}
        </div>
      ) : (
        /* Samsung One UI 6.1 Mobile Shell */
        <div className="w-full h-full max-w-md mx-auto relative shadow-2xl bg-slate-900 border-x border-slate-800 overflow-hidden">
          {/* Mobile Home Screen (always rendered in background, no animation needed) */}
          <div className="w-full h-full">
            <OneUIHomeScreen
              isPlaying={isPlaying}
              isMuted={isMuted}
              onTogglePlay={toggle}
              onToggleMute={toggleMute}
              triggerSheet={targetAction}
            />
          </div>

          {/* Samsung Lock Screen Overlay */}
          {!isUnlocked && (
            <div
              className={`absolute inset-0 z-50 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                isUnlocking
                  ? '-translate-y-full pointer-events-none'
                  : 'translate-y-0'
              }`}
            >
              <OneUILockScreen guestName={guestName} onUnlock={handleUnlock} />
            </div>
          )}
        </div>
      )}

      {/* Floating OS Switcher for interactive preview */}
      <DeviceSwitcher activeOS={activeOS} onToggle={toggleOS} />

      {/* Brief Event Info Dialog after Lock Screen Unlock */}
      <EventBriefModal
        isOpen={showEventBrief}
        onClose={() => setShowEventBrief(false)}
        activeOS={activeOS}
        onOpenRSVP={handleOpenRSVP}
        onOpenGift={handleOpenGift}
      />
    </main>
  )
}
