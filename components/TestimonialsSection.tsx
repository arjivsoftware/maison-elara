'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import type { Testimonial, Product } from '@/types'
import { resolveImageUrl } from '@/lib/utils'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  products: Product[]
}

export default function TestimonialsSection({
  testimonials,
  products,
}: TestimonialsSectionProps) {
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({})

  // Create lookup for product info by id
  const productMap = React.useMemo(() => {
    const map = new Map<string, Product>()
    products.forEach((p) => map.set(p.id, p))
    return map
  }, [products])

  // Duplicate for seamless infinite marquee on desktop
  const tickerItems = [...testimonials, ...testimonials]

  const renderCard = (t: Testimonial, index: number, isTicker = false) => {
    const purchasedProduct = t.productId ? productMap.get(t.productId) : undefined
    const avatarUrl = resolveImageUrl(t.avatar)
    const hasAvatarError = imgErrorMap[`${t.id}-${index}`]

    // Initials fallback
    const initials = t.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    return (
      <div
        key={`${t.id}-${index}`}
        id={`testimonial-card-${t.id}-${index}`}
        className={`bg-white border border-[var(--color-border)] p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-md ${
          isTicker ? 'w-[360px] sm:w-[400px] flex-shrink-0 mx-3.5' : 'w-full'
        }`}
      >
        {/* Top: Star Rating & Verified Pill */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            {/* 5-Star Row */}
            <div className="flex items-center gap-1 text-[var(--color-primary)] text-[15px] tracking-wider">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <span key={i} className="text-[#C9A84C]">
                  ★
                </span>
              ))}
            </div>

            {t.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1A1A2E] bg-[var(--color-surface-2)] px-2 py-0.5 border border-[var(--color-border)]">
                <CheckCircle2 className="w-3 h-3 text-[#128C7E]" />
                <span>Verified Buyer</span>
              </span>
            )}
          </div>

          {/* Quote Text in Italic Cormorant Garamond 16px */}
          <p
            className="font-heading italic text-[16px] text-[var(--color-text)] leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            &ldquo;{t.text}&rdquo;
          </p>
        </div>

        {/* Bottom: Avatar, Name, Location & Purchased Product Link */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            {/* Avatar Circle */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1A1A2E] text-[var(--color-primary)] font-semibold text-[13px] flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/30">
              {avatarUrl && !hasAvatarError ? (
                <Image
                  src={avatarUrl}
                  alt={t.name}
                  fill
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setImgErrorMap((prev) => ({ ...prev, [`${t.id}-${index}`]: true }))
                  }}
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[14px] sm:text-[15px] text-[var(--color-text)] truncate">
                {t.name}
              </h4>
              <p className="text-[12px] text-[var(--color-text-muted)] truncate">
                {t.location}
              </p>
            </div>
          </div>

          {/* Purchased Product Link */}
          {purchasedProduct && (
            <div className="mt-3 pt-2">
              <Link
                href={`/products/${purchasedProduct.slug}`}
                className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-primary-dark)] transition-colors inline-flex items-center gap-1 group truncate max-w-full"
              >
                <span>Purchased:</span>
                <span className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary-dark)] underline underline-offset-2 truncate">
                  {purchasedProduct.name}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section
      id="customer-testimonials-section"
      className="w-full bg-[var(--color-surface)] py-20 md:py-28 overflow-hidden border-t border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 text-center">
        <span
          id="testimonials-section-label"
          className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3"
        >
          LOVED BY WOMEN
        </span>
        <h2
          id="testimonials-section-heading"
          className="font-heading text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          What Our Customers Say
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[var(--color-text-2)] max-w-xl mx-auto leading-relaxed">
          Real stories and impressions from women who carry Maison Elara across India and beyond.
        </p>
      </div>

      {/* Desktop: Auto-scrolling Infinite Horizontal Ticker */}
      <div className="hidden md:block w-full overflow-hidden py-4">
        <div className="animate-marquee flex items-stretch">
          {tickerItems.map((t, idx) => renderCard(t, idx, true))}
        </div>
      </div>

      {/* Mobile: Stacked Cards Container */}
      <div className="md:hidden max-w-xl mx-auto px-4 space-y-6">
        {testimonials.map((t, idx) => renderCard(t, idx, false))}
      </div>
    </section>
  )
}
