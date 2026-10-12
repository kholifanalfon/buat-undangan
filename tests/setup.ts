import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock HTMLMediaElement methods in jsdom
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve())
window.HTMLMediaElement.prototype.pause = vi.fn().mockImplementation(() => {})
