import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-[var(--color-surface)] px-4 py-20">
      <div className="max-w-md w-full text-center bg-white border border-[var(--color-border)] p-8 sm:p-12 shadow-sm">
        <div className="w-14 h-14 rounded-full border border-[var(--color-primary)]/40 mx-auto mb-5 flex items-center justify-center text-[var(--color-primary)]">
          <Sparkles className="w-6 h-6" />
        </div>

        <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-2">
          PAGE NOT FOUND
        </span>

        <h1
          className="font-heading text-[32px] sm:text-[36px] font-semibold text-[#1A1A2E] tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          404 — Piece Unavailable
        </h1>

        <p className="text-[15px] text-[var(--color-text-2)] leading-relaxed mb-8">
          The atelier page you are looking for may have been moved or is currently being curated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A2E] text-white text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[var(--color-primary)] hover:text-[#1A1A2E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore All Bags</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border-strong)] text-[#1A1A2E] text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
