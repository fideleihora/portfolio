'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackVisit } from '@/lib/portfolioAnalytics'

export const PortfolioAnalyticsTracker = () => {
  const pathname = usePathname()

  useEffect(() => {
    void trackVisit(pathname)
  }, [pathname])

  return null
}
