'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/SocialIcons'
import type { Product, Category, SiteSettings } from '@/types'
import { formatPrice, resolveImageUrl, buildWhatsAppUrl } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'

interface ProductDetailViewProps {
  product: Product
  category?: Category
  relatedProducts: Product[]
  settings: SiteSettings
}

export default function ProductDetailView({
  product,
  category,
  relatedProducts,
  settings,
}: ProductDetailViewProps) {
  // Sort images by sortOrder
  const sortedImages = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return [{ url: product.thumbnail || '', alt: product.name, sortOrder: 0 }]
    }
    return [...product.images].sort((a, b) => a.sortOrder - b.sortOrder)
  }, [product])

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})
  const [activeTab, setActiveTab] = useState<'details' | 'attributes' | 'care'>('details')
  const [copiedLink, setCopiedLink] = useState(false)

  // Track variant selections
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    if (product.variants) {
      product.variants.forEach((v) => {
        const firstAvailable = v.options.find((o) => o.available) || v.options[0]
        if (firstAvailable) {
          defaults[v.id] = firstAvailable.value
        }
      })
    }
    return defaults
  })

  // Discount calculation
  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0

  // WhatsApp Concierge Link
  const whatsappUrl = useMemo(() => {
    const waNumber =
      settings.whatsapp?.primaryNumber || settings.contact?.whatsapp || '+911212121212'

    // Form variant summary if any
    const variantDetails = Object.entries(selectedVariants)
      .map(([vId, val]) => {
        const variant = product.variants?.find((v) => v.id === vId)
        return variant ? `${variant.label}: ${val}` : val
      })
      .join(', ')

    let customMsg =
      product.redirect?.customMessage ||
      settings.whatsapp?.productMessage ||
      'Hello Maison Elara, I am interested in the *{productName}*. Could you please assist me with availability and order details?'

    customMsg = customMsg
      .replace(/{productName}/g, product.name)
      .replace(/{product_name}/g, product.name)
      .replace(/{product_sku}/g, product.sku || '')

    if (variantDetails) {
      customMsg += `\nSelected Options: [${variantDetails}]`
    }

    return buildWhatsAppUrl(waNumber, customMsg)
  }, [product, selectedVariants, settings])

  // Share Link
  const shareWhatsAppUrl = useMemo(() => {
    const waNumber =
      settings.whatsapp?.primaryNumber || settings.contact?.whatsapp || '+911212121212'
    const shareTemplate =
      settings.whatsapp?.shareTemplate ||
      'Take a look at this handcrafted leather piece from Maison Elara: {product_url}'

    // 3. Use isMounted instead of typeof window
    const productUrl =
      isMounted
        ? window.location.href
        : `https://maisonelara.com/products/${product.slug}`

    const shareMsg = shareTemplate.replace(/{product_url}/g, productUrl)
    return buildWhatsAppUrl(waNumber, shareMsg)
  }, [product, settings, isMounted]) // 4. Add isMounted to dependency array

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  // Active Image
  const activeImage = sortedImages[activeImageIndex] || sortedImages[0]
  const isCurrentImgError = imgErrors[activeImageIndex]
  const currentImgUrl = activeImage ? resolveImageUrl(activeImage.url) : ''

  // Badge pill styling
  const badgeConfig: Record<string, { label: string; bg: string; text: string }> = {
    new: { label: 'New Arrival', bg: '#1A1A2E', text: '#FFFFFF' },
    bestseller: { label: 'Bestseller', bg: '#C9A84C', text: '#1A1A2E' },
    sale: { label: 'Special Edition', bg: '#8B1A3A', text: '#FFFFFF' },
    trending: { label: 'Trending', bg: '#2D5A3D', text: '#FFFFFF' },
    exclusive: { label: 'Atelier Exclusive', bg: '#4A1A6B', text: '#FFFFFF' },
    limited: { label: 'Limited Edition', bg: '#7A3A1A', text: '#FFFFFF' },
  }
  const badgeInfo = product.badge ? badgeConfig[product.badge] : null

  return (
    <div className="w-full">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)] flex-wrap"
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
            {category && (
              <>
                <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
                <Link
                  href={`/category/${category.slug}`}
                  className="hover:text-[var(--color-primary-dark)] transition-colors"
                >
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <span className="text-[var(--color-text)] font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Two-Column Hero (50/50 Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT COLUMN: Image Gallery */}
          <div className="w-full flex flex-col gap-4">
            {/* Main Image Stage */}
            <div
              id="main-product-image-container"
              className="relative w-full aspect-square bg-[#1A1A2E] overflow-hidden border border-[var(--color-border)] shadow-sm"
            >
              {/* Badge Pill on Main Image */}
              {badgeInfo && (
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className="px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase shadow-sm inline-block"
                    style={{
                      backgroundColor: badgeInfo.bg,
                      color: badgeInfo.text,
                    }}
                  >
                    {badgeInfo.label}
                  </span>
                </div>
              )}

              {/* Stock Watermark if Out of Stock */}
              {!product.inStock && (
                <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-white text-[#1A1A2E] text-[13px] font-semibold uppercase tracking-[0.2em] shadow-md">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Main Image or Rich Placeholder Gradient */}
              {currentImgUrl && !isCurrentImgError ? (
                <Image
                  src={currentImgUrl}
                  alt={activeImage.alt || product.name}
                  fill
                  priority
                  className="object-cover object-center transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setImgErrors((prev) => ({ ...prev, [activeImageIndex]: true }))
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#241D2B] via-[#1A1A2E] to-[#0F0E17]">
                  <div className="w-16 h-16 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)] mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3
                    className="font-heading text-[26px] font-medium text-white max-w-sm"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[12px] text-white/50 tracking-widest uppercase mt-2">
                    Maison Elara Atelier
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Strip (Sorted by sortOrder) */}
            {sortedImages.length > 1 && (
              <div
                id="product-thumbnails-strip"
                className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none"
              >
                {sortedImages.map((img, idx) => {
                  const isActive = idx === activeImageIndex
                  const isThumbErr = imgErrors[idx]
                  const thumbUrl = resolveImageUrl(img.url)

                  return (
                    <button
                      key={idx}
                      id={`thumbnail-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 aspect-square overflow-hidden bg-[#1A1A2E] border transition-all duration-200 cursor-pointer ${isActive
                        ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40 ring-offset-2'
                        : 'border-[var(--color-border)] hover:border-[var(--color-text-2)] opacity-80 hover:opacity-100'
                        }`}
                    >
                      {thumbUrl && !isThumbErr ? (
                        <Image
                          src={thumbUrl}
                          alt={img.alt || `${product.name} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover object-center"
                          sizes="80px"
                          referrerPolicy="no-referrer"
                          onError={() => {
                            setImgErrors((prev) => ({ ...prev, [idx]: true }))
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-white/70 font-semibold uppercase bg-[#1A1A2E]">
                          View {idx + 1}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info & Actions */}
          <div className="w-full flex flex-col">
            {/* Category Subtitle Tag */}
            {category && (
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-2">
                {category.name}
              </span>
            )}

            {/* Product Name (Cormorant Garamond 40px, #1A1A2E) */}
            <h1
              id="product-title"
              className="font-heading text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-[#1A1A2E] tracking-tight leading-tight mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </h1>

            {/* Short description in 16px italic Cormorant Garamond */}
            {product.shortDescription && (
              <p
                id="product-short-desc"
                className="font-heading italic text-[16px] sm:text-[17px] text-[var(--color-text-2)] leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                &ldquo;{product.shortDescription}&rdquo;
              </p>
            )}

            {/* Divider */}
            <div className="w-full h-[1px] bg-[var(--color-border)] mb-6" />

            {/* PRICE ROW */}
            {settings.store?.showPrices !== false && (
              <div id="product-price-section" className="mb-6">
                <div className="flex items-baseline gap-4 flex-wrap">
                  {/* Selling price */}
                  <span
                    id="product-selling-price"
                    className="font-heading text-[30px] sm:text-[34px] font-bold text-[#C9A84C] tracking-tight"
                  >
                    {formatPrice(product.price, product.currency)}
                  </span>

                  {/* MRP strikethrough if mrp > price */}
                  {product.mrp && product.mrp > product.price && (
                    <span
                      id="product-mrp-price"
                      className="text-[18px] sm:text-[20px] text-[var(--color-text-muted)] line-through font-normal"
                    >
                      {formatPrice(product.mrp, product.currency)}
                    </span>
                  )}

                  {/* Discount percentage badge in bordeaux */}
                  {discountPercent > 0 && (
                    <span
                      id="product-discount-badge"
                      className="bg-[#8B1A3A] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1"
                    >
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[var(--color-text-muted)] mt-1">
                  Inclusive of all taxes & complimentary insured delivery
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="w-full h-[1px] bg-[var(--color-border)] mb-6" />

            {/* VARIANTS SECTION */}
            {product.variants && product.variants.length > 0 && (
              <div id="product-variants-section" className="space-y-6 mb-6">
                {product.variants.map((variant) => {
                  const currentSelected = selectedVariants[variant.id]

                  return (
                    <div key={variant.id} id={`variant-group-${variant.id}`}>
                      {/* Label in uppercase 11px letter-spaced text */}
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-text)]">
                          {variant.label}:{' '}
                          <span className="font-normal text-[var(--color-text-2)] normal-case text-[13px]">
                            {currentSelected || 'Select an option'}
                          </span>
                        </label>
                      </div>

                      {/* Display As Swatches (36px circles with colorHex) */}
                      {variant.displayAs === 'swatches' && (
                        <div className="flex items-center gap-3 flex-wrap">
                          {variant.options.map((opt) => {
                            const isSelected = currentSelected === opt.value
                            const isAvailable = opt.available

                            return (
                              <button
                                key={opt.value}
                                type="button"
                                title={`${opt.value} ${!isAvailable ? '(Unavailable)' : ''}`}
                                disabled={!isAvailable}
                                onClick={() =>
                                  setSelectedVariants((prev) => ({
                                    ...prev,
                                    [variant.id]: opt.value,
                                  }))
                                }
                                className={`relative w-9 h-9 rounded-full transition-all duration-200 cursor-pointer ${isSelected
                                  ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-white scale-110'
                                  : 'hover:scale-105 opacity-90'
                                  } ${!isAvailable ? 'opacity-40 cursor-not-allowed' : ''}`}
                                style={{
                                  backgroundColor: opt.colorHex || '#1A1A2E',
                                  border: '1px solid rgba(0,0,0,0.15)',
                                }}
                              >
                                {!isAvailable && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-[1.5px] bg-red-500 rotate-45" />
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {/* Display As Buttons (Pill buttons) */}
                      {variant.displayAs === 'buttons' && (
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {variant.options.map((opt) => {
                            const isSelected = currentSelected === opt.value
                            const isAvailable = opt.available

                            return (
                              <button
                                key={opt.value}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() =>
                                  setSelectedVariants((prev) => ({
                                    ...prev,
                                    [variant.id]: opt.value,
                                  }))
                                }
                                className={`px-4 py-2 text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${isSelected
                                  ? 'border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-text)]'
                                  : 'border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-2)] hover:border-[var(--color-text-2)]'
                                  } ${!isAvailable ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                              >
                                {opt.value}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {/* Display As Dropdown */}
                      {variant.displayAs === 'dropdown' && (
                        <div className="relative max-w-xs">
                          <select
                            value={currentSelected}
                            onChange={(e) =>
                              setSelectedVariants((prev) => ({
                                ...prev,
                                [variant.id]: e.target.value,
                              }))
                            }
                            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[13px] text-[var(--color-text)] px-4 py-2.5 focus:outline-none focus:border-[var(--color-primary)] font-medium cursor-pointer"
                          >
                            {variant.options.map((opt) => (
                              <option
                                key={opt.value}
                                value={opt.value}
                                disabled={!opt.available}
                              >
                                {opt.value} {!opt.available ? '(Unavailable)' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* STOCK STATUS */}
            <div id="product-stock-status" className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-[13px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 font-semibold text-[13px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  <span>Out of Stock</span>
                </div>
              )}

              {product.stockNote && (
                <p className="text-[13px] text-amber-700 font-medium mt-1">
                  {product.stockNote}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[var(--color-border)] mb-6" />

            {/* CTA BUTTON (Primary Action) & Secondary Share */}
            <div className="space-y-3 mb-6">
              <a
                id="product-primary-cta-button"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3.5 bg-[#1F5C38] hover:bg-[#154228] text-white h-[54px] px-8 text-[15px] font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg w-full"
              >
                {/* WhatsApp Vector Icon */}
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span>{product.redirect?.ctaLabel || 'Enquire on WhatsApp'}</span>
              </a>

              {/* Secondary Actions: Share Bag & Copy Link */}
              <div className="flex items-center justify-between pt-1">
                <a
                  id="share-product-whatsapp"
                  href={shareWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[var(--color-text-2)] hover:text-[var(--color-primary-dark)] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share this bag</span>
                </a>

                <button
                  id="copy-product-link-btn"
                  type="button"
                  onClick={handleCopyLink}
                  className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Link copied</span>
                    </>
                  ) : (
                    <span>Copy link</span>
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[var(--color-border)] mb-6" />

            {/* SHIPPING BADGE ROW */}
            <div
              id="product-shipping-badges"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2 text-left"
            >
              <div className="flex items-start gap-2.5 p-2.5 bg-[var(--color-surface-2)]">
                <Truck className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-semibold text-[var(--color-text)]">
                    Free Shipping
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                    On orders &gt; ₹5,000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[var(--color-surface-2)]">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-semibold text-[var(--color-text)]">
                    Fast Delivery
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                    2–4 business days
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[var(--color-surface-2)]">
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-semibold text-[var(--color-text)]">
                    Authenticity
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                    100% Genuine Leather
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BELOW THE FOLD: TABS (Details | Attributes | Care) */}
      <div className="w-full bg-white border-t border-[var(--color-border)] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation Header */}
          <div className="flex items-center justify-center border-b border-[var(--color-border)] mb-10 gap-8 sm:gap-12">
            <button
              id="tab-btn-details"
              type="button"
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer relative ${activeTab === 'details'
                ? 'text-[#1A1A2E]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
            >
              <span>Details</span>
              {activeTab === 'details' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>

            <button
              id="tab-btn-attributes"
              type="button"
              onClick={() => setActiveTab('attributes')}
              className={`pb-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer relative ${activeTab === 'attributes'
                ? 'text-[#1A1A2E]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
            >
              <span>Attributes &amp; Specs</span>
              {activeTab === 'attributes' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>

            <button
              id="tab-btn-care"
              type="button"
              onClick={() => setActiveTab('care')}
              className={`pb-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer relative ${activeTab === 'care'
                ? 'text-[#1A1A2E]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
            >
              <span>Care Guide</span>
              {activeTab === 'care' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>
          </div>

          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div id="tab-content-details" className="prose max-w-none text-[15px] sm:text-[16px] text-[var(--color-text-2)] leading-relaxed space-y-4">
              {product.description ? (
                <div
                  className="[&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-[15px] [&_strong]:text-[#1A1A2E]"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p>No detailed description available for this product.</p>
              )}
            </div>
          )}

          {/* Tab 2: Attributes Table */}
          {activeTab === 'attributes' && (
            <div id="tab-content-attributes" className="w-full">
              {product.attributes && product.attributes.length > 0 ? (
                <div className="border border-[var(--color-border)] overflow-hidden">
                  <table className="w-full text-left text-[14px]">
                    <tbody>
                      {product.attributes.map((attr, index) => (
                        <tr
                          key={attr.key}
                          className={index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-white'}
                        >
                          <td className="py-3.5 px-5 font-semibold text-[#1A1A2E] w-1/3 border-b border-[var(--color-border)]">
                            {attr.key}
                          </td>
                          <td className="py-3.5 px-5 text-[var(--color-text-2)] w-2/3 border-b border-[var(--color-border)]">
                            {attr.value}
                          </td>
                        </tr>
                      ))}
                      {product.sku && (
                        <tr
                          className={
                            product.attributes.length % 2 === 0
                              ? 'bg-[var(--color-surface)]'
                              : 'bg-white'
                          }
                        >
                          <td className="py-3.5 px-5 font-semibold text-[#1A1A2E] w-1/3 border-b border-[var(--color-border)]">
                            SKU Reference
                          </td>
                          <td className="py-3.5 px-5 text-[var(--color-text-2)] w-2/3 border-b border-[var(--color-border)]">
                            {product.sku}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[14px] text-[var(--color-text-muted)] text-center py-6">
                  No attributes listed for this item.
                </p>
              )}
            </div>
          )}

          {/* Tab 3: Care Guide */}
          {activeTab === 'care' && (
            <div id="tab-content-care" className="space-y-6 text-[15px] text-[var(--color-text-2)] leading-relaxed">
              <div className="bg-[var(--color-surface-2)] p-6 border border-[var(--color-border)] mb-6">
                <h4
                  className="font-heading text-[20px] font-semibold text-[#1A1A2E] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Preserving Your Maison Elara Piece
                </h4>
                <p className="text-[14px] text-[var(--color-text-2)]">
                  Fine vegetable-tanned Italian leather develops an exquisite natural patina over
                  time. Following these artisanal care guidelines will ensure your bag lasts for
                  generations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="font-semibold text-[14px] text-[#1A1A2E] uppercase tracking-wider">
                    Routine Maintenance
                  </h5>
                  <p className="text-[14px] text-[var(--color-text-2)]">
                    Wipe gently with a clean, dry, soft microfiber cloth to remove dust. Apply a
                    neutral leather cream every 6 to 12 months with light circular motions.
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold text-[14px] text-[#1A1A2E] uppercase tracking-wider">
                    Moisture &amp; Sunlight
                  </h5>
                  <p className="text-[14px] text-[var(--color-text-2)]">
                    Avoid prolonged exposure to direct sunlight, extreme heat, and heavy rain. If
                    exposed to water, dab gently with a dry towel and let dry naturally at room
                    temperature.
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold text-[14px] text-[#1A1A2E] uppercase tracking-wider">
                    Storage
                  </h5>
                  <p className="text-[14px] text-[var(--color-text-2)]">
                    Store your bag inside its complimentary Maison Elara breathable cotton dust bag
                    in a cool, dry place. Stuff lightly with tissue paper to maintain silhouette.
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold text-[14px] text-[#1A1A2E] uppercase tracking-wider">
                    Hardware Care
                  </h5>
                  <p className="text-[14px] text-[var(--color-text-2)]">
                    Our 24K gold-plated and brushed brass components are sealed with an anti-tarnish
                    finish. Avoid contact with perfumes, sanitizers, and abrasive cleaning agents.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS: "You May Also Like" */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section
          id="related-products-section"
          className="w-full bg-[var(--color-surface)] py-20 border-t border-[var(--color-border)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-3">
                CURATED COMPLEMENTS
              </span>
              <h2
                id="related-products-heading"
                className="font-heading text-[30px] sm:text-[36px] font-semibold text-[#1A1A2E] tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                You May Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
