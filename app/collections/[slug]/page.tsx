import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCollections, getCollectionBySlug, getProductsByCollection } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface CollectionPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const collections = getCollections()
  return collections.map((col) => ({
    slug: col.slug,
  }))
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found | Maison Elara',
    }
  }

  return {
    title: `${collection.name} — Luxury Leather Edit | Maison Elara`,
    description:
      collection.description ||
      `Explore ${collection.name}, an artisan-crafted series of luxury leather handbags from Maison Elara.`,
  }
}

export default async function SingleCollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = getProductsByCollection(collection.id)

  return (
    <div id={`collection-page-${collection.slug}`} className="w-full bg-[var(--color-surface)] min-h-screen">
      {/* Editorial Hero Header */}
      <div className="pt-8 pb-14 md:pt-10 md:pb-20 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb: Home → Collections → [collection.name] */}
          <nav
            aria-label="Breadcrumb"
            id="collection-breadcrumb"
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
              href="/collections"
              className="hover:text-[var(--color-primary-dark)] transition-colors"
            >
              Collections
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <span className="text-[var(--color-text)] font-medium">
              {collection.name}
            </span>
          </nav>

          {/* Collection Name & Quote Description */}
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3">
              THE COLLECTION
            </span>
            <h1
              id="collection-title"
              className="font-heading text-[38px] sm:text-[44px] md:text-[50px] font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {collection.name}
            </h1>

            {collection.description && (
              <blockquote
                id="collection-quote-description"
                className="font-heading italic text-[20px] sm:text-[24px] text-[var(--color-text-2)] leading-relaxed border-l-2 border-[var(--color-primary)] pl-5 py-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                &ldquo;{collection.description}&rdquo;
              </blockquote>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-border)]">
          <span className="text-[13px] text-[var(--color-text-muted)] font-medium">
            Showing {products.length} {products.length === 1 ? 'bag' : 'bags'} in this collection
          </span>

          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--color-text-2)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>
        </div>

        {products.length > 0 ? (
          <div
            id="collection-products-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[var(--color-border)] max-w-lg mx-auto p-8">
            <h3
              className="font-heading text-[22px] font-semibold text-[var(--color-text)] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Curating pieces
            </h3>
            <p className="text-[14px] text-[var(--color-text-muted)] mb-6">
              New atelier bags are being assigned to this collection.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1A2E] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-[#1A1A2E] transition-colors"
            >
              Browse All Bags
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
