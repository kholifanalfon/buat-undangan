import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WinLockScreen } from '../src/components/desktop/WinLockScreen.tsx'
import { WinDesktop } from '../src/components/desktop/WinDesktop.tsx'

describe('Windows 11 Shell & Window Manager', () => {
  it('renders WinLockScreen with guest name and triggers unlock', () => {
    let unlocked = false
    render(<WinLockScreen guestName="Budi Santoso" onUnlock={() => { unlocked = true }} />)

    expect(screen.getByText('Budi Santoso')).toBeInTheDocument()
    const unlockBtn = screen.getByRole('button', { name: /Buka Undangan/i })
    expect(unlockBtn).toBeInTheDocument()

    fireEvent.click(unlockBtn)
    expect(unlocked).toBe(true)
  })

  it('renders WinDesktop with default open Couple window and taskbar', () => {
    render(
      <WinDesktop
        isPlaying={false}
        isMuted={false}
        onTogglePlay={() => {}}
        onToggleMute={() => {}}
      />
    )

    expect(screen.getByTestId('win-desktop')).toBeInTheDocument()
    expect(screen.getByTestId('win-taskbar')).toBeInTheDocument()
    expect(screen.getByTestId('win-window-couple')).toBeInTheDocument()
  })

  it('allows opening other windows via shortcuts/taskbar', () => {
    render(
      <WinDesktop
        isPlaying={false}
        isMuted={false}
        onTogglePlay={() => {}}
        onToggleMute={() => {}}
      />
    )

    // Open RSVP window
    const rsvpButtons = screen.getAllByTitle(/Buku Tamu & RSVP/i)
    fireEvent.click(rsvpButtons[0])

    expect(screen.getByTestId('win-window-rsvp')).toBeInTheDocument()
  })
})
