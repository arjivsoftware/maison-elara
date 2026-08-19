export interface ProductImage {
  url: string
  alt: string
  sortOrder: number
}

export interface ProductAttribute {
  key: string
  value: string
}

export interface VariantOption {
  value: string
  priceModifier?: number
  available: boolean
  colorHex?: string
}

export interface ProductVariant {
  id: string
  label: string
  options: VariantOption[]
  required: boolean
  displayAs: 'dropdown' | 'buttons' | 'swatches'
}

export interface ProductRedirect {
  type: 'whatsapp' | 'whatsapp_catalog' | 'phone' | 'email' | 'url'
  customMessage?: string
  customUrl?: string
  ctaLabel?: string
}

export interface ProductSEO {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription?: string
  description: string
  price: number
  mrp: number
  currency: string
  unit?: string
  moq?: number
  sku?: string
  images: ProductImage[]
  thumbnail: string
  videoUrl?: string
  category: string
  collectionIds: string[]
  tags: string[]
  attributes: ProductAttribute[]
  variants: ProductVariant[]
  badge: '' | 'new' | 'bestseller' | 'sale' | 'limited' | 'trending' | 'exclusive'
  inStock: boolean
  stockNote?: string
  featured: boolean
  sortOrder: number
  redirect: ProductRedirect
  seo: ProductSEO
  createdAt: string
  updatedAt: string
}

export interface CategorySEO {
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
  parentId?: string
  accentColor?: string
  showInNav: boolean
  featured: boolean
  sortOrder: number
  seo: CategorySEO
  createdAt: string
  updatedAt: string
}

export interface Collection {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
  productIds: string[]
  displayStyle: 'grid' | 'carousel' | 'featured'
  featured: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type BannerTextPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  imageMobile?: string
  textPosition: BannerTextPosition
  textColor: string
  overlayOpacity: number
  showFrom?: string | null
  showUntil?: string | null
  redirect?: ProductRedirect
  active: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  name: string
  location?: string
  avatar?: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
  productId?: string
  verified: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type FAQCategory = 'ordering' | 'payment' | 'shipping' | 'returns' | 'products' | 'general'

export interface FAQ {
  id: string
  question: string
  answer: string
  category: FAQCategory
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface CMSPage {
  id: string
  slug: string
  title: string
  content: string
  showInNav: boolean
  showInFooter: boolean
  seo: { metaTitle: string; metaDescription: string }
  createdAt: string
  updatedAt: string
}

export interface SiteSettings {
  business: {
    name: string
    tagline: string
    description: string
    logo: string
    favicon: string
    estYear?: number
    gstin?: string
  }
  contact: {
    whatsapp: string
    whatsapp2?: string
    phone: string
    phone2?: string
    email: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
    country: string
    googleMapsUrl?: string
  }
  social: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
    pinterest?: string
  }
  whatsapp: {
    enabled: boolean
    primaryNumber: string
    defaultMessage: string
    productMessage: string
    catalogMessage: string
    shareTemplate: string
    catalogLink?: string
  }
  store: {
    currency: string
    currencySymbol: string
    showPrices: boolean
    showMrp: boolean
    showDiscount: boolean
    defaultLanguage: string
    enabledLanguages: string[]
  }
  payment: {
    upiId?: string
    upiQrImage?: string
  }
  shipping: {
    enabled: boolean
    displayInfo: string
    freeShippingAbove?: number
    flatRate?: number
    codAvailable: boolean
    codNote?: string
    estimatedDays?: string
  }
  announcement: {
    enabled: boolean
    text: string
    bgColor: string
    textColor: string
    link?: string
    closeable: boolean
    showFrom?: string | null
    showUntil?: string | null
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontHeading: string
    fontBody: string
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    mode: 'light' | 'dark' | 'system'
  }
  policies: {
    returnPolicy?: string
    shippingPolicy?: string
    privacyPolicy?: string
    termsOfService?: string
  }
}

export interface GlobalSEO {
  siteTitle: string
  siteDescription: string
  siteUrl: string
  defaultOgImage?: string
  twitterHandle?: string
  googleAnalyticsId?: string
  googleSearchConsoleVerification?: string
  bingVerification?: string
  noIndex: boolean
  structuredDataType: string
  canonicalBase?: string
  robots?: string
}
