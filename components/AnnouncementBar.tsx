'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { SiteSettings } from '@/types'

interface AnnouncementBarProps {
  announcement: SiteSettings['announcement']
}

export default function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)

  if (!announcement || !announcement.enabled || dismissed) {
    return null
  }

  const now = new Date()
  if (announcement.showFrom && new Date(announcement.showFrom) > now) {
    return null
  }
  if (announcement.showUntil && new Date(announcement.showUntil) < now) {
    return null
  }

  const content = (
    <span className="inline-block text-[12px] font-medium uppercase tracking-[0.12em] text-center px-4 py-2.5">
      {announcement.text}
    </span>
  )

  return (
    <div
      id="announcement-bar"
      className="relative w-full z-50 flex items-center justify-center transition-all duration-300"
      style={{
        backgroundColor: announcement.bgColor || 'var(--color-secondary)',
        color: announcement.textColor || 'var(--color-surface)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center w-full">
        {announcement.link ? (
          <Link
            id="announcement-link"
            href={announcement.link}
            className="hover:opacity-85 transition-opacity underline-offset-4 hover:underline"
          >
            {content}
          </Link>
        ) : (
          content
        )}
      </div>

      {announcement.closeable && (
        <button
          id="announcement-close-btn"
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 p-1.5 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
