import React from 'react'
import type { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/data'
import ProductsCatalog from '@/components/ProductsCatalog'

export const metadata: Metadata = {
  title: 'All Bags — Handcrafted Leather Collection | Maison Elara',
  description:
    'Explore the complete Maison Elara luxury leather bag collection. Hand-stitched full-grain Italian leather totes, crossbodies, satchels, and evening clutches.',
}

export default function AllProductsPage() {
  const products = getProducts()
  const categories = getCategories()

  return (
    <div id="all-products-page" className="w-full bg-[var(--color-surface)] min-h-screen">
      {/* Page Header */}
      <div className="pt-16 pb-12 md:pt-20 md:pb-14 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3">
            THE ATELIER COLLECTION
          </span>
          <h1
            id="all-products-title"
            className="font-heading text-[38px] sm:text-[44px] md:text-[48px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            All Bags
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[var(--color-text-2)] leading-relaxed max-w-xl mx-auto">
            From structured daily companions to sculptural evening statements, each piece is
            handcrafted from vegetable-tanned Italian leather and finished with 24K gold-plated
            brass.
          </p>
        </div>
      </div>

      {/* Catalog with Sticky Filter Bar & Responsive Grid */}
      <ProductsCatalog initialProducts={products} categories={categories} />
    </div>
  )
}
