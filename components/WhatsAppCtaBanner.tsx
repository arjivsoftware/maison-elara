'use client'

import React from 'react'
import { WhatsAppIcon } from '@/components/icons/SocialIcons'
import type { SiteSettings } from '@/types'
import { buildWhatsAppUrl } from '@/lib/utils'

interface WhatsAppCtaBannerProps {
  settings: SiteSettings
}

export default function WhatsAppCtaBanner({ settings }: WhatsAppCtaBannerProps) {
  const whatsappNumber =
    settings.whatsapp?.primaryNumber || settings.contact?.whatsapp || '+911212121212'
  const message =
    settings.whatsapp?.catalogMessage ||
    settings.whatsapp?.defaultMessage ||
    'Hello Maison Elara, please share the latest bespoke catalog.'

  const waUrl = buildWhatsAppUrl(whatsappNumber, message)
  const buttonLabel =
    settings.whatsapp?.defaultMessage && settings.whatsapp.defaultMessage.length < 40
      ? settings.whatsapp.defaultMessage
      : 'Enquire on WhatsApp'

  return (
    <section
      id="whatsapp-cta-banner-section"
      className="w-full bg-[#F2EDE8] py-16 md:py-20 border-t border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 bg-white/60 p-8 sm:p-12 border border-[var(--color-border)] shadow-sm">
          {/* Left Column: Heading & Subtext */}
          <div className="max-w-2xl text-center lg:text-left">
            <h2
              id="whatsapp-banner-heading"
              className="font-heading text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-[#1A1A2E] tracking-tight leading-tight mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Prefer to Shop Personally?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#5C5549] leading-relaxed">
              Our team is available Mon–Sat, 10am–7pm IST. Ask anything — from sizing to customisation.
            </p>
          </div>

          {/* Right Column: Deep Green WhatsApp Button */}
          <div className="flex-shrink-0 w-full sm:w-auto text-center">
            <a
              id="whatsapp-personal-cta-button"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3.5 bg-[#128C7E] hover:bg-[#075E54] text-white px-8 sm:px-10 py-4 font-semibold text-[14px] sm:text-[15px] tracking-wide transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              {/* Official WhatsApp Vector Icon */}
              <WhatsAppIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>{buttonLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
