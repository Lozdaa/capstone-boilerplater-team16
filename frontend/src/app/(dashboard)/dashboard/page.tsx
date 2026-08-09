import type { Metadata } from 'next'
import { MemberCard } from '@/components/team/MemberCard'
import { TEAM_NAME, PROJECT_NAME, teamMembers } from '@/lib/team-data'

export const metadata: Metadata = {
  title: 'Team',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{TEAM_NAME}</h1>
        <p className="mt-1 text-sm text-zinc-500">{PROJECT_NAME}</p>
      </div>

      {teamMembers.length === 0 ? (
        <p className="text-sm text-zinc-500">Team information is unavailable.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}