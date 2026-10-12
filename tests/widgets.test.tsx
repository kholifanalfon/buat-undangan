import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WinAnalogClock } from '../src/components/desktop/WinWidgets/WinAnalogClock.tsx'
import { WinLoveMeter } from '../src/components/desktop/WinWidgets/WinLoveMeter.tsx'
import { WinCalendar } from '../src/components/desktop/WinWidgets/WinCalendar.tsx'
import { WinWeather } from '../src/components/desktop/WinWidgets/WinWeather.tsx'
import { WinStickyNotes } from '../src/components/desktop/WinWidgets/WinStickyNotes.tsx'
import { WinPolaroid } from '../src/components/desktop/WinPolaroid.tsx'
import { LightboxModal } from '../src/components/common/LightboxModal.tsx'
import { weddingData } from '../src/data/weddingData.ts'

describe('Windows 11 Desktop Widgets & Polaroid', () => {
  it('renders WinAnalogClock successfully', () => {
    render(<WinAnalogClock />)
    expect(screen.getByTestId('win-analog-clock')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('renders WinLoveMeter with percentage and D-day count', () => {
    render(<WinLoveMeter loveLevel={100} dDayCount={14} />)
    expect(screen.getByTestId('win-love-meter')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('D-14')).toBeInTheDocument()
  })

  it('renders WinCalendar with October 2026 and wedding day highlight', () => {
    render(<WinCalendar />)
    expect(screen.getByTestId('win-calendar')).toBeInTheDocument()
    expect(screen.getByText('Oktober 2026')).toBeInTheDocument()
  })

  it('renders WinWeather with city and temperature', () => {
    render(<WinWeather />)
    expect(screen.getByTestId('win-weather')).toBeInTheDocument()
    expect(screen.getByText(weddingData.venueWeather.city)).toBeInTheDocument()
    expect(screen.getByText(weddingData.venueWeather.temperature)).toBeInTheDocument()
  })

  it('renders WinStickyNotes with handwritten message', () => {
    render(<WinStickyNotes />)
    expect(screen.getByTestId('win-sticky-notes')).toBeInTheDocument()
    expect(screen.getByText(/Notes to Guests/i)).toBeInTheDocument()
  })

  it('renders WinPolaroid and triggers click', () => {
    const polaroid = weddingData.polaroids[0]
    let clicked = false
    render(<WinPolaroid polaroid={polaroid} onClick={() => { clicked = true }} />)
    expect(screen.getByText(polaroid.caption)).toBeInTheDocument()
    fireEvent.click(screen.getByTestId(`win-polaroid-${polaroid.id}`))
    expect(clicked).toBe(true)
  })

  it('renders LightboxModal and handles close', () => {
    let closed = false
    render(
      <LightboxModal
        photoUrl="https://example.com/photo.jpg"
        caption="Our Trip"
        onClose={() => { closed = true }}
      />
    )
    expect(screen.getByText('Our Trip')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Tutup'))
    expect(closed).toBe(true)
  })
})
