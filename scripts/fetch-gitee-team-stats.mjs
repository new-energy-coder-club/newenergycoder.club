#!/usr/bin/env node
/**
 * Fetch Gitee contributor data and generate team analysis stats.
 *
 * Fetches contributors from the main NEC Gitee repository, filters platform
 * bots, aggregates contributions by real person, and writes a JSON data file
 * consumed by the homepage.
 *
 * Usage:
 *   node scripts/fetch-gitee-team-stats.mjs
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_FILE = path.join(ROOT, 'src', 'data', 'team-gitee-stats.json')

// NEC main repository on Gitee
const GITEE_OWNER = 'Darrenpig'
const GITEE_REPO = 'new_energy_coder_club'

// Platform / bot identities to exclude from human contributor counts
const BOT_NAMES = new Set([
  'Gitee',
  'GitHub',
  'Administrator',
])

// Emails / name patterns that belong to the same person
const IDENTITY_ALIASES = {
  'DarrenPig': ['DarrenPig'],
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Gitee API error: ${res.status} ${res.statusText} for ${url}`)
  }
  return res.json()
}

function normalizeContributorName(name) {
  // Gitee sometimes returns garbled names for Chinese characters; try to keep
  // the API name as-is and fall back to the email local-part if it looks bogus.
  if (typeof name !== 'string' || !name.trim()) return 'Unknown'
  return name.trim()
}

function isBot(contributor) {
  if (BOT_NAMES.has(contributor.name)) return true
  const email = (contributor.email || '').toLowerCase()
  if (email.includes('@example.com') && contributor.name === 'Administrator') return true
  return false
}

async function fetchContributors() {
  const url = `https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/contributors?per_page=100`
  const data = await fetchJson(url)
  if (!Array.isArray(data)) {
    throw new Error('Unexpected Gitee contributors response')
  }
  return data.map(c => ({
    name: normalizeContributorName(c.name),
    email: c.email || '',
    contributions: Number(c.contributions) || 0,
  }))
}

async function fetchRepoInfo() {
  const url = `https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}`
  return fetchJson(url)
}

async function fetchUserRepos() {
  const url = `https://gitee.com/api/v5/users/${GITEE_OWNER.toLowerCase()}/repos?per_page=100&type=owner`
  const data = await fetchJson(url)
  if (!Array.isArray(data)) return []
  return data
}

function aggregateContributors(contributors) {
  const allTotal = contributors.reduce((sum, c) => sum + c.contributions, 0)
  const humans = contributors.filter(c => !isBot(c))
  const humanTotal = humans.reduce((sum, c) => sum + c.contributions, 0)

  // Aggregate by normalized human identity. For now we trust the displayed name
  // except for known aliases.
  const byName = new Map()
  for (const c of humans) {
    let key = c.name
    for (const [canonical, aliases] of Object.entries(IDENTITY_ALIASES)) {
      if (aliases.includes(c.name)) key = canonical
    }
    const existing = byName.get(key) || { name: key, contributions: 0, emails: new Set() }
    existing.contributions += c.contributions
    if (c.email) existing.emails.add(c.email)
    byName.set(key, existing)
  }

  const topContributors = Array.from(byName.values())
    .map(c => ({ name: c.name, contributions: c.contributions }))
    .sort((a, b) => b.contributions - a.contributions)

  return {
    allTotal,
    humanTotal,
    uniqueHumans: byName.size,
    topContributors,
  }
}

async function main() {
  console.log('Fetching Gitee contributor data...')
  const [contributors, repoInfo, userRepos] = await Promise.all([
    fetchContributors(),
    fetchRepoInfo(),
    fetchUserRepos(),
  ])

  const aggregated = aggregateContributors(contributors)

  // Count NEC-related public repos by the owner
  const necRepos = userRepos.filter(r =>
    r.name.toLowerCase().includes('energy') ||
    r.name.toLowerCase().includes('nec') ||
    r.name.toLowerCase().includes('robocon') ||
    r.name.toLowerCase().includes('new_energy')
  )

  const stats = {
    generatedAt: new Date().toISOString(),
    repo: {
      owner: GITEE_OWNER,
      name: GITEE_REPO,
      fullName: repoInfo.full_name || `${GITEE_OWNER}/${GITEE_REPO}`,
      url: repoInfo.html_url || `https://gitee.com/${GITEE_OWNER}/${GITEE_REPO}`,
      stars: repoInfo.stargazers_count || 0,
      forks: repoInfo.forks_count || 0,
      watches: repoInfo.watchers_count || 0,
      openIssues: repoInfo.open_issues_count || 0,
    },
    commits: {
      total: aggregated.allTotal,
      human: aggregated.humanTotal,
    },
    contributors: {
      totalOnGitee: contributors.length,
      humans: aggregated.uniqueHumans,
      top: aggregated.topContributors.slice(0, 10),
    },
    projects: {
      // Main NEC repo + NEC-related public repos owned by the account
      total: 1 + necRepos.length,
      necRelated: necRepos.map(r => ({
        name: r.name,
        url: r.html_url,
        description: r.description || '',
      })),
    },
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true })
  await fs.writeFile(OUT_FILE, JSON.stringify(stats, null, 2) + '\n', 'utf-8')

  console.log('\nGitee team stats generated:')
  console.log(`  Total commits: ${stats.commits.total}`)
  console.log(`  Human commits: ${stats.commits.human}`)
  console.log(`  Gitee contributor entries: ${stats.contributors.totalOnGitee}`)
  console.log(`  Unique human contributors: ${stats.contributors.humans}`)
  console.log(`  NEC-related projects: ${stats.projects.total}`)
  console.log(`\nWritten to: ${path.relative(ROOT, OUT_FILE)}`)
  console.log('\nNext steps:')
  console.log('  1. The homepage HeroSection reads commits from this JSON.')
  console.log('  2. Run pnpm run build to verify.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
