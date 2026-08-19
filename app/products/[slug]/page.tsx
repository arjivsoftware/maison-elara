import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getProducts,
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
  getSettings,
} from '@/lib/data'
import ProductDetailView from '@/components/ProductDetailView'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const products = getProducts()
  return products.map((prod) => ({
    slug: prod.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Maison Elara',
    }
  }

  return {
    title: product.seo?.metaTitle || `${product.name} — Maison Elara`,
    description:
      product.seo?.metaDescription ||
      product.shortDescription ||
      `Discover ${product.name} handcrafted in full-grain Italian leather from Maison Elara.`,
    keywords: product.seo?.keywords,
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const category = getCategoryBySlug(product.category)
  const allCategoryProducts = getProductsByCategory(product.category)
  const relatedProducts = allCategoryProducts.filter((p) => p.id !== product.id)
  const settings = getSettings()

  return (
    <div id={`product-page-${product.slug}`} className="w-full bg-[var(--color-surface)] min-h-screen">
      <ProductDetailView
        product={product}
        category={category}
        relatedProducts={relatedProducts}
        settings={settings}
      />
    </div>
  )
}
