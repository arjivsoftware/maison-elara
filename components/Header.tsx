'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from '@/components/icons/SocialIcons'
import type { Category, SiteSettings } from '@/types'
import { buildWhatsAppUrl } from '@/lib/utils'

interface HeaderProps {
  categories: Category[]
  settings: SiteSettings
}

export default function Header({ categories, settings }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Filter top-level categories that should appear in nav
  const navCategories = categories
    .filter(cat => cat.showInNav && !cat.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  // Find children for any parent category
  const getChildCategories = (parentId: string) => {
    return categories.filter(cat => cat.parentId === parentId)
  }

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])


  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsapp?.primaryNumber || '+911212121212',
    settings.whatsapp?.defaultMessage || 'Hello Maison Elara, I would like to make an enquiry.'
  )

  const instagramUrl = settings.social?.instagram || 'https://instagram.com/maisonelara'

  return (
    <>
      <header
        id="main-header"
        className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-border)] transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* LEFT COLUMN: Logo & Tagline */}
            <div className="flex-shrink-0 flex flex-col justify-center pr-4">
              <Link
                id="header-brand-logo"
                href="/"
                className="group flex flex-col focus:outline-none"
              >
                {settings.business?.logo ? (
                  /* --- Image Logo --- */
                  <img
                    src={settings.business.logo}
                    alt={`${settings.business?.name || 'Maison Elara'} Logo`}
                    width={512}
                    height={192}
                    className="h-14 md:h-16 w-auto object-contain transition-opacity group-hover:opacity-80"
                  />
                ) : (
                  /* --- Text Fallback --- */
                  <>
                    <span
                      className="font-heading text-[22px] md:text-[24px] font-semibold text-[var(--color-primary)] tracking-wide leading-tight group-hover:text-[var(--color-primary-dark)] transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {settings.business?.name || 'Maison Elara'}
                    </span>
                    <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] font-normal leading-none mt-1">
                      {settings.business?.tagline || 'Crafted to Last a Lifetime'}
                    </span>
                  </>
                )}
              </Link>
            </div>

            {/* CENTER COLUMN: Desktop Navigation */}
            <nav
              id="desktop-nav"
              aria-label="Main Navigation"
              className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            >
              {navCategories.map((cat) => {
                const children = getChildCategories(cat.id)
                const hasChildren = children.length > 0
                const isActive = pathname === `/category/${cat.slug}`

                if (hasChildren) {
                  return (
                    <div
                      key={cat.id}
                      className="relative group py-6"
                      onMouseEnter={() => setActiveDropdown(cat.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        id={`nav-link-${cat.slug}`}
                        href={`/category/${cat.slug}`}
                        className={`inline-flex items-center text-center font-heading text-[12px] font-bold uppercase tracking-[0.12em] transition-colors py-1 ${isActive
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                          }`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {cat.name}
                        <ChevronDown className="ml-1 w-3 h-3 transition-transform duration-200 group-hover:rotate-180 text-[var(--color-text-muted)]" />
                      </Link>
                      <span
                        className={`absolute bottom-5 left-0 w-full h-[1.5px] bg-[var(--color-primary)] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                      />

                      {/* Dropdown Menu */}
                      <div
                        id={`mega-menu-${cat.slug}`}
                        className={`absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white border border-[var(--color-border)] py-3 px-2 shadow-none transition-all duration-200 ${activeDropdown === cat.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                          }`}
                      >
                        <div className="flex flex-col space-y-1">
                          <Link
                            href={`/category/${cat.slug}`}
                            className="px-3 py-2 text-[12px] font-heading uppercase tracking-[0.1em] text-[var(--color-text-2)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
                          >
                            All {cat.name}
                          </Link>
                          {children.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/category/${sub.slug}`}
                              className="px-3 py-2 text-[12px] font-heading uppercase tracking-[0.1em] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={cat.id} className="relative group py-6">
                    <Link
                      id={`nav-link-${cat.slug}`}
                      href={`/category/${cat.slug}`}
                      className={`inline-block text-center font-heading text-[13px] font-medium uppercase tracking-[0.12em] transition-colors py-1 ${isActive
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                        }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {cat.name}
                    </Link>
                    <span
                      className={`absolute bottom-5 left-0 w-full h-[1.5px] bg-[var(--color-primary)] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </div>
                )
              })}

              {/* Static Nav Link: Collections */}
              <div className="relative group py-6">
                <Link
                  id="nav-link-collections"
                  href="/collections"
                  className={`inline-block text-center font-heading text-[13px] font-medium uppercase tracking-[0.12em] transition-colors py-1 ${pathname === '/collections'
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                    }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Collections
                </Link>
                <span
                  className={`absolute bottom-5 left-0 w-full h-[1.5px] bg-[var(--color-primary)] transition-transform duration-300 origin-left ${pathname === '/collections' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </div>

              {/* Static Nav Link: About */}
              <div className="relative group py-6">
                <Link
                  id="nav-link-about"
                  href="/pages/about-us"
                  className={`inline-block text-center font-heading text-[13px] font-medium uppercase tracking-[0.12em] transition-colors py-1 ${pathname === '/pages/about-us'
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                    }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  About
                </Link>
                <span
                  className={`absolute bottom-5 left-0 w-full h-[1.5px] bg-[var(--color-primary)] transition-transform duration-300 origin-left ${pathname === '/pages/about-us' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </div>
            </nav>

            {/* RIGHT COLUMN: Action Icons & Mobile Toggle */}
            <div className="flex items-center space-x-3 md:space-x-5 pr-2">
              {/* Search Toggle Button */}
              {/* <button
                id="header-search-btn"
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                aria-label="Search collection"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button> */}

              {/* Instagram Icon Link */}
              <a
                id="header-instagram-link"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                aria-label="Maison Elara Instagram"
              >
                <InstagramIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>

              {/* WhatsApp Icon Link */}
              <a
                id="header-whatsapp-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                aria-label="Enquire via WhatsApp"
                title="Enquire on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>

              {/* Mobile Hamburger Menu Button */}
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH BAR ACCORDION */}
        {searchOpen && (
          <div
            id="header-search-panel"
            className="w-full bg-[var(--color-surface-2)] border-t border-[var(--color-border)] px-4 py-4 md:py-6 animate-fadeIn"
          >
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bags, leather types, silhouettes..."
                className="w-full bg-transparent border-b border-[var(--color-border-strong)] pb-2 text-[15px] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] focus:outline-none"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE SLIDE-IN DRAWER */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-menu-drawer"
            className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white border-l border-[var(--color-border)] shadow-none flex flex-col justify-between p-6 overflow-y-auto animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
                <div>
                  <span
                    className="font-heading text-[20px] font-semibold text-[var(--color-primary)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {settings.business?.name || 'Maison Elara'}
                  </span>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-0.5">
                    {settings.business?.tagline || 'Crafted to Last a Lifetime'}
                  </p>
                </div>
                <button
                  id="mobile-menu-close-btn"
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col py-6 space-y-4">
                {navCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    id={`mobile-nav-link-${cat.slug}`}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-[16px] font-medium uppercase tracking-[0.12em] text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors py-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cat.name}
                  </Link>
                ))}

                <div className="pt-2 border-t border-[var(--color-border)] flex flex-col space-y-4">
                  <Link
                    id="mobile-nav-link-collections"
                    href="/collections"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-[16px] font-medium uppercase tracking-[0.12em] text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors py-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Collections
                  </Link>
                  <Link
                    id="mobile-nav-link-about"
                    href="/pages/about-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-[16px] font-medium uppercase tracking-[0.12em] text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors py-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    About Atelier
                  </Link>
                  <Link
                    id="mobile-nav-link-care"
                    href="/pages/care-guide"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-[16px] font-medium uppercase tracking-[0.12em] text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors py-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Leather Care Guide
                  </Link>
                  <Link
                    id="mobile-nav-link-shipping"
                    href="/pages/shipping-returns"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-[16px] font-medium uppercase tracking-[0.12em] text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors py-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Shipping & Returns
                  </Link>
                </div>
              </nav>
            </div>

            {/* Mobile Drawer Footer Actions */}
            <div className="pt-6 border-t border-[var(--color-border)] space-y-4">
              <a
                id="mobile-menu-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-secondary)] text-[var(--color-surface)] text-[12px] font-semibold uppercase tracking-[0.12em] hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Enquire on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center space-x-6 pt-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--color-text-2)] hover:text-[var(--color-primary)] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
