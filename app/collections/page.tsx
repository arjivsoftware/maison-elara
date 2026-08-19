import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getCollections } from '@/lib/data'
import { resolveImageUrl } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Collections — Handcrafted Series | Maison Elara',
  description:
    'Each collection tells a story. Discover our Signature series, Everyday Luxury, The Evening Edit, and bespoke Atelier editions.',
}

export default function CollectionsPage() {
  const collections = getCollections()

  return (
    <div id="collections-page" className="w-full bg-[var(--color-surface)] min-h-screen">
      {/* Editorial Header */}
      <div className="pt-16 pb-14 md:pt-24 md:pb-20 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3">
            CURATED EDITIONS
          </span>
          <h1
            id="collections-heading"
            className="font-heading text-[38px] sm:text-[44px] md:text-[48px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Collections
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[var(--color-text-2)] font-light leading-relaxed max-w-xl mx-auto">
            Each collection tells a story. Find the one that tells yours.
          </p>
        </div>
      </div>

      {/* Editorial Collection Cards Grid (50% on desktop, full-width on mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {collections.map((collection, index) => {
            const imgUrl = resolveImageUrl(collection.image)
            const count = collection.productIds?.length || 0

            return (
              <Link
                key={collection.id}
                id={`collection-card-${collection.slug}`}
                href={`/collections/${collection.slug}`}
                className="group relative flex flex-col bg-white border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--color-primary)]/50 cursor-pointer"
              >
                {/* Tall Image Stage with Gradient & Placeholder */}
                <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1A1A2E] overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={collection.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#2D1B4E] via-[#1A1A2E] to-[#120F1D]">
                      <div className="w-14 h-14 rounded-full border border-[var(--color-primary)]/40 flex items-center justify-center text-[var(--color-primary)] mb-4">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="font-heading text-[28px] text-white tracking-wide">
                        {collection.name}
                      </span>
                    </div>
                  )}

                  {/* Dark Gradient Overlay for text readability & atmosphere */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Edition Tag */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#1A1A2E] text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 shadow-sm">
                      Edition {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Overlay Meta at bottom of image */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                    <span className="text-[12px] font-medium tracking-wider text-[var(--color-primary)] uppercase">
                      {count} {count === 1 ? 'Handcrafted Bag' : 'Handcrafted Bags'}
                    </span>
                    <h2
                      className="font-heading text-[28px] sm:text-[32px] font-semibold text-white tracking-tight mt-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {collection.name}
                    </h2>
                  </div>
                </div>

                {/* Card Editorial Description & Action */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-white">
                  <p className="text-[14px] sm:text-[15px] text-[var(--color-text-2)] leading-relaxed mb-6 font-light">
                    {collection.description}
                  </p>

                  <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[12px] font-semibold tracking-[0.14em] uppercase text-[#1A1A2E] group-hover:text-[var(--color-primary-dark)] transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
