#!/usr/bin/env node
/**
 * Sync Feishu website application form members to team.ts
 *
 * Reads the bitable exported JSON, finds applicants not yet in team.ts,
 * downloads their photos, and appends TeamMember entries to the contributors array.
 *
 * Usage:
 *   node scripts/sync-feishu-members.mjs /path/to/records.json
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TEAM_TS = path.join(ROOT, 'src', 'lib', 'i18n', 'constants', 'team.ts')

const jsonPath = process.argv[2] || '/tmp/feishu_members.json'

// Field indices in the bitable record array (matches the export field order)
const IDX_NO = 0
const IDX_TIME = 1
const IDX_BIO = 2
const IDX_ROLE = 3
const IDX_PHOTO = 4
const IDX_SUBMITTER = 5
const IDX_NAME = 6
const IDX_EXTRA_PHOTOS = 7

function normalizeName(name) {
  return String(name || '').trim()
}

function escapeQuote(str) {
  return String(str || '').replace(/'/g, "\\'")
}

function cleanRole(raw) {
  const r = String(raw || '').toLowerCase().replace(/\s+/g, '')
  // Normalize common misspellings first
  if (r.includes('maintainer') || r.includes('founder')) return 'Maintainer'
  if (r.includes('developer') || r.includes('dev')) return 'Developer'
  if (r.includes('designer') || r.includes('ui') || r.includes('ux')) return 'Designer'
  if (/contributor|contributer|ccontributor|ccontributer/.test(r) || r.includes('贡献者') || r.includes('成员') || r.includes('队员') || r.includes('学生') || r.includes('学习') || r.includes('小白') || r.includes('研究生') || r.includes('sponsor')) return 'Contributor'
  if (r.includes('嵌入式')) return '嵌入式开发工程师'
  if (r.includes('机械')) return '机械工程师'
  if (r.includes('电控')) return '电控工程师'
  if (r.includes('视觉')) return '视觉工程师'
  if (r.includes('算法')) return '算法工程师'
  if (r.includes('全栈')) return '全栈开发工程师'
  if (r.includes('产品经理')) return '产品经理'
  if (r.includes('运维')) return '运维工程师'
  if (r.includes('测试')) return '测试工程师'
  if (r.includes('赞助')) return 'Contributor'
  // Keep the original if it is meaningful
  const original = String(raw || '').trim()
  if (original.length > 0 && original.length < 30) {
    return original[0].toUpperCase() + original.slice(1)
  }
  return 'Contributor'
}

function deriveTags(role, bio) {
  const tags = new Set()
  const lowerBio = bio.toLowerCase()
  const lowerRole = role.toLowerCase()

  const keywordMap = [
    ['机械', '机械设计'],
    ['电控', '电控开发'],
    ['嵌入式', '嵌入式开发'],
    ['视觉', '计算机视觉'],
    ['算法', '算法开发'],
    ['3d打印', '3D打印'],
    ['3d', '3D建模'],
    ['建模', '3D建模'],
    ['单片机', '单片机'],
    ['c语言', 'C语言'],
    ['python', 'Python'],
    ['ros', 'ROS'],
    [' unity', 'Unity'],
    ['数据库', '数据库'],
    ['硬件', '硬件设计'],
    ['pcb', 'PCB设计'],
    ['前端', '前端开发'],
    ['后端', '后端开发'],
    ['全栈', '全栈开发'],
    ['java', 'Java'],
    ['javascript', 'JavaScript'],
    ['typescript', 'TypeScript'],
    ['react', 'React'],
    ['vue', 'Vue'],
    ['物联网', '物联网'],
    ['ai', 'AI'],
    ['机器人', '机器人'],
    ['robocon', 'ROBOCON'],
  ]

  tags.add(role)
  for (const [kw, tag] of keywordMap) {
    if (lowerBio.includes(kw) || lowerRole.includes(kw)) tags.add(tag)
  }
  if (tags.size < 3) {
    tags.add('NEC社区')
    tags.add('Contributor')
  }
  return Array.from(tags).slice(0, 6)
}

async function downloadAttachment(fileToken, relOutPath) {
  const cmd = `lark-cli docs +media-download --token "${fileToken}" --output "${relOutPath}"`
  try {
    execSync(cmd, { cwd: ROOT, stdio: 'pipe', timeout: 120000 })
    return true
  } catch (err) {
    console.error(`[download failed] ${fileToken}: ${err.message}`)
    return false
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function getExtFromName(name) {
  const m = String(name).match(/\.([a-zA-Z0-9]+)$/)
  return m ? `.${m[1].toLowerCase()}` : '.jpg'
}

function folderForRole(role) {
  if (role === 'Developer' || role === '嵌入式开发工程师' || role === '全栈开发工程师') return 'developer'
  if (role === 'Designer') return 'designer'
  if (role === 'Maintainer') return 'maintainer'
  return 'contributer'
}

async function main() {
  const raw = JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
  const records = raw.data.data

  const teamText = await fs.readFile(TEAM_TS, 'utf-8')
  const existingNames = new Set(
    Array.from(teamText.matchAll(/name:\s*['"]([^'"]+)['"]/g)).map(m => m[1])
  )

  // Deduplicate by name
  const seen = new Set()
  const applicants = []
  for (const r of records) {
    const submitterName = r[IDX_SUBMITTER] && Array.isArray(r[IDX_SUBMITTER]) && r[IDX_SUBMITTER][0] ? r[IDX_SUBMITTER][0].name : ''
    const name = normalizeName(r[IDX_NAME] || submitterName)
    if (!name || seen.has(name)) continue
    seen.add(name)
    applicants.push({
      name,
      bio: String(r[IDX_BIO] || '').replace(/\n/g, ' ').trim(),
      rawRole: String(r[IDX_ROLE] || '').trim(),
      photos: Array.isArray(r[IDX_PHOTO]) ? r[IDX_PHOTO] : [],
    })
  }

  const missing = applicants.filter(a => !existingNames.has(a.name))

  console.log(`Total applicants: ${applicants.length}`)
  console.log(`Already in team.ts: ${applicants.length - missing.length}`)
  console.log(`Missing members: ${missing.length}`)
  console.log('')

  if (missing.length === 0) {
    console.log('No missing members to add.')
    return
  }

  const entries = []
  for (const a of missing) {
    const role = cleanRole(a.rawRole)
    const folder = folderForRole(role)
    const imageDir = path.join(ROOT, 'src', 'image', folder)
    await ensureDir(imageDir)

    let imageUrl = ''
    if (a.photos.length > 0) {
      const photo = a.photos[0]
      const ext = getExtFromName(photo.name)
      const localImageName = `${a.name}${ext}`
      const localPath = path.join(imageDir, localImageName)
      const relPath = path.relative(ROOT, localPath).replace(/\\/g, '/')
      try {
        await fs.access(localPath)
        console.log(`[exists] ${a.name}: ${localImageName}`)
        imageUrl = `https://cdn.newenergycoder.club/images/${relPath}`
      } catch {
        console.log(`[download] ${a.name}: ${photo.name}`)
        const ok = await downloadAttachment(photo.file_token, relPath)
        if (ok) {
          imageUrl = `https://cdn.newenergycoder.club/images/${relPath}`
        }
      }
    }

    if (!imageUrl) {
      imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(a.name)}`
    }

    const bio = a.bio || `${a.name}，NEC ${role === 'Contributor' ? '贡献者' : role}。`
    const tags = deriveTags(role, bio)

    entries.push({
      name: a.name,
      role,
      bio,
      image: imageUrl,
      tags,
    })
  }

  // Build TypeScript snippet to insert before the closing of contributors array
  const snippet = entries
    .map(e => `  {
    name: '${escapeQuote(e.name)}',
    role: '${escapeQuote(e.role)}',
    bio: '${escapeQuote(e.bio)}',
    image: '${escapeQuote(e.image)}',
    tags: [${e.tags.map(t => `'${escapeQuote(t)}'`).join(', ')}]
  }`)
    .join(',\n')

  // Find the end of contributors array: the last `];` before `export const sponsors`
  const contributorsEnd = Math.max(
    teamText.lastIndexOf('];\n\nexport const sponsors'),
    teamText.lastIndexOf('];\r\n\r\nexport const sponsors')
  )
  if (contributorsEnd === -1) {
    console.error('Could not locate contributors array end in team.ts')
    console.log('\n--- Generated entries (manual insert) ---\n')
    console.log(snippet)
    process.exit(1)
  }

  let before = teamText.slice(0, contributorsEnd)
  const after = teamText.slice(contributorsEnd)
  // Append a comma after the last member object so we can add new entries
  before = before.replace(/}\s*$/, '},')
  const newContent = before + '\n' + snippet + '\n' + after

  await fs.writeFile(TEAM_TS, newContent, 'utf-8')
  console.log(`\nAppended ${entries.length} members to ${path.relative(ROOT, TEAM_TS)}`)
  console.log('Downloaded photos are in:')
  for (const e of entries) {
    const localPath = e.image.replace('https://cdn.newenergycoder.club/images/', '')
    console.log(`  ${localPath}`)
  }
  console.log('\nNext steps:')
  console.log('  1. Upload src/image/{folder}/ photos to CDN at https://cdn.newenergycoder.club/images/src/image/{folder}/')
  console.log('  2. Run pnpm run lint and pnpm run build to verify')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
