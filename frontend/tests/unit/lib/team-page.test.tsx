// __tests__/team-page.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const members = [
  { id: '1', name: 'Too Human', role: 'Frontend' },
  { id: '2', name: 'Human After All', role: 'Backend' },
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
})