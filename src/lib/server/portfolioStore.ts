import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { AnalyticsSummary, ContactSubmissionPayload, TrafficSource } from '@/lib/portfolioData'
import { emptyAnalyticsSummary } from '@/lib/portfolioData'

type AnalyticsStore = {
  contactSubmissions: number
  dailyPageViews: Record<string, number>
  lastSubmissionAt: string | null
  totalPageViews: number
  totalVisitors: number
  trafficSources: Record<TrafficSource, number>
  visitorIds: string[]
}

type ContactSubmissionRecord = ContactSubmissionPayload & {
  createdAt: string
  ipAddress: string | null
  userAgent: string | null
}

const dataDirectory = path.join(process.cwd(), 'data')
const analyticsFilePath = path.join(dataDirectory, 'analytics.json')
const submissionsFilePath = path.join(dataDirectory, 'contact-submissions.json')

let analyticsWriteQueue = Promise.resolve()
let submissionsWriteQueue = Promise.resolve()

const todayKey = (date = new Date()) => date.toISOString().slice(0, 10)

const createDefaultAnalyticsStore = (): AnalyticsStore => ({
  contactSubmissions: 0,
  dailyPageViews: {},
  lastSubmissionAt: null,
  totalPageViews: 0,
  totalVisitors: 0,
  trafficSources: {
    direct: 0,
    referral: 0,
    social: 0,
  },
  visitorIds: [],
})

const ensureFile = async <T>(filePath: string, fallback: T) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })

  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf8')
  }
}

const readJsonFile = async <T>(filePath: string, fallback: T): Promise<T> => {
  await ensureFile(filePath, fallback)

  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

const withWriteQueue = async <T>(
  queueType: 'analytics' | 'submissions',
  handler: () => Promise<T>
) => {
  const currentQueue = queueType === 'analytics' ? analyticsWriteQueue : submissionsWriteQueue
  const nextQueue = currentQueue.then(handler, handler)

  if (queueType === 'analytics') {
    analyticsWriteQueue = nextQueue.then(() => undefined, () => undefined)
  } else {
    submissionsWriteQueue = nextQueue.then(() => undefined, () => undefined)
  }

  return nextQueue
}

const sanitizeAnalyticsStore = (value: unknown): AnalyticsStore => {
  if (!value || typeof value !== 'object') {
    return createDefaultAnalyticsStore()
  }

  const fallback = createDefaultAnalyticsStore()
  const store = value as Partial<AnalyticsStore>

  return {
    contactSubmissions: typeof store.contactSubmissions === 'number' ? store.contactSubmissions : 0,
    dailyPageViews: typeof store.dailyPageViews === 'object' && store.dailyPageViews ? store.dailyPageViews : {},
    lastSubmissionAt: typeof store.lastSubmissionAt === 'string' || store.lastSubmissionAt === null ? store.lastSubmissionAt : null,
    totalPageViews: typeof store.totalPageViews === 'number' ? store.totalPageViews : 0,
    totalVisitors: typeof store.totalVisitors === 'number' ? store.totalVisitors : 0,
    trafficSources: {
      direct: typeof store.trafficSources?.direct === 'number' ? store.trafficSources.direct : 0,
      referral: typeof store.trafficSources?.referral === 'number' ? store.trafficSources.referral : 0,
      social: typeof store.trafficSources?.social === 'number' ? store.trafficSources.social : 0,
    },
    visitorIds: Array.isArray(store.visitorIds)
      ? store.visitorIds.filter((value): value is string => typeof value === 'string')
      : fallback.visitorIds,
  }
}

const buildWeeklyActivity = (dailyPageViews: Record<string, number>) => {
  const activity: number[] = []

  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - index)
    activity.push(dailyPageViews[todayKey(date)] ?? 0)
  }

  return activity
}

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const store = sanitizeAnalyticsStore(await readJsonFile(analyticsFilePath, createDefaultAnalyticsStore()))

  return {
    ...emptyAnalyticsSummary,
    contactSubmissions: store.contactSubmissions,
    lastSubmissionAt: store.lastSubmissionAt,
    totalPageViews: store.totalPageViews,
    totalVisitors: store.totalVisitors,
    trafficSources: store.trafficSources,
    weeklyActivity: buildWeeklyActivity(store.dailyPageViews),
  }
}

export const recordVisit = async (visitorId: string, trafficSource: TrafficSource) => {
  await withWriteQueue('analytics', async () => {
    const store = sanitizeAnalyticsStore(await readJsonFile(analyticsFilePath, createDefaultAnalyticsStore()))
    const today = todayKey()

    store.totalPageViews += 1
    store.dailyPageViews[today] = (store.dailyPageViews[today] ?? 0) + 1
    store.trafficSources[trafficSource] += 1

    if (!store.visitorIds.includes(visitorId)) {
      store.visitorIds.push(visitorId)
      store.totalVisitors += 1
    }

    await fs.writeFile(analyticsFilePath, JSON.stringify(store, null, 2), 'utf8')
  })
}

export const recordContactSubmission = async (submission: ContactSubmissionRecord) => {
  await withWriteQueue('submissions', async () => {
    const submissions = await readJsonFile<ContactSubmissionRecord[]>(submissionsFilePath, [])
    submissions.unshift(submission)
    await fs.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2), 'utf8')
  })

  await withWriteQueue('analytics', async () => {
    const store = sanitizeAnalyticsStore(await readJsonFile(analyticsFilePath, createDefaultAnalyticsStore()))
    store.contactSubmissions += 1
    store.lastSubmissionAt = submission.createdAt
    await fs.writeFile(analyticsFilePath, JSON.stringify(store, null, 2), 'utf8')
  })
}
