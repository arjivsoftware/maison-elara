'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Banner } from '@/types'
import { resolveImageUrl } from '@/lib/utils'

interface HeroSliderProps {
  banners: Banner[]
}

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #0D0E18 0%, #1A1A2E 45%, #2B2338 100%)',
  'linear-gradient(135deg, #1A0F1A 0%, #2A1124 45%, #181326 100%)',
  'linear-gradient(135deg, #0C1A17 0%, #162924 45%, #1A1A2E 100%)',
]

export default function HeroSlider({ banners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const count = banners.length

  const nextSlide = useCallback(() => {
    if (count === 0) return
    setCurrentIndex((prev) => (prev + 1) % count)
  }, [count])

  const prevSlide = useCallback(() => {
    if (count === 0) return
    setCurrentIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  useEffect(() => {
    if (count <= 1 || isPaused) return

    timerRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [count, isPaused, nextSlide])

  if (!banners || banners.length === 0) {
    return null
  }

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'items-start justify-start text-left pt-24 md:pt-32'
      case 'top-center':
        return 'items-start justify-center text-center pt-24 md:pt-32'
      case 'top-right':
        return 'items-start justify-end text-right pt-24 md:pt-32'
      case 'middle-left':
        return 'items-center justify-start text-left'
      case 'middle-center':
        return 'items-center justify-center text-center'
      case 'middle-right':
        return 'items-center justify-end text-right'
      case 'bottom-left':
        return 'items-end justify-start text-left pb-24 md:pb-32'
      case 'bottom-center':
        return 'items-end justify-center text-center pb-24 md:pb-32'
      case 'bottom-right':
        return 'items-end justify-end text-right pb-24 md:pb-32'
      default:
        return 'items-center justify-start text-left'
    }
  }

  return (
    <section
      id="hero-banner-slider"
      className="relative w-full h-screen overflow-hidden group bg-[#1A1A2E]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Collection Banner Slider"
    >
      {banners.map((banner, index) => {
        const isActive = index === currentIndex
        const posClass = getPositionClasses(banner.textPosition)
        const placeholderGradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]
        const hasImgError = imgErrorMap[banner.id]
        const redirectUrl = banner.redirect?.customUrl || '/collections'
        const ctaLabel = banner.redirect?.ctaLabel || 'Explore Now'
        const textColor = banner.textColor || '#FFFFFF'

        return (
          <div
            key={banner.id}
            id={`hero-slide-${index}`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Canvas / Image / Rich Placeholder */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: placeholderGradient }}
            >
              {!hasImgError && (
                <Image
                  src={resolveImageUrl(banner.image)}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  className="object-cover object-center transition-transform duration-10000 ease-out scale-100 group-hover:scale-105"
                  sizes="100vw"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setImgErrorMap((prev) => ({ ...prev, [banner.id]: true }))
                  }}
                />
              )}

              {/* Textured Atelier watermark overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            {/* Dark Overlay with Dynamic Opacity */}
            <div
              className="absolute inset-0 w-full h-full transition-colors duration-500"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${banner.overlayOpacity ?? 0.4})`,
              }}
            />

            {/* Banner Content Container */}
            <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex">
              <div className={`w-full h-full flex ${posClass}`}>
                <div className="max-w-2xl flex flex-col space-y-4 md:space-y-6">
                  {/* Subtle Subtitle / Label */}
                  {banner.subtitle && (
                    <p
                      className="text-[14px] sm:text-[16px] md:text-[18px] font-sans tracking-wide leading-relaxed opacity-90 max-w-xl"
                      style={{ color: textColor }}
                    >
                      {banner.subtitle}
                    </p>
                  )}

                  {/* Main Display Title */}
                  <h1
                    className="font-heading text-[38px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] tracking-tight"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: textColor,
                    }}
                  >
                    {banner.title}
                  </h1>

                  {/* Outline CTA Button */}
                  {banner.redirect?.ctaLabel && (
                    <div className="pt-2 md:pt-4">
                      <Link
                        id={`hero-cta-btn-${index}`}
                        href={redirectUrl}
                        className="inline-flex items-center justify-center px-8 py-3.5 md:py-4 text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.16em] border transition-all duration-300 backdrop-blur-[2px] shadow-sm hover:scale-[1.02]"
                        style={{
                          borderColor: textColor,
                          color: textColor,
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF'
                          e.currentTarget.style.color = '#1A1A2E'
                          e.currentTarget.style.borderColor = '#FFFFFF'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = textColor
                          e.currentTarget.style.borderColor = textColor
                        }}
                      >
                        {ctaLabel}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows (Desktop only, visible on hover) */}
      {count > 1 && (
        <>
          <button
            id="hero-arrow-prev"
            type="button"
            onClick={prevSlide}
            className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/25 bg-black/20 backdrop-blur-sm text-white items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#1A1A2E] hover:border-white transition-all duration-300 focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="hero-arrow-next"
            type="button"
            onClick={nextSlide}
            className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/25 bg-black/20 backdrop-blur-sm text-white items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#1A1A2E] hover:border-white transition-all duration-300 focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Navigation Dots at Bottom Center */}
      {count > 1 && (
        <div
          id="hero-slider-dots"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5"
        >
          {banners.map((_, idx) => {
            const isActive = idx === currentIndex
            return (
              <button
                key={idx}
                id={`hero-dot-${idx}`}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'w-7 h-2 rounded-full bg-[#C9A84C]'
                    : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
