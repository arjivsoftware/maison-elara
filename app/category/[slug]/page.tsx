import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/data'
import CategoryProductsView from '@/components/CategoryProductsView'
import { ChevronRight } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) {
    return {
      title: 'Category Not Found | Maison Elara',
    }
  }

  return {
    title: category.seo?.metaTitle || `${category.name} — Luxury Handbags | Maison Elara`,
    description:
      category.seo?.metaDescription ||
      category.description ||
      `Explore handcrafted ${category.name.toLowerCase()} in fine Italian leather from Maison Elara.`,
    keywords: category.seo?.keywords,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(slug)

  return (
    <div id={`category-page-${category.slug}`} className="w-full bg-[var(--color-surface)] min-h-screen">
      {/* Category Hero & Breadcrumb */}
      <div className="pt-8 pb-12 md:pt-10 md:pb-16 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb at top: Home → [category.name] */}
          <nav
            aria-label="Breadcrumb"
            id="category-breadcrumb"
            className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)] mb-8"
          >
            <Link
              href="/"
              className="hover:text-[var(--color-primary-dark)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <Link
              href="/products"
              className="hover:text-[var(--color-primary-dark)] transition-colors"
            >
              All Bags
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <span className="text-[var(--color-text)] font-medium">
              {category.name}
            </span>
          </nav>

          {/* Category Header Info */}
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3">
              CATEGORY
            </span>
            <h1
              id="category-heading"
              className="font-heading text-[38px] sm:text-[44px] md:text-[48px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {category.name}
            </h1>
            {category.description && (
              <p className="text-[17px] sm:text-[18px] text-[var(--color-text-2)] font-light leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product List with Sticky Sort Bar */}
      <CategoryProductsView products={products} categoryName={category.name} />
    </div>
  )
}
