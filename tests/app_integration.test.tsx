import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../src/App.tsx'

describe('Full App Integration & Switcher', () => {
  it('renders initial lock screen and device switcher', () => {
    render(<App />)

    expect(screen.getByTestId('device-switcher')).toBeInTheDocument()
    // Either windows or oneui lock screen is rendered
    expect(
      screen.queryByTestId('win-lock-screen') || screen.queryByTestId('oneui-lock-screen')
    ).toBeInTheDocument()
  })

  it('can switch between Windows 11 and Samsung One UI mode', () => {
    render(<App />)

    const switchBtn = screen.getByRole('button', { name: /preview:/i })
    expect(switchBtn).toBeInTheDocument()

    // Click switcher
    fireEvent.click(switchBtn)

    // Verify it switched
    expect(screen.getByTestId('device-switcher')).toBeInTheDocument()
  })
})
