import React from 'react'
import type { Metadata } from 'next'
import { getFAQs } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Atelier Services | Maison Elara',
  description:
    'Find answers to common questions about ordering, payments, complimentary insured shipping, leather care, warranty, and bespoke customisation at Maison Elara.',
}

export default function FaqPage() {
  const faqs = getFAQs()

  return (
    <div id="faq-page" className="w-full bg-[var(--color-surface)] min-h-screen">
      {/* Header */}
      <div className="pt-16 pb-12 md:pt-20 md:pb-16 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3">
            ATELIER ASSISTANCE
          </span>
          <h1
            id="faq-heading"
            className="font-heading text-[38px] sm:text-[44px] md:text-[48px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[var(--color-text-2)] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our handcrafted leather collections, ordering via
            WhatsApp, bespoke monograms, and care guidelines.
          </p>
        </div>
      </div>

      {/* Accordion List Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  )
}
