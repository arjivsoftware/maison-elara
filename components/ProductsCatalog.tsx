'use client'

import React, { useState, useMemo } from 'react'
import type { Product, Category } from '@/types'
import ProductCard from '@/components/ProductCard'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

interface ProductsCatalogProps {
  initialProducts: Product[]
  categories: Category[]
  initialCategorySlug?: string
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'

export default function ProductsCatalog({
  initialProducts,
  categories,
  initialCategorySlug = 'all',
}: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug)
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  // Filter categories to only those shown in nav
  const filterCategories = useMemo(() => {
    const navCats = categories.filter((c) => c.showInNav)
    return navCats.length > 0 ? navCats : categories
  }, [categories])


  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts]

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    // Sorting
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
  }, [initialProducts, selectedCategory, sortBy])

  return (
    <div className="w-full">
      {/* Sticky Filter Bar */}
      <div
        id="products-filter-bar"
        className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-y border-[var(--color-border)] py-4 transition-shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              id="filter-category-all"
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1A1A2E] text-white shadow-sm'
                  : 'bg-[var(--color-surface-2)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
              }`}
            >
              All
            </button>

            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-category-${cat.slug}`}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-[#1A1A2E] text-white shadow-sm'
                    : 'bg-[var(--color-surface-2)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Side: Count & Sort Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-6 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--color-border)]">
            <span
              id="products-count"
              className="text-[13px] text-[var(--color-text-muted)] font-medium"
            >
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'bag' : 'bags'}
            </span>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <label htmlFor="products-sort-select" className="sr-only">
                Sort by
              </label>
              <div className="relative">
                <select
                  id="products-sort-select"
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
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {filteredProducts.length > 0 ? (
          <div
            id="all-products-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-[var(--color-border)] max-w-lg mx-auto p-8">
            <SlidersHorizontal className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-4" />
            <h3
              className="font-heading text-[22px] font-semibold text-[var(--color-text)] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              No bags found
            </h3>
            <p className="text-[14px] text-[var(--color-text-muted)] mb-6">
              There are currently no items available in this category.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-2.5 bg-[#1A1A2E] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-[#1A1A2E] transition-colors"
            >
              View All Bags
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
