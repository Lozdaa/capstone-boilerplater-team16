'use client'

import { useState } from 'react'
import { UserIcon } from 'lucide-react'
import type { TeamMember } from '@/types/team'

export function MemberCard({ member }: { member: TeamMember }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = member.photoUrl && !imgFailed

  return (
    <div className="flex min-h-[220px] flex-col rounded-lg bg-brand-500 p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
          {showPhoto ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="size-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <UserIcon className="size-6 text-zinc-400" />
          )}
        </div>
        <h3 className="text-lg font-semibold break-words text-white">{member.name}</h3>
      </div>

      <p className="mt-3 text-sm font-medium text-brand-50">{member.role}</p>

      <p className="mt-2 text-sm text-brand-50 whitespace-pre-line break-words">
        {member.blurb}
      </p>
    </div>
  )
}