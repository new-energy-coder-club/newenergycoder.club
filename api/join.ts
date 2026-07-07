import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * POST /api/join
 *
 * Receives NEC membership application data from the website join form and
 * writes a new record to the configured Feishu (Lark) Bitable.
 *
 * Required environment variables:
 *   FEISHU_APP_ID              - Feishu custom app ID
 *   FEISHU_APP_SECRET          - Feishu custom app secret
 *   FEISHU_JOIN_BASE_APP_TOKEN - Bitable app_token (the Base ID)
 *   FEISHU_JOIN_TABLE_ID       - Bitable table_id
 *   FEISHU_JOIN_FIELD_NAME     - Field name/id for applicant name
 *   FEISHU_JOIN_FIELD_EMAIL    - Field name/id for email
 *   FEISHU_JOIN_FIELD_PHONE    - Field name/id for phone
 *   FEISHU_JOIN_FIELD_ORG      - Field name/id for organization/school
 *   FEISHU_JOIN_FIELD_ROLE     - Field name/id for intended role
 *   FEISHU_JOIN_FIELD_BIO      - Field name/id for self-introduction
 *
 * Optional:
 *   FEISHU_JOIN_FIELD_SOURCE   - Field name/id for source (defaults to not sent)
 */

interface JoinFormData {
  name: string
  email: string
  phone: string
  organization: string
  role: string
  techStack: string[]
  experience: string
  motivation: string
  availability: string
  contribution: string
  expectations: string
}

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

async function getTenantAccessToken(appId: string, appSecret: string): Promise<string> {
  const res = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  })
  const data = await res.json()
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`Feishu auth failed: ${data.msg || JSON.stringify(data)}`)
  }
  return data.tenant_access_token
}

function buildRecord(fields: JoinFormData): Record<string, unknown> {
  const record: Record<string, unknown> = {}

  const set = (envName: string, value: unknown) => {
    const field = process.env[envName]
    if (field && value !== undefined && value !== '') {
      record[field] = value
    }
  }

  set('FEISHU_JOIN_FIELD_NAME', fields.name)
  set('FEISHU_JOIN_FIELD_EMAIL', fields.email)
  set('FEISHU_JOIN_FIELD_PHONE', fields.phone)
  set('FEISHU_JOIN_FIELD_ORG', fields.organization)
  set('FEISHU_JOIN_FIELD_ROLE', fields.role)
  set('FEISHU_JOIN_FIELD_BIO', [
    fields.experience,
    fields.motivation,
    fields.availability,
    fields.contribution,
    fields.expectations,
  ].filter(Boolean).join('\n\n'))
  set('FEISHU_JOIN_FIELD_TECH_STACK', fields.techStack.join(', '))
  set('FEISHU_JOIN_FIELD_SOURCE', '新能源极客俱乐部官网')

  return record
}

async function writeToFeishuBase(record: Record<string, unknown>): Promise<void> {
  const appId = getEnv('FEISHU_APP_ID')
  const appSecret = getEnv('FEISHU_APP_SECRET')
  const appToken = getEnv('FEISHU_JOIN_BASE_APP_TOKEN')
  const tableId = getEnv('FEISHU_JOIN_TABLE_ID')

  const token = await getTenantAccessToken(appId, appSecret)

  const res = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ fields: record }),
    }
  )

  const data = await res.json()
  if (data.code !== 0) {
    throw new Error(`Feishu Bitable write failed: ${data.msg || JSON.stringify(data)}`)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body as JoinFormData

    if (!body.name || !body.email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' })
    }

    const record = buildRecord(body)

    if (Object.keys(record).length === 0) {
      return res.status(500).json({
        success: false,
        error: 'No Feishu field mapping configured. Please set FEISHU_JOIN_FIELD_* environment variables.',
      })
    }

    await writeToFeishuBase(record)

    return res.status(200).json({ success: true, message: 'Application submitted successfully' })
  } catch (error) {
    console.error('[/api/join] error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return res.status(500).json({ success: false, error: message })
  }
}
