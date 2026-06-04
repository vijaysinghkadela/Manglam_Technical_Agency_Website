import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AnimatedCheckbox } from './AnimatedCheckbox'

describe('AnimatedCheckbox', () => {
  it('renders an accessible checkbox input', () => {
    render(<AnimatedCheckbox aria-label="Consent" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Consent' })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })
})
