import { recordContactSubmission } from '@/lib/server/portfolioStore'
import type { ContactSubmissionPayload } from '@/lib/portfolioData'

export const dynamic = 'force-dynamic'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validatePayload = (payload: Partial<ContactSubmissionPayload>) => {
  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const subject = payload.subject?.trim() ?? ''
  const message = payload.message?.trim() ?? ''

  if (!name) {
    return { error: 'Name is required.' }
  }

  if (!emailPattern.test(email)) {
    return { error: 'A valid email address is required.' }
  }

  if (!subject) {
    return { error: 'Subject is required.' }
  }

  if (message.length < 20) {
    return { error: 'Message must contain at least 20 characters.' }
  }

  return {
    value: {
      email,
      message,
      name,
      subject,
    },
  }
}

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (!forwardedFor) {
    return null
  }

  return forwardedFor.split(',')[0]?.trim() || null
}

export async function POST(request: Request) {
  let payload: Partial<ContactSubmissionPayload>

  try {
    payload = (await request.json()) as Partial<ContactSubmissionPayload>
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const result = validatePayload(payload)

  if ('error' in result) {
    return Response.json({ error: result.error }, { status: 400 })
  }

  await recordContactSubmission({
    ...result.value,
    createdAt: new Date().toISOString(),
    ipAddress: getClientIp(request),
    userAgent: request.headers.get('user-agent'),
  })

  return Response.json({ ok: true })
}
