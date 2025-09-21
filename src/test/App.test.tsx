import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock the router for testing
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

describe('App', () => {
  it('renders without crashing', () => {
    render(<AppWithRouter />)
    expect(document.body).toBeInTheDocument()
  })

  it('renders the main application structure', () => {
    const { container } = render(<AppWithRouter />)
    // Check if the app renders content
    expect(container.firstChild).toBeInTheDocument()
  })
})