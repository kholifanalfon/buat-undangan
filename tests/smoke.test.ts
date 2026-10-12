import { describe, it, expect } from 'vitest'

describe('Smoke Test Environment', () => {
  it('should pass basic assertion', () => {
    expect(true).toBe(true)
  })

  it('should support DOM manipulation in jsdom', () => {
    const div = document.createElement('div')
    div.textContent = 'Undangan Digital'
    expect(div.textContent).toBe('Undangan Digital')
  })
})
