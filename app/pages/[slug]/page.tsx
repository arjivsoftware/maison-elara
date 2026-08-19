import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPages, getPageBySlug, getSettings } from '@/lib/data'
import { ChevronRight, MapPin, Mail, Phone, Clock, Sparkles } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const pages = getPages()
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found | Maison Elara',
    }
  }

  return {
    title: page.seo?.metaTitle || `${page.title} — Maison Elara`,
    description:
      page.seo?.metaDescription ||
      `Read about ${page.title} at Maison Elara luxury leather bag atelier.`,
  }
}

export default async function CMSDynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)
  const settings = getSettings()

  if (!page) {
    notFound()
  }

  const isAboutUs = slug === 'about-us'
  const contact = settings.contact
  const waNumber = settings.whatsapp?.primaryNumber || contact?.whatsapp || '+911212121212'
  const atelierWaUrl = buildWhatsAppUrl(
    waNumber,
    'Hello Maison Elara Atelier, I would like to schedule a private visit or make an enquiry.'
  )

  return (
    <div id={`cms-page-${page.slug}`} className="w-full bg-[var(--color-surface)] min-h-screen">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]"
          >
            <Link
              href="/"
              className="hover:text-[var(--color-primary-dark)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <span className="text-[var(--color-text)] font-medium">
              {page.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Special About Us Treatment: Full-Width Editorial Hero Image Banner */}
      {isAboutUs && (
        <div className="w-full h-[320px] sm:h-[420px] bg-gradient-to-r from-[#1A1A2E] via-[#2A1B38] to-[#120F1D] relative overflow-hidden border-b border-[var(--color-border)] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.15)_0,transparent_70%)]" />
          <div className="relative z-10 max-w-2xl text-white">
            <div className="w-12 h-12 rounded-full border border-[var(--color-primary)]/40 mx-auto mb-4 flex items-center justify-center text-[var(--color-primary)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[var(--color-primary)] uppercase block mb-2">
              EST. {settings.business.estYear || 2024} &bull; SURAT, INDIA
            </span>
            <p
              className="font-heading italic text-[24px] sm:text-[30px] font-light text-white/90 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              &ldquo;Rooted in Heritage. Defined by Quiet Luxury.&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Main Narrow Content Container (max-w-[720px] Centered) */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-14 md:py-20">
        {/* Page Title in Cormorant Garamond 48px at top */}
        <header className="text-center mb-12 pb-8 border-b border-[var(--color-border)]">
          <h1
            id="cms-page-title"
            className="font-heading text-[36px] sm:text-[42px] md:text-[48px] font-semibold text-[#1A1A2E] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {page.title}
          </h1>
        </header>

        {/* CMS HTML Content Container with Specific Typographic Styling */}
        <article
          id="cms-page-article"
          className="cms-content space-y-6 text-[16px] leading-[1.8] text-[#33334D]
            [&_h2]:font-heading [&_h2]:text-[30px] [&_h2]:sm:text-[32px] [&_h2]:font-semibold [&_h2]:text-[#C9A84C] [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-snug
            [&_h3]:font-heading [&_h3]:text-[22px] [&_h3]:sm:text-[24px] [&_h3]:font-medium [&_h3]:text-[#1A1A2E] [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-[#33334D] [&_p]:mb-6
            [&_strong]:font-semibold [&_strong]:text-[#1A1A2E]
            [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:pl-1
            [&_li]:relative [&_li]:pl-6 [&_li]:text-[15px] [&_li]:sm:text-[16px] [&_li]:leading-[1.7] [&_li]:text-[#33334D]
            [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-[10px] [&_li::before]:w-2 [&_li::before]:h-2 [&_li::before]:rounded-full [&_li::before]:bg-[#C9A84C]"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* Special About Us Treatment: Visit the Atelier Strip */}
        {isAboutUs && contact && (
          <div
            id="visit-the-atelier-strip"
            className="mt-16 pt-10 border-t border-[var(--color-border-strong)]"
          >
            <div className="bg-[#1A1A2E] text-white p-8 sm:p-10 border border-white/10 shadow-md">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase block mb-2">
                BY APPOINTMENT
              </span>
              <h2
                className="font-heading text-[26px] sm:text-[30px] font-semibold text-white mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Visit the Atelier
              </h2>
              <p className="text-[14px] sm:text-[15px] text-white/75 leading-relaxed mb-6">
                We welcome clients to our design atelier in Surat for private viewings, custom
                leather selections, and bespoke consultation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-white/80 border-t border-white/10 pt-6 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Atelier Location</p>
                    <p>{contact.addressLine1}</p>
                    <p>
                      {contact.city}, {contact.state} {contact.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Viewing Hours</p>
                    <p>Monday – Saturday: 10:00 – 19:00 IST</p>
                    <p className="text-white/60">Prior booking requested</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Concierge Phone</p>
                    <p>{contact.phone || contact.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Direct Email</p>
                    <p>{contact.email}</p>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <a
                  href={atelierWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[var(--color-primary)] hover:bg-[#D4B55C] text-[#1A1A2E] text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors shadow-sm"
                >
                  <span>Book Private Atelier Appointment</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
