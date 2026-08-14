// __tests__/team-page.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const members = [
  { id: '1', name: 'Too Human', role: 'Frontend', blurb: 'This one here works on the frontend but I do not like the look of it cause it is just that little too human you know? That Uncanny Valley.' },
  { id: '2', name: 'Human After All', role: 'Backend', blurb: 'I think this one works? All I can say is that they are a pure technologic steam machine who has no on/off switch and acts like this the prime time of their life.', photoUrl: 'HAA.png' },
]

// Async rendering the Team Page (Dashboard) with mock filler element as to then check if displayed later
async function renderPage(teamMembers: typeof members) {
  vi.resetModules() // clears the module cache so the fresh mock takes effect
  vi.doMock('@/lib/team-data', () => ({
    TEAM_NAME: 'Team 16',
    PROJECT_NAME: 'Garage Boilerplate',
    teamMembers,
  }))
  const { default: TeamPage } = await import('@/app/(dashboard)/dashboard/page')
  render(<TeamPage />)
}

// Resetting whatever is cached in vitest
// cached elements could mess up tests and what features are checked for
beforeEach(() => vi.resetModules())

// Checking the team page
describe('Team Page', () => {
  it('checks team and project name are loaded and are the same as set', async () => {
    await renderPage(members)
    expect(screen.getByRole('heading', { level: 1, name: 'Team 16' })).toBeInTheDocument()
    expect(screen.getByText('Garage Boilerplate')).toBeInTheDocument()
  })

  it('renders a card for each member', async () => {
    await renderPage(members)
    expect(screen.getByText('Too Human')).toBeInTheDocument()
    expect(screen.getByText('Human After All')).toBeInTheDocument()
    expect(screen.queryByText(/unavailable/i)).not.toBeInTheDocument()
  })

  it('shows the fallback when there are no members', async () => {
    await renderPage([])
    expect(screen.getByText('Team information is unavailable.')).toBeInTheDocument()
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument()
  })

  // Checks for specifically if the SVG for placeholder icon is loaded
  // Using the first member card since that has no photoURL
  it('renders the placeholder image', async () => {
    await renderPage(members)
    expect(document.querySelector('svg')).toBeInTheDocument()
    const cards = document.querySelectorAll('.rounded-lg.bg-brand-500')
    const card = cards[0]
    expect(card).toBeDefined()
    expect(card!.querySelector('svg')).toBeInTheDocument() // ! in TypeScript means it has to be defined 
  })

  // This checks second user to see if image for them has loaded
  // Done by seeing if image element holds their photoURL
  it('renders a users image', async () => {
    await renderPage(members)
    expect(screen.getByRole('img', { name: 'Human After All' })).toHaveAttribute(
    'src',
    'HAA.png',
    )
  })

  // Seeing if blurb text holds the given classes
  // This is more tested visually but this is a just in case
  it('wraps long blurbs instead of overflowing', async () => {
    const longBrokenBlurb = 'x '.repeat(300)
    const longUnbrokenBlurb = 'a'.repeat(500)

    await renderPage([
      { id: '1', name: 'Broken', role: 'Frontend', blurb: longBrokenBlurb },
      { id: '2', name: 'Unbroken', role: 'Frontend', blurb: longUnbrokenBlurb },
    ])

    for (const text of [longBrokenBlurb.trim(), longUnbrokenBlurb]) {
      expect(screen.getByText(text)).toHaveClass('break-words', 'whitespace-pre-line')
    }
  })

})