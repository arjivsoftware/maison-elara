'use client'

import React from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  Clock,
} from 'lucide-react'
import {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  YoutubeIcon,
  TwitterIcon,
  WhatsAppIcon,
} from '@/components/icons/SocialIcons'
import type { SiteSettings, Collection, CMSPage } from '@/types'
import { buildWhatsAppUrl } from '@/lib/utils'

interface FooterProps {
  settings: SiteSettings
  collections?: Collection[]
  pages?: CMSPage[]
}

const DEFAULT_COLLECTIONS = [
  { name: 'The Signature Collection', slug: 'signature-collection' },
  { name: 'Everyday Luxury', slug: 'everyday-luxury' },
  { name: 'The Evening Edit', slug: 'evening-edit' },
  { name: 'The Atelier Edit', slug: 'the-atelier-edit' },
]

export default function Footer({ settings, collections, pages }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const displayCollections = collections && collections.length > 0
    ? collections.map(c => ({ name: c.name, slug: c.slug }))
    : DEFAULT_COLLECTIONS

  const footerPages = pages
    ? pages.filter(p => p.showInFooter)
    : [
      { title: 'About Maison Elara', slug: 'about-us' },
      { title: 'Leather Care Guide', slug: 'care-guide' },
      { title: 'Shipping & Returns', slug: 'shipping-returns' },
    ]

  const whatsappUrl = buildWhatsAppUrl(
    settings.contact?.whatsapp || settings.whatsapp?.primaryNumber || '+911212121212',
    settings.whatsapp?.defaultMessage || 'Hello Maison Elara, I would like to make an enquiry.'
  )

  const email = settings.contact?.email || 'concierge@maisonelara.com'
  const phone = settings.contact?.phone || '+91 98765 43210'

  return (
    <footer
      id="site-footer"
      className="w-full bg-[var(--color-secondary)] text-[var(--color-surface)] pt-20 pb-10 border-t border-[var(--color-secondary)]"
      style={{ backgroundColor: '#1A1A2E' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 pb-16">

          {/* COLUMN 1: Brand */}
          <div className="flex flex-col space-y-4">
            <Link
              id="footer-brand-logo"
              href="/"
              className="group inline-flex flex-col focus:outline-none"
            >
              <span
                className="font-heading text-[28px] font-semibold text-[#C9A84C] tracking-wide leading-tight group-hover:text-[#E8D5A3] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {settings.business?.name || 'Maison Elara'}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#9A9AAA] mt-1 font-normal">
                {settings.business?.tagline || 'Crafted to Last a Lifetime'}
              </span>
            </Link>

            <p className="text-[14px] leading-relaxed text-[#9A9AAA] max-w-sm pt-1">
              {settings.business?.description ||
                'A design-led luxury leather atelier crafting timeless silhouettes with Italian materials and Indian artisanship.'}
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center space-x-3 pt-3">
              {settings.social?.instagram && (
                <a
                  id="footer-social-instagram"
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAF8F5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all focus:outline-none"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}

              {settings.social?.facebook && (
                <a
                  id="footer-social-facebook"
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAF8F5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all focus:outline-none"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}

              {settings.social?.pinterest && (
                <a
                  id="footer-social-pinterest"
                  href={settings.social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAF8F5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all focus:outline-none"
                  aria-label="Pinterest"
                >
                  <PinterestIcon className="w-4 h-4" />
                </a>
              )}

              {settings.social?.youtube && (
                <a
                  id="footer-social-youtube"
                  href={settings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAF8F5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all focus:outline-none"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}

              {settings.social?.twitter && (
                <a
                  id="footer-social-twitter"
                  href={settings.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAF8F5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all focus:outline-none"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* COLUMN 2: Collections */}
          <div className="flex flex-col space-y-4">
            <h4
              id="footer-heading-collections"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C]"
            >
              Collections
            </h4>
            <ul className="space-y-3">
              {displayCollections.map((col, idx) => (
                <li key={idx}>
                  <Link
                    href={`/collections/${col.slug}`}
                    className="text-[14px] text-[#9A9AAA] hover:text-[#C9A84C] transition-colors focus:outline-none"
                  >
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Help */}
          <div className="flex flex-col space-y-4">
            <h4
              id="footer-heading-help"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C]"
            >
              Help
            </h4>
            <ul className="space-y-3">
              {footerPages.map((page, idx) => (
                <li key={idx}>
                  <Link
                    href={`/pages/${page.slug}`}
                    className="text-[14px] text-[#9A9AAA] hover:text-[#C9A84C] transition-colors focus:outline-none"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-[14px] text-[#9A9AAA] hover:text-[#C9A84C] transition-colors focus:outline-none"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/about-us"
                  className="text-[14px] text-[#9A9AAA] hover:text-[#C9A84C] transition-colors focus:outline-none"
                >
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact */}
          <div className="flex flex-col space-y-4">
            <h4
              id="footer-heading-contact"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C]"
            >
              Get in Touch
            </h4>

            <div className="space-y-3 text-[14px] text-[#9A9AAA]">
              <a
                id="footer-contact-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#C9A84C] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <span>{settings.contact?.whatsapp || phone}</span>
              </a>

              <a
                id="footer-contact-email"
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 hover:text-[#C9A84C] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <span>{email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-[#9A9AAA]">
                <Clock className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:00 PM IST</span>
              </div>
            </div>

            {/* Small Gold Pill Button */}
            <div className="pt-2">
              <a
                id="footer-whatsapp-pill-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#1A1A2E] text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-[#E8D5A3] transition-colors shadow-sm focus:outline-none"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#1A1A2E]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#9A9AAA]">
          <p id="footer-copyright">
            © {currentYear} {settings.business?.name || 'Maison Elara'}. All rights reserved. Handcrafted in India.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link
              href="/pages/about-us"
              className="hover:text-[#C9A84C] transition-colors"
            >
              About
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/pages/care-guide"
              className="hover:text-[#C9A84C] transition-colors"
            >
              Care Guide
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/pages/shipping-returns"
              className="hover:text-[#C9A84C] transition-colors"
            >
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
