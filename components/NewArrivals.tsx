import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product, SiteSettings } from '@/types'
import ProductCard from '@/components/ProductCard'

interface NewArrivalsProps {
  products: Product[]
  settings?: SiteSettings
}

export default function NewArrivals({ products, settings }: NewArrivalsProps) {
  const subtitle =
    settings?.business?.tagline
      ? `${settings.business.tagline} — explore our latest handcrafted silhouettes crafted with Italian leather and bespoke hardware.`
      : 'Explore our latest handcrafted silhouettes shaped with Italian leather and bespoke hardware.'

  return (
    <section
      id="new-arrivals-section"
      className="w-full bg-white py-20 md:py-28 border-t border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6">
          <div className="max-w-2xl">
            <span
              id="new-arrivals-label"
              className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3"
            >
              HANDPICKED
            </span>
            <h2
              id="new-arrivals-heading"
              className="font-heading text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              New Arrivals
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[var(--color-text-2)] leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="hidden md:block flex-shrink-0">
            <Link
              id="new-arrivals-view-all-desktop"
              href="/products"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:text-[var(--color-primary-dark)] transition-colors pb-1 border-b border-transparent hover:border-[var(--color-primary-dark)]"
            >
              <span>View All Collection</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 4-Column / 2-Column / 1-Column Responsive Grid */}
        <div
          id="new-arrivals-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom "View All" on Mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            id="new-arrivals-view-all-mobile"
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--color-border-strong)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:bg-[var(--color-surface-2)] transition-colors w-full"
          >
            <span>View All Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
