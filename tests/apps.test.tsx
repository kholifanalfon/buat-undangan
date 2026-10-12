import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppCouple } from '../src/components/apps/AppCouple.tsx'
import { AppEvents } from '../src/components/apps/AppEvents.tsx'
import { AppGallery } from '../src/components/apps/AppGallery.tsx'
import { AppGift } from '../src/components/apps/AppGift.tsx'
import { AppRSVP } from '../src/components/apps/AppRSVP.tsx'

describe('App Modules Rendering', () => {
  it('renders AppCouple with bride and groom names', () => {
    render(<AppCouple />)
    expect(screen.getByText(/Romeo Montague/i)).toBeInTheDocument()
    expect(screen.getByText(/Juliet Capulet/i)).toBeInTheDocument()
  })

  it('renders AppEvents with Akad and Resepsi', () => {
    render(<AppEvents />)
    expect(screen.getByText(/Akad Nikah/i)).toBeInTheDocument()
    expect(screen.getByText(/Resepsi Pernikahan/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Gedung Putih Grand Ballroom/i).length).toBeGreaterThan(0)
  })

  it('renders AppGallery with memories section', () => {
    render(<AppGallery />)
    expect(screen.getByText(/Sweet Memories/i)).toBeInTheDocument()
  })

  it('renders AppGift with bank details and copy option', () => {
    render(<AppGift />)
    expect(screen.getAllByText(/Tanda Kasih/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/8735091241/i)).toBeInTheDocument()
  })

  it('renders AppRSVP with form elements', () => {
    render(<AppRSVP />)
    expect(screen.getByText(/Konfirmasi Kehadiran & Doa Restu/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Contoh: Budi Santoso/i)).toBeInTheDocument()
  })
})
