'use client'

import type { AnalyticsSummary, ContactSubmissionPayload } from '@/lib/portfolioData'
import { emptyAnalyticsSummary } from '@/lib/portfolioData'

const ANALYTICS_EVENT = 'portfolio:analytics-updated'

const isBrowser = () => typeof window !== 'undefined'

export const notifyAnalyticsUpdated = () => {
  if (!isBrowser()) {
    return
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT))
}

export const subscribeToAnalytics = (listener: () => void) => {
  if (!isBrowser()) {
    return () => undefined
  }

  window.addEventListener(ANALYTICS_EVENT, listener)

  return () => {
    window.removeEventListener(ANALYTICS_EVENT, listener)
  }
}

export const fetchAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  try {
    const response = await fetch('/api/analytics', { cache: 'no-store' })

    if (!response.ok) {
      return emptyAnalyticsSummary
    }

    return (await response.json()) as AnalyticsSummary
  } catch {
    return emptyAnalyticsSummary
  }
}

export const trackVisit = async (pathname: string) => {
  if (!isBrowser()) {
    return
  }

  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pathname,
        referrer: document.referrer,
      }),
    })

    if (response.ok) {
      notifyAnalyticsUpdated()
    }
  } catch {
    // Ignore analytics failures. They should never block navigation.
  }
}

export const submitContactForm = async (payload: ContactSubmissionPayload) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as { error?: string; ok?: boolean }

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? 'Unable to send message.')
  }

  notifyAnalyticsUpdated()
}
