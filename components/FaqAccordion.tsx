'use client'

import React, { useState } from 'react'
import type { FAQ } from '@/types'
import { Plus, Minus, HelpCircle } from 'lucide-react'

interface FaqAccordionProps {
  faqs: FAQ[]
}

const CATEGORY_ORDER = ['ordering', 'payment', 'shipping', 'returns', 'products', 'general']

const CATEGORY_LABELS: Record<string, string> = {
  ordering: 'Ordering & Concierge',
  payment: 'Payment Options',
  shipping: 'Shipping & Delivery',
  returns: 'Returns & Exchanges',
  products: 'Products & Care',
  general: 'Custom & General',
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  // Store open FAQ IDs in a set or state array
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    faq_1722000000402: true, // Expand first ordering FAQ by default
  })

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Group FAQs by category
  const groupedFaqs = CATEGORY_ORDER.reduce<Record<string, FAQ[]>>((acc, cat) => {
    const items = faqs.filter((f) => f.category === cat)
    if (items.length > 0) {
      acc[cat] = items
    }
    return acc
  }, {})

  return (
    <div className="w-full space-y-16">
      {Object.entries(groupedFaqs).map(([catKey, categoryFaqs]) => (
        <section key={catKey} id={`faq-group-${catKey}`} className="space-y-6">
          {/* Category Section Title */}
          <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border-strong)]">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase">
              {CATEGORY_LABELS[catKey] || catKey}
            </span>
          </div>

          {/* Accordion Items in Group */}
          <div className="space-y-4">
            {categoryFaqs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id])

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-white border border-[var(--color-border)] transition-colors duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-[var(--color-surface)] transition-colors gap-4"
                  >
                    <span
                      className="font-heading text-[18px] sm:text-[20px] font-medium text-[var(--color-text)] leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {faq.question}
                    </span>

                    {/* + / – Toggle Indicator */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text)] transition-transform duration-200">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[var(--color-primary-dark)]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[var(--color-text-2)]" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content with pure CSS transition */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-[15px] sm:text-[16px] text-[var(--color-text-2)] leading-relaxed border-t border-[var(--color-border)]/50">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      {/* WhatsApp Assistance Banner at bottom */}
      <div className="p-8 sm:p-10 bg-[#1A1A2E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[var(--color-primary)] text-[12px] font-semibold tracking-wider uppercase mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Still Have Questions?</span>
          </div>
          <h3
            className="font-heading text-[22px] sm:text-[26px] font-semibold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Speak directly with our concierge
          </h3>
          <p className="text-[14px] text-white/70 mt-1 max-w-md">
            Our atelier specialists are available Monday to Saturday to answer sizing, leather
            care, and ordering queries.
          </p>
        </div>

        <a
          href="https://wa.me/911212121212?text=Hello%20Maison%20Elara,%20I%20have%20a%20question%20regarding%20your%20pieces."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] text-[#1A1A2E] text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#D4B55C] transition-colors whitespace-nowrap flex-shrink-0"
        >
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
