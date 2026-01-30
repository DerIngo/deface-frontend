import { render, screen } from '@testing-library/react'
import App from './App'

describe('App shell', () => {
  it('renders the Image Defacer heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /image defacer/i })).toBeInTheDocument()
  })
})
