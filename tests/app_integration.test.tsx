import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../src/App.tsx'

describe('Catalog and Preview Integration', () => {
  it('renders Catalog Home with product list and cards', () => {
    window.location.hash = ''
    render(<App />)

    expect(screen.getByText('UndanganStudio')).toBeInTheDocument()
    expect(screen.getByText('Katalog Template')).toBeInTheDocument()
    expect(screen.getByText('Wedding OS Edition')).toBeInTheDocument()
  })

  it('can open Wedding OS Preview and switch device mode', () => {
    window.location.hash = '#/preview/wedding-os'
    render(<App />)

    expect(screen.getByText('Kembali ke Katalog')).toBeInTheDocument()
    expect(screen.getByTestId('device-switcher')).toBeInTheDocument()

    const switchBtn = screen.getByRole('button', { name: /preview:/i })
    expect(switchBtn).toBeInTheDocument()
    fireEvent.click(switchBtn)
    expect(screen.getByTestId('device-switcher')).toBeInTheDocument()
  })
})
