'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Collection } from '@/types'
import { resolveImageUrl } from '@/lib/utils'

interface FeaturedCollectionsProps {
  collections: Collection[]
}

const COLLECTION_GRADIENTS = [
  'linear-gradient(145deg, #241D2B 0%, #1A1A2E 50%, #0F0E17 100%)',
  'linear-gradient(145deg, #1C2422 0%, #17211E 50%, #0D1412 100%)',
  'linear-gradient(145deg, #2B1C22 0%, #201319 50%, #140A0F 100%)',
  'linear-gradient(145deg, #2B2317 0%, #221B12 50%, #140F0A 100%)',
]

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({})

  const featuredList = collections.filter((c) => c.featured)
  const displayCollections = featuredList.length > 0 ? featuredList : collections.slice(0, 3)

  return (
    <section
      id="featured-collections-section"
      className="w-full bg-[var(--color-surface-2)] py-20 md:py-28 border-t border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span
            id="collections-section-label"
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3"
          >
            CURATED
          </span>
          <h2
            id="collections-section-heading"
            className="font-heading text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Collections
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[var(--color-text-2)] leading-relaxed">
            Cohesive edits envisioned around particular moods, occasions, and artisan techniques.
          </p>
        </div>

        {/* Horizontal Scroll on Mobile / 3-Column Grid on Desktop */}
        <div
          id="collections-cards-container"
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:pb-0 md:grid md:grid-cols-3 lg:gap-8 scrollbar-none"
        >
          {displayCollections.map((col, idx) => {
            const hasImgError = imgErrorMap[col.id]
            const bgGradient = COLLECTION_GRADIENTS[idx % COLLECTION_GRADIENTS.length]

            return (
              <div
                key={col.id}
                className="w-[85vw] sm:w-[60vw] md:w-auto flex-shrink-0 snap-center"
              >
                <Link
                  id={`collection-card-${col.slug}`}
                  href={`/collections/${col.slug}`}
                  className="group relative block w-full aspect-[4/3] overflow-hidden bg-[#1A1A2E] border border-transparent hover:border-[var(--color-primary)] transition-all duration-500 shadow-sm"
                >
                  {/* Background Image / Rich Placeholder */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ background: bgGradient }}
                  >
                    {!hasImgError && resolveImageUrl(col.image) && (
                      <Image
                        src={resolveImageUrl(col.image)}
                        alt={col.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw, 33vw"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setImgErrorMap((prev) => ({ ...prev, [col.id]: true }))
                        }}
                      />
                    )}

                    {/* Radial Atmosphere */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300" />
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end z-10">
                    <h3
                      className="font-heading text-[22px] sm:text-[24px] font-semibold text-white tracking-wide leading-tight group-hover:text-[var(--color-primary-light)] transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {col.name}
                    </h3>

                    {col.description && (
                      <p className="text-[13px] sm:text-[14px] text-white/80 line-clamp-2 mt-1.5 font-light leading-relaxed">
                        {col.description}
                      </p>
                    )}

                    <div className="pt-3">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-light)] group-hover:text-white inline-flex items-center gap-1.5 transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
