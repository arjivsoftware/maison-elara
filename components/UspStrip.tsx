import React from 'react'
import { Award, Shield, Truck, Heart } from 'lucide-react'

const USPS = [
  {
    id: 'usp-italian-leather',
    icon: Award,
    title: 'Italian Leather',
    description: 'Sourced from Tuscan tanneries',
  },
  {
    id: 'usp-warranty',
    icon: Shield,
    title: '12-Month Warranty',
    description: 'Craftsmanship guaranteed',
  },
  {
    id: 'usp-free-shipping',
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders above ₹5,000',
  },
  {
    id: 'usp-made-in-india',
    icon: Heart,
    title: 'Made in India',
    description: 'By skilled artisans in Surat',
  },
]

export default function UspStrip() {
  return (
    <section
      id="usp-strip-section"
      className="w-full bg-[#1A1A2E] text-white py-12 md:py-14 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {USPS.map((usp, index) => {
            const Icon = usp.icon
            return (
              <div
                key={usp.id}
                id={usp.id}
                className={`flex flex-col items-center text-center px-4 ${
                  index > 1 ? 'pt-6 md:pt-0' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full border border-[var(--color-primary)]/40 bg-white/5 flex items-center justify-center text-[var(--color-primary)] mb-3.5 shadow-sm">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3
                  className="font-heading text-[18px] font-semibold text-[var(--color-primary)] tracking-wide mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {usp.title}
                </h3>
                <p className="text-[13px] text-white/70 font-light leading-snug">
                  {usp.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
