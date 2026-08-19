import fs from 'fs'
import path from 'path'
import type { Product, Category, Collection, Banner, Testimonial, FAQ, CMSPage, SiteSettings, GlobalSEO } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')

function readJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

export function getProducts(): Product[] {
  return readJson<Product[]>('products.json').sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getCategories(): Category[] {
  return readJson<Category[]>('categories.json').sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getCollections(): Collection[] {
  return readJson<Collection[]>('collections.json').sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getBanners(): Banner[] {
  const now = new Date()
  return readJson<Banner[]>('banners.json')
    .filter(b => b.active)
    .filter(b => !b.showFrom || new Date(b.showFrom) <= now)
    .filter(b => !b.showUntil || new Date(b.showUntil) >= now)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getTestimonials(): Testimonial[] {
  return readJson<Testimonial[]>('testimonials.json').sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getFAQs(): FAQ[] {
  return readJson<FAQ[]>('faqs.json').sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getPages(): CMSPage[] {
  return readJson<CMSPage[]>('pages.json')
}

export function getSettings(): SiteSettings {
  return readJson<SiteSettings>('settings.json')
}

export function getSEO(): GlobalSEO {
  return readJson<GlobalSEO>('seo.json')
}

export function getPageBySlug(slug: string): CMSPage | undefined {
  return getPages().find(p => p.slug === slug)
}

export function getProductBySlug(slug: string): Product | undefined {

  return getProducts().find(p => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find(c => c.slug === slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return getCollections().find(c => c.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {

  return getProducts().filter(p => p.category === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter(p => p.featured)
}

export function getProductsByCollection(collectionId: string): Product[] {
  const collection = getCollections().find(c => c.id === collectionId)
  if (!collection) return []
  const products = getProducts()
  return collection.productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p))
}
