import React from 'react'
import HeroSlider from '@/components/HeroSlider'
import ShopByCategory from '@/components/ShopByCategory'
import NewArrivals from '@/components/NewArrivals'
import UspStrip from '@/components/UspStrip'
import FeaturedCollections from '@/components/FeaturedCollections'
import TestimonialsSection from '@/components/TestimonialsSection'
import WhatsAppCtaBanner from '@/components/WhatsAppCtaBanner'
import {
  getBanners,
  getCategories,
  getFeaturedProducts,
  getCollections,
  getSettings,
  getTestimonials,
  getProducts,
} from '@/lib/data'

export default function HomePage() {
  const banners = getBanners()
  const categories = getCategories()
  const featuredProducts = getFeaturedProducts()
  const collections = getCollections()
  const settings = getSettings()
  const testimonials = getTestimonials()
  const allProducts = getProducts()

  return (
    <div id="homepage-container" className="w-full">
      {/* 1. Hero Banner Slider Section */}
      <HeroSlider banners={banners} />

      {/* 2. Shop by Category Section */}
      <ShopByCategory categories={categories} />

      {/* 3. New Arrivals Featured Products Grid */}
      <NewArrivals products={featuredProducts} settings={settings} />

      {/* 4. USP Strip (Unique Selling Points) */}
      <UspStrip />

      {/* 5. The Collections Section */}
      <FeaturedCollections collections={collections} />

      {/* 6. Customer Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} products={allProducts} />

      {/* 7. Personal WhatsApp CTA Banner */}
      <WhatsAppCtaBanner settings={settings} />
    </div>
  )
}



