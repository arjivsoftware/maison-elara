'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import { formatPrice, resolveImageUrl } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

const BADGE_STYLES: Record<string, string> = {
  new: 'bg-[#1A1A2E] text-white',
  bestseller: 'bg-[#C9A84C] text-[#1A1A2E]',
  sale: 'bg-[#8B1A3A] text-white',
  trending: 'bg-[#2D5A3D] text-white',
  exclusive: 'bg-[#4A1A6B] text-white',
  limited: 'bg-[#7A3A1A] text-white',
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null

  // Generate a distinct rich gradient based on product id and attributes
  const gradientHash = (product.id.charCodeAt(product.id.length - 1) || 0) % 4
  const placeholderGradients = [
    'linear-gradient(135deg, #1A1A2E 0%, #2A2438 50%, #151322 100%)',
    'linear-gradient(135deg, #1C2321 0%, #243530 50%, #111B18 100%)',
    'linear-gradient(135deg, #261A22 0%, #3B2032 50%, #170E15 100%)',
    'linear-gradient(135deg, #2A231C 0%, #3D3124 50%, #1A150F 100%)',
  ]
  const bgGradient = placeholderGradients[gradientHash]

  const firstImage = product.images?.[0]?.url || product.thumbnail
  const imageAlt = product.images?.[0]?.alt || product.name

  const badgeKey = (product.badge || '').toLowerCase().trim()
  const badgeClass = BADGE_STYLES[badgeKey] || 'bg-[#1A1A2E] text-[#FAF8F5]'

  return (
    <Link
      id={`product-card-${product.slug}`}
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-white border border-[var(--color-border)] p-3 sm:p-3.5 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-sm"
    >
      {/* 1:1 Square Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#1A1A2E]">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: bgGradient }}
        >
          {firstImage && !imgError && (
            <Image
              src={resolveImageUrl(firstImage)}
              alt={imageAlt}
              fill
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          )}

          {/* Micro atelier watermark for placeholder */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* Badge Pill Top-Left */}
        {product.badge && product.badge.trim() !== '' && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 shadow-sm ${badgeClass}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#1A1A2E]/80 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 px-3 py-1.5 border border-white/30 bg-black/40">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Info Section */}
      <div className="flex flex-col pt-3.5 pb-1 flex-grow justify-between">
        <div>
          <h3
            className="font-heading text-[18px] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary-dark)] transition-colors line-clamp-1 leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.name}
          </h3>

          {product.shortDescription && (
            <p className="text-[13px] text-[var(--color-text-muted)] line-clamp-1 mt-1 leading-normal">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-2 pt-2.5 flex-wrap">
          <span className="font-semibold text-[15px] text-[var(--color-primary-dark)]">
            {formatPrice(product.price)}
          </span>

          {product.mrp && product.mrp > product.price && (
            <span className="text-[13px] line-through text-[var(--color-text-muted)] font-normal">
              {formatPrice(product.mrp)}
            </span>
          )}

          {discountPercent !== null && discountPercent > 0 && (
            <span className="text-[11px] font-semibold text-[var(--color-accent)] uppercase tracking-wider ml-auto">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Thin Gold Line at Card Bottom on Hover */}
      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  )
}
