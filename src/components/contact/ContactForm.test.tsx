import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'

const mockReplace = vi.fn()
let mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  usePathname: () => '/contact',
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}))

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
}))

describe('ContactForm', () => {
  beforeEach(() => {
    mockReplace.mockClear()
    mockSearchParams = new URLSearchParams()
  })

  it('renders a disabled service fallback when options are unavailable', () => {
    render(<ContactForm serviceOptions={[]} />)

    const select = screen.getByLabelText(/service needed/i)
    expect(select).toBeDisabled()
    expect(screen.getByText('Service options failed to load. Please refresh.')).toBeInTheDocument()
  })

  it('keeps personal contact fields empty by default', () => {
    render(<ContactForm serviceOptions={['Cybersecurity']} />)

    const phone = screen.getByPlaceholderText('Your phone number (10 digits)')
    expect(phone).toHaveValue('')
    expect(screen.queryByDisplayValue('+91 98765 43210')).not.toBeInTheDocument()
  })

  it('renders selection summary and clears only selection query params', () => {
    mockSearchParams = new URLSearchParams({
      service: 'Cybersecurity',
      budget: '\u20B91,00,000\u2013\u20B95,00,000',
      selectionType: 'plan',
      departmentName: 'Cybersecurity',
      planName: 'Guard',
      price: '\u20B91,30,000',
      durationLabel: 'One-time',
    })

    render(<ContactForm serviceOptions={['Cybersecurity']} />)

    expect(screen.getByText(/You selected Cybersecurity - Guard - \u20B91,30,000 - One-time/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /change selection/i }))

    expect(mockReplace).toHaveBeenCalledWith(
      '/contact?service=Cybersecurity&budget=%E2%82%B91%2C00%2C000%E2%80%93%E2%82%B95%2C00%2C000',
      { scroll: false },
    )
  })

  it('accepts short plan query aliases for external prefill links', () => {
    mockSearchParams = new URLSearchParams({
      service: 'Cybersecurity',
      selectionType: 'plan',
      plan: 'Guard',
      price: '\u20B91,30,000',
      durationLabel: '6-month',
    })

    render(<ContactForm serviceOptions={['Cybersecurity']} />)

    expect(screen.getByText(/You selected Cybersecurity - Guard - \u20B91,30,000 - 6-month/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/budget range/i)).toHaveValue('\u20B91,00,000\u2013\u20B95,00,000')
    expect(screen.getByLabelText(/timeline/i)).toHaveValue('Within 3 months')
  })

  it('shows inline validation errors for missing required fields', async () => {
    render(<ContactForm serviceOptions={['Cybersecurity']} />)

    fireEvent.submit(screen.getByRole('button', { name: /submit enquiry/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
      expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
      expect(screen.getByText('Please select a service')).toBeInTheDocument()
    })
  })
})
