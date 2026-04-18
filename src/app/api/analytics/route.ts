import { cookies } from 'next/headers'
import { getAnalyticsSummary, recordVisit } from '@/lib/server/portfolioStore'
import type { TrafficSource } from '@/lib/portfolioData'

export const dynamic = 'force-dynamic'

const VISITOR_COOKIE = 'portfolio_visitor_id'
const SOCIAL_REFERRERS = ['facebook', 'instagram', 'linkedin', 'tiktok', 'twitter', 'x.com', 'whatsapp', 'youtube']

const createVisitorId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `visitor-${Date.now()}`
}

const classifyTrafficSource = (referrer: string): TrafficSource => {
  if (!referrer) {
    return 'direct'
  }

  const normalized = referrer.toLowerCase()

  if (SOCIAL_REFERRERS.some((source) => normalized.includes(source))) {
    return 'social'
  }

  return 'referral'
}

export async function GET() {
  const summary = await getAnalyticsSummary()
  return Response.json(summary)
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const visitorCookie = cookieStore.get(VISITOR_COOKIE)
  const visitorId = visitorCookie?.value ?? createVisitorId()
  const payload = await request.json().catch(() => ({})) as { pathname?: string; referrer?: string }
  const referrer = typeof payload.referrer === 'string' ? payload.referrer : ''
  const trafficSource = classifyTrafficSource(referrer)

  await recordVisit(visitorId, trafficSource)

  if (!visitorCookie) {
    cookieStore.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    })
  }

  return Response.json({ ok: true })
}
