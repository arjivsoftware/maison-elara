'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '@/types'
import { resolveImageUrl } from '@/lib/utils'

interface ShopByCategoryProps {
  categories: Category[]
}

export default function ShopByCategory({ categories }: ShopByCategoryProps) {
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({})

  // Filter featured categories or fallback to all top categories
  const featuredCategories = categories
    .filter(c => c.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const displayList = featuredCategories.length > 0
    ? featuredCategories
    : categories.slice(0, 5)

  const primaryTwo = displayList.slice(0, 2)
  const remaining = displayList.slice(2)

  const getGradient = (accentColor?: string) => {
    const accent = accentColor || '#C9A84C'
    return `linear-gradient(145deg, ${accent}33 0%, #1A1A2E 55%, #0B0B14 100%)`
  }

  return (
    <section
      id="shop-by-category-section"
      className="w-full bg-[var(--color-surface)] py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span
            id="category-section-label"
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3"
          >
            DISCOVER
          </span>
          <h2
            id="category-section-heading"
            className="font-heading text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Shop by Category
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[var(--color-text-2)] max-w-xl mx-auto leading-relaxed">
            From structured totes to sculptural evening pieces — find your signature style.
          </p>
        </div>

        {/* Primary Row: 2 Large Portrait Cards (3:4 Aspect Ratio) */}
        {primaryTwo.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            {primaryTwo.map((cat) => {
              const hasImgError = imgErrorMap[cat.id]
              const bgGradient = getGradient(cat.accentColor)

              return (
                <Link
                  key={cat.id}
                  id={`category-card-${cat.slug}`}
                  href={`/category/${cat.slug}`}
                  className="group relative block w-full aspect-[3/4] overflow-hidden bg-[#1A1A2E] border border-transparent hover:border-[var(--color-primary)] transition-all duration-500 shadow-sm"
                >
                  {/* Background Image / Rich Accent Gradient Placeholder */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ background: bgGradient }}
                  >
                    {!hasImgError && resolveImageUrl(cat.image) && (
                      <Image
                        src={resolveImageUrl(cat.image)}
                        alt={cat.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setImgErrorMap((prev) => ({ ...prev, [cat.id]: true }))
                        }}
                      />
                    )}


                    {/* Subtle Radial Glow from Accent */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${cat.accentColor || '#C9A84C'}44 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Gradient Overlay from Bottom for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

                  {/* Card Content Overlaid at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between z-10">
                    <div className="space-y-1.5 max-w-[80%]">
                      <h3
                        className="font-heading text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-white tracking-wide leading-tight group-hover:text-[var(--color-primary-light)] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-[13px] text-white/75 line-clamp-2 leading-relaxed font-light">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-[#1A1A2E] transition-all duration-300 flex-shrink-0 ml-4">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Secondary Row: Remaining Landscape Cards (4:3 Aspect Ratio) */}
        {remaining.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remaining.map((cat) => {
              const hasImgError = imgErrorMap[cat.id]
              const bgGradient = getGradient(cat.accentColor)

              return (
                <Link
                  key={cat.id}
                  id={`category-card-${cat.slug}`}
                  href={`/category/${cat.slug}`}
                  className="group relative block w-full aspect-[4/3] overflow-hidden bg-[#1A1A2E] border border-transparent hover:border-[var(--color-primary)] transition-all duration-500 shadow-sm"
                >
                  {/* Background Image / Rich Accent Gradient Placeholder */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ background: bgGradient }}
                  >
                    {!hasImgError && resolveImageUrl(cat.image) && (
                      <Image
                        src={resolveImageUrl(cat.image)}
                        alt={cat.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setImgErrorMap((prev) => ({ ...prev, [cat.id]: true }))
                        }}
                      />
                    )}


                    {/* Subtle Accent Glow */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
                      style={{
                        background: `radial-gradient(circle at 40% 40%, ${cat.accentColor || '#C9A84C'}33 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Gradient Overlay from Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

                  {/* Card Content Overlaid at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between z-10">
                    <div className="space-y-1 max-w-[80%]">
                      <h3
                        className="font-heading text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-white tracking-wide leading-tight group-hover:text-[var(--color-primary-light)] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-[12px] text-white/70 line-clamp-1 font-light">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-[#1A1A2E] transition-all duration-300 flex-shrink-0 ml-3">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
