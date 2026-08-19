import React from 'react'

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header skeleton */}
      <div className="max-w-md mx-auto text-center space-y-4 mb-14">
        <div className="h-4 w-28 bg-[#F2EDE8] animate-shimmer mx-auto" />
        <div className="h-10 w-64 bg-[#F2EDE8] animate-shimmer mx-auto" />
        <div className="h-4 w-80 bg-[#F2EDE8] animate-shimmer mx-auto" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-[var(--color-border)] p-3.5 space-y-3">
            <div className="w-full aspect-square bg-[#F2EDE8] animate-shimmer" />
            <div className="h-5 w-3/4 bg-[#F2EDE8] animate-shimmer" />
            <div className="h-3.5 w-full bg-[#F2EDE8] animate-shimmer" />
            <div className="h-4 w-1/2 bg-[#F2EDE8] animate-shimmer pt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
