import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { OneUILockScreen } from '../src/catalogs/wedding-os/components/mobile/OneUILockScreen.tsx'
import { OneUIHomeScreen } from '../src/catalogs/wedding-os/components/mobile/OneUIHomeScreen.tsx'

describe('Samsung One UI 6.1 Shell', () => {
  it('renders OneUILockScreen with guest name and unlocks on click', () => {
    let unlocked = false
    render(<OneUILockScreen guestName="Siti Rahma" onUnlock={() => { unlocked = true }} />)

    expect(screen.getByText('Siti Rahma')).toBeInTheDocument()
    expect(screen.getByTestId('oneui-lock-screen')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('oneui-lock-screen'))
    expect(unlocked).toBe(true)
  })

  it('renders OneUIHomeScreen with widgets and app icons', () => {
    render(
      <OneUIHomeScreen
        isPlaying={false}
        isMuted={false}
        onTogglePlay={() => {}}
        onToggleMute={() => {}}
      />
    )

    expect(screen.getByTestId('oneui-home-screen')).toBeInTheDocument()
    expect(screen.getByText(/Menuju Hari Bahagia/i)).toBeInTheDocument()
    expect(screen.getByText(/A Thousand Years/i)).toBeInTheDocument()
    expect(screen.getByText('Mempelai')).toBeInTheDocument()
  })

  it('opens bottom sheet when an app squircle is clicked', () => {
    render(
      <OneUIHomeScreen
        isPlaying={false}
        isMuted={false}
        onTogglePlay={() => {}}
        onToggleMute={() => {}}
      />
    )

    const coupleAppBtn = screen.getByRole('button', { name: /Mempelai/i })
    fireEvent.click(coupleAppBtn)

    expect(screen.getByTestId('oneui-bottom-sheet')).toBeInTheDocument()
    expect(screen.getByText('Mempelai Pengantin')).toBeInTheDocument()
  })
})
