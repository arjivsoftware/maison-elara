'use client'

import React, { useState } from 'react'
import { WhatsAppIcon } from '@/components/icons/SocialIcons'
import type { SiteSettings } from '@/types'
import { buildWhatsAppUrl } from '@/lib/utils'

interface FloatingWhatsAppProps {
  settings: SiteSettings
}

export default function FloatingWhatsApp({ settings }: FloatingWhatsAppProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (!settings?.whatsapp?.enabled) {
    return null
  }

  const waNumber =
    settings.whatsapp.primaryNumber || settings.contact?.whatsapp || '+911212121212'
  const waMessage =
    settings.whatsapp.defaultMessage ||
    'Hello Maison Elara, I would like to make an enquiry regarding your handcrafted leather pieces.'
  const waUrl = buildWhatsAppUrl(waNumber, waMessage)

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover: "Chat with us" */}
      <div
        id="whatsapp-floating-tooltip"
        className={`hidden sm:flex items-center bg-[#1A1A2E] text-white text-[12px] font-semibold tracking-wide px-3.5 py-1.5 shadow-lg border border-white/10 transition-all duration-300 pointer-events-none whitespace-nowrap ${isHovered
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-2'
          }`}
      >
        <span>Chat with us</span>
        <div className="w-2 h-2 bg-[#1A1A2E] border-t border-r border-white/10 rotate-45 -mr-1 ml-2" />
      </div>

      {/* Circle button with pulsing gold animation ring */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing gold animation ring */}
        <span className="absolute -inset-1.5 rounded-full bg-[var(--color-primary)]/40 animate-ping pointer-events-none duration-1000" />
        <span className="absolute -inset-1 rounded-full border border-[var(--color-primary)]/60 animate-pulse pointer-events-none" />

        <a
          id="floating-whatsapp-btn"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Maison Elara Concierge"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Official WhatsApp Vector Icon */}
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      </div>
    </div>
  )
}

