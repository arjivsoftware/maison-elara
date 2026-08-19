'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import { ChevronDown, ArrowLeft } from 'lucide-react'

interface CategoryProductsViewProps {
  products: Product[]
  categoryName: string
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'

export default function CategoryProductsView({
  products,
  categoryName,
}: CategoryProductsViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const list = [...products]
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        list.sort((a, b) => {
          if (a.badge === 'new' && b.badge !== 'new') return -1
          if (b.badge === 'new' && a.badge !== 'new') return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        break
      case 'featured':
      default:
        list.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.sortOrder - b.sortOrder
        })
        break
    }
    return list
  }, [products, sortBy])

  return (
    <div className="w-full">
      {/* Sticky Bar for Category Page */}
      <div
        id="category-filter-bar"
        className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-y border-[var(--color-border)] py-4 transition-shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <span
            id="category-products-count"
            className="text-[13px] text-[var(--color-text-muted)] font-medium"
          >
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'bag' : 'bags'} in{' '}
            <span className="text-[var(--color-text)] font-semibold">{categoryName}</span>
          </span>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <label htmlFor="category-sort-select" className="sr-only">
              Sort by
            </label>
            <div className="relative">
              <select
                id="category-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[12px] font-semibold tracking-wider uppercase text-[var(--color-text)] pl-3 pr-8 py-2 focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-2)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {sortedProducts.length > 0 ? (
          <div
            id="category-products-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-[var(--color-border)] max-w-lg mx-auto p-8">
            <h3
              className="font-heading text-[22px] font-semibold text-[var(--color-text)] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              No bags in this category yet
            </h3>
            <p className="text-[14px] text-[var(--color-text-muted)] mb-6">
              Our artisans are crafting new pieces for this collection.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1A2E] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-[#1A1A2E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse All Bags</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
