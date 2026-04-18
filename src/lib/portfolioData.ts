export type TrafficSource = 'direct' | 'social' | 'referral'

export type AnalyticsSummary = {
  contactSubmissions: number
  lastSubmissionAt: string | null
  totalPageViews: number
  totalVisitors: number
  trafficSources: Record<TrafficSource, number>
  weeklyActivity: number[]
}

export type ContactSubmissionPayload = {
  email: string
  message: string
  name: string
  subject: string
}

export const emptyAnalyticsSummary: AnalyticsSummary = {
  contactSubmissions: 0,
  lastSubmissionAt: null,
  totalPageViews: 0,
  totalVisitors: 0,
  trafficSources: {
    direct: 0,
    referral: 0,
    social: 0,
  },
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
}
