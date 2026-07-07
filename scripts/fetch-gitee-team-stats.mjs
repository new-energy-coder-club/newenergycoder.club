#!/usr/bin/env node
/**
 * Fetch NEC Gitee contributor data and generate team analysis stats.
 *
 * This script aggregates commits across all local Git branches (preferring the
 * local clone to avoid Gitee API rate limits), resolves author aliases, filters
 * platform bots, and writes src/data/team-gitee-stats.json.
 *
 * Usage:
 *   node scripts/fetch-gitee-team-stats.mjs
 *
 * Environment:
 *   GITEE_ACCESS_TOKEN - optional Gitee personal access token for repo metadata
 *                        (stars/forks/etc.). Commit data comes from git.
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_FILE = path.join(ROOT, 'src', 'data', 'team-gitee-stats.json')

// NEC main repository on Gitee
const GITEE_OWNER = 'Darrenpig'
const GITEE_REPO = 'new_energy_coder_club'

// NEC mirror repository on GitHub
const GITHUB_OWNER = 'new-energy-coder-club'
const GITHUB_REPO = 'new_energy_coder_club'
const GITHUB_REMOTE = 'github-project'

// Optional personal access tokens to reduce rate limits on metadata calls.
const GITEE_ACCESS_TOKEN = process.env.GITEE_ACCESS_TOKEN || ''
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || ''

// Platform / bot identities to exclude from human contributor counts.
const BOT_PATTERNS = [
  /^gitee$/i,
  /^github$/i,
  /^administrator$/i,
  /^nec team$/i,
  /^gitee-bot$/i,
  /\[bot\]$/i,
  /bot$/i,
  /^kimi cli$/i,
]

function isBot(name, email = '') {
  const lowerName = name.toLowerCase()
  if (BOT_PATTERNS.some(p => p.test(lowerName))) return true
  if (email.toLowerCase().includes('no-reply@git.oschina.net')) return true
  if (email.toLowerCase().includes('noreply') && lowerName.includes('gitee')) return true
  return false
}

// Map known email addresses / Gitee no-reply user names to canonical names.
// Keys are lower-cased email addresses; values are canonical display names.
const EMAIL_IDENTITY_MAP = {
  '121377489+darrenpig@users.noreply.github.com': 'DarrenPig',
  '22230635@czu.cn': 'DarrenPig',
  '2971134146@qq.com': 'DarrenPig',
  'darrenpig@foxmail.com': 'DarrenPig',
  'm0_74037814@example.com': 'DarrenPig',
  '15032909+lu-wangchun@user.noreply.gitee.com': '卢王淳',
  '1824531269@qq.com': '卢王淳',
  '15601629+peng-keyin@user.noreply.gitee.com': '彭柯尹',
  '14654084+xia-wangxi@user.noreply.gitee.com': '夏汪禧',
  '15125077+yinzihao-pika-pikaqiu@user.noreply.gitee.com': '殷子豪',
  '342297745@qq.com': '吴洛斌',
  '14913760+pony17@user.noreply.gitee.com': 'Pony17',
  '2142088244@qq.com': 'Elowen',
  '15989091+xu-haiting@user.noreply.gitee.com': '徐海婷',
  '15726950+guo--tongtong@user.noreply.gitee.com': '郭童童',
  '14948512+ylt123456789@user.noreply.gitee.com': '杨力滔',
  '1339646058@qq.com': '杨力滔',
  '2107997753@qq.com': '单广志',
  '15613336+bian-leling@user.noreply.gitee.com': '卞乐凌',
  '15735860+lu-yong-jie@user.noreply.gitee.com': '卢永杰',
  '16044497+sunny-poet@user.noreply.gitee.com': '孙诗睿',
  '15613421+jumuwa@user.noreply.gitee.com': '李硕',
  '14565916+aaaxiyan@user.noreply.gitee.com': '杨鑫海',
  '15501436+niu-liangxu@user.noreply.gitee.com': '牛良旭',
  '16587563+xie-qing123@user.noreply.gitee.com': '王欣怡',
  '24020827@czu.cn': '王欣怡',
  '15681921+wang-yuhao-041005@user.noreply.gitee.com': '王于豪',
  '15174317+zheng-shaokai@user.noreply.gitee.com': '郑绍恺',
  '15618199+zzzzqw111@user.noreply.gitee.com': '郑钦文',
  '17217405+butter-granules@user.noreply.gitee.com': '酥油粒',
  '1022846960@qq.com': '韩祺冉',
  '15611307+yuhaoming12138@user.noreply.gitee.com': '余浩铭',
  '17043860+ling-minfei@user.noreply.gitee.com': '凌敏菲',
  '1697934801@qq.com': '凌敏菲',
  '14446840+xu-zihanhan@user.noreply.gitee.com': '许子涵',
  '15519194+wei-cairi@user.noreply.gitee.com': '韦彩日',
  '17236520+hong-jiayue@user.noreply.gitee.com': '洪嘉悦',
  '14450677+ttkytu@user.noreply.gitee.com': 'Hollic',
  '15616973+leo-tianww@user.noreply.gitee.com': 'Leo TianWW',
  '1977003940@qq.com': 'Leo TianWW',
  '15125035+lnn-7@user.noreply.gitee.com': '7.',
  '469858470@qq.com': 'wwzg469',
  '15557734+happyxuzihan@user.noreply.gitee.com': 'xiux',
  '16550782+chh888@user.noreply.gitee.com': 'CHH888',
  '15584885+geyuanli@user.noreply.gitee.com': 'GeyuanLi',
  '15174487+copperandroc@user.noreply.gitee.com': 'Roc大头怪',
  '16590337+wmt10086@user.noreply.gitee.com': 'wmt10086',
  '16592510+yi_wu_yi@user.noreply.gitee.com': '严文颖',
  '16982285+feng-maorong@user.noreply.gitee.com': '冯茂荣',
  '17216889+liu-of-the-little-elm@user.noreply.gitee.com': '刘小榆',
  '16554022+zhang-mengchi@user.noreply.gitee.com': '张孟驰',
  '15613447+xushenhao@user.noreply.gitee.com': '徐沈豪',
  '16592668+wen--yuting@user.noreply.gitee.com': '文钰婷',
  '16001881+guhaileishijinhong@user.noreply.gitee.com': '施双双',
  'bb2145504645@qq.com': '曹越',
  '14212849+zhu-jianchaozhu@user.noreply.gitee.com': '朱建超',
  '16604034+zmxq@user.noreply.gitee.com': '李俊杰',
  '16604031+lijiahana@user.noreply.gitee.com': '李嘉涵',
  '16453020+li-changchangggggg@user.noreply.gitee.com': '李畅畅',
  '17221144+yang-yan-jing@user.noreply.gitee.com': '杨延京',
  '16345339+echea0@user.noreply.gitee.com': '杨彩妮',
  '1870506099@qq.com': '毕卫亭',
  '1802823702@qq.com': '浮生若梦',
  '2927985858@qq.com': '王子楚',
  '15618109+wxjdedizhi@user.noreply.gitee.com': '王湘军',
  '16544989+ba-yi-ming@user.noreply.gitee.com': '白逸鸣',
  '16943734+fanxingxxx@user.noreply.gitee.com': '秦榛',
  '1376905306@qq.com': '罗啸',
  '17088596+luo-xiao-2025@user.noreply.gitee.com': '罗啸',
  '2503631642@qq.com': 'SaNgZi',
  '15619013+xiu-jie-00@user.noreply.gitee.com': 'siu杰00',
  '15619271+ji-shujie@user.noreply.gitee.com': '吉舒洁',
  '16592640+liangwuliu@user.noreply.gitee.com': '哈吉秘',
  '16592676+meng--jie@user.noreply.gitee.com': '孟洁',
  '16592703+yue-tianjun@user.noreply.gitee.com': '岳添俊',
  '16587537+zhj070331@user.noreply.gitee.com': '庄皓钧',
  '3455480283@qq.com': '张奕泽',
  '15197938+ccah-1@user.noreply.gitee.com': '陈家辉',
  '16604030+qiqis-melody@user.noreply.gitee.com': '陈琦',
  '14443780+gu-shuteng@user.noreply.gitee.com': '顾舒腾',
  '2649483629@qq.com': '黄宇雯',
  '1735455740@qq.com': '和尚',
  '2079681080@qq.com': '方圆三',
}

// Extra name-only aliases (case-insensitive). Values are canonical names.
const NAME_ALIAS_MAP = {
  'darrenpig': 'DarrenPig',
  '朱嘉鹏': 'DarrenPig',
  '7': '7.',
  '王于豪041005': '王于豪',
  'ling-minfei': '凌敏菲',
  'jumuwa': '李硕',
  'nana': 'Hollic',
}

function canonicalName(name, email = '') {
  const normalizedEmail = (email || '').toLowerCase().trim()
  if (normalizedEmail && EMAIL_IDENTITY_MAP[normalizedEmail]) {
    return EMAIL_IDENTITY_MAP[normalizedEmail]
  }

  const normalizedName = (name || '').trim()
  const lowerName = normalizedName.toLowerCase()
  if (NAME_ALIAS_MAP[lowerName]) return NAME_ALIAS_MAP[lowerName]

  // Strip numeric Gitee no-reply prefix if the rest matches a known login.
  const noReplyMatch = normalizedEmail.match(/^(\d+)\+([^@]+)@user\.noreply\.gitee\.com$/)
  if (noReplyMatch) {
    const login = noReplyMatch[2].toLowerCase()
    if (NAME_ALIAS_MAP[login]) return NAME_ALIAS_MAP[login]
  }

  return normalizedName || 'Unknown'
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function buildUrl(baseUrl) {
  if (!GITEE_ACCESS_TOKEN) return baseUrl
  if (!baseUrl.includes('gitee.com')) return baseUrl
  const sep = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${sep}access_token=${encodeURIComponent(GITEE_ACCESS_TOKEN)}`
}

async function fetchJson(baseUrl, retries = 3, token = '') {
  let url = baseUrl
  const headers = {
    'User-Agent': 'NEC-Team-Stats-Bot/1.0',
    'Accept': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  } else {
    url = buildUrl(baseUrl)
  }
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers })
    if (res.status === 403) {
      if (i < retries - 1) {
        console.warn(`  403 for ${baseUrl}, waiting 5s and retrying...`)
        await sleep(5000)
        continue
      }
      throw new Error(`API error: ${res.status} ${res.statusText} for ${baseUrl}`)
    }
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText} for ${baseUrl}`)
    }
    return res.json()
  }
  throw new Error(`API error: failed after ${retries} retries for ${baseUrl}`)
}

async function runGit(args, options = {}) {
  const { stdout } = await execFileAsync('git', args, {
    cwd: ROOT,
    maxBuffer: 50 * 1024 * 1024,
    ...options,
  })
  return stdout
}

async function gitIsAvailable() {
  try {
    await runGit(['rev-parse', '--git-dir'])
    return true
  } catch {
    return false
  }
}

async function ensureGitHubRemote() {
  const remotes = await listRemotes()
  if (remotes.includes(GITHUB_REMOTE)) return
  console.log(`  adding GitHub remote ${GITHUB_REMOTE}...`)
  await runGit([
    'remote', 'add', GITHUB_REMOTE,
    `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}.git`,
  ])
}

async function fetchGitRemotes() {
  try {
    await runGit(['fetch', 'gitee'])
  } catch (err) {
    console.warn(`  Could not fetch gitee remote: ${err.message || err}`)
  }
  try {
    await ensureGitHubRemote()
    await runGit(['fetch', GITHUB_REMOTE])
  } catch (err) {
    console.warn(`  Could not fetch GitHub remote: ${err.message || err}`)
  }
}

async function listRemotes() {
  try {
    const stdout = await runGit(['remote'])
    return stdout.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

async function fetchCommitsFromGitRemote(remote = 'local') {
  console.log(`  aggregating commits from ${remote}...`)
  const args = ['log', '--format=%H%x00%an%x00%ae%x00%d']
  if (remote && remote !== 'all-local-refs') {
    args.push(`--remotes=${remote}`)
  } else {
    args.push('--all')
  }
  const stdout = await runGit(args)
  const lines = stdout.split('\n').filter(Boolean)
  const commits = []
  for (const line of lines) {
    const [sha, name, email, refs] = line.split('\0')
    commits.push({ sha, name, email, refs: refs || '', remote })
  }
  console.log(`    -> ${commits.length} raw commits`)
  return commits
}

async function fetchAllCommitsFromGit() {
  const remotes = (await listRemotes()).filter(r =>
    r === 'gitee' || r === GITHUB_REMOTE
  )
  if (remotes.length === 0) {
    console.log('  no tracked remotes found; aggregating from all local refs...')
    return fetchCommitsFromGitRefs('--all', 'all-local-refs')
  }

  const allCommits = []
  for (const remote of remotes) {
    try {
      const commits = await fetchCommitsFromGitRemote(remote)
      allCommits.push(...commits)
    } catch (err) {
      console.warn(`  Could not read remote ${remote}: ${err.message || err}`)
    }
  }
  console.log(`  -> ${allCommits.length} total raw commits from ${remotes.length} remotes`)
  return allCommits
}

async function fetchAllCommitsFromApi(branch = 'master', maxPages = 50) {
  console.log(`  falling back to Gitee API for branch ${branch}...`)
  const commits = []
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}/commits?sha=${encodeURIComponent(branch)}&per_page=100&page=${page}`
    let data
    try {
      data = await fetchJson(url)
    } catch (err) {
      if (String(err).includes('403')) {
        console.warn(`  Stopping ${branch} at page ${page} due to access restriction.`)
        break
      }
      throw err
    }
    if (!Array.isArray(data) || data.length === 0) break
    commits.push(...data.map(c => ({
      sha: c.sha,
      name: c.commit?.author?.name || c.author?.name || 'Unknown',
      email: c.commit?.author?.email || c.author?.email || '',
      refs: '',
    })))
    if (data.length < 100) break
    await sleep(500)
  }
  return commits
}

function aggregateCommits(commits) {
  const byPerson = new Map()
  let botCommits = 0
  const seenShas = new Set()

  for (const c of commits) {
    if (seenShas.has(c.sha)) continue
    seenShas.add(c.sha)

    const { name, email } = c
    if (isBot(name, email)) {
      botCommits++
      continue
    }

    const key = canonicalName(name, email)
    const existing = byPerson.get(key) || {
      name: key,
      contributions: 0,
      emails: new Set(),
      aliases: new Set(),
    }
    existing.contributions++
    if (email) existing.emails.add(email)
    existing.aliases.add(name)
    byPerson.set(key, existing)
  }

  const topContributors = Array.from(byPerson.values())
    .map(c => ({
      name: c.name,
      contributions: c.contributions,
      emails: Array.from(c.emails).sort(),
      aliases: Array.from(c.aliases).sort(),
    }))
    .sort((a, b) => b.contributions - a.contributions)

  return {
    totalCommits: seenShas.size,
    botCommits,
    humanCommits: seenShas.size - botCommits,
    uniqueHumans: byPerson.size,
    topContributors,
  }
}

async function fetchGiteeRepoInfo() {
  return fetchJson(`https://gitee.com/api/v5/repos/${GITEE_OWNER}/${GITEE_REPO}`, 3, GITEE_ACCESS_TOKEN)
}

async function fetchGitHubRepoInfo() {
  return fetchJson(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, 3, GITHUB_ACCESS_TOKEN)
}

async function fetchUserRepos() {
  const url = `https://gitee.com/api/v5/users/${GITEE_OWNER.toLowerCase()}/repos?per_page=100&type=owner`
  const data = await fetchJson(url, 3, GITEE_ACCESS_TOKEN)
  return Array.isArray(data) ? data : []
}

async function readExistingStats() {
  try {
    const existing = await fs.readFile(OUT_FILE, 'utf-8')
    return JSON.parse(existing)
  } catch {
    return null
  }
}

// Fallback NEC-related project list used when the Gitee API is rate-limited.
const FALLBACK_NEC_REPOS = [
  {
    name: 'new_energy_coder_club',
    url: 'https://gitee.com/darrenpig/new_energy_coder_club.git',
    description: 'NEC · New Energy Coder Community\r\nOpen-source engineering community for Robotics × New Energy',
  },
  {
    name: 'newenergycoder.club',
    url: 'https://gitee.com/darrenpig/newenergycoder.club.git',
    description: 'newenergycoder.club',
  },
  {
    name: 'robocon25_proof',
    url: 'https://gitee.com/darrenpig/robocon25_proof.git',
    description: '',
  },
]

async function main() {
  if (!GITEE_ACCESS_TOKEN) {
    console.warn('Warning: GITEE_ACCESS_TOKEN is not set. Gitee repo metadata calls are unauthenticated and may 403.')
  }
  if (!GITHUB_ACCESS_TOKEN) {
    console.warn('Warning: GITHUB_ACCESS_TOKEN is not set. GitHub API may be rate-limited.')
  }

  const existingStats = await readExistingStats()

  try {
    console.log('Fetching NEC contributor data from Gitee + GitHub...')

    let commits
    if (await gitIsAvailable()) {
      await fetchGitRemotes()
      commits = await fetchAllCommitsFromGit()
    } else {
      console.warn('No local git repository found; falling back to Gitee API.')
      commits = await fetchAllCommitsFromApi('master')
    }

    const aggregated = aggregateCommits(commits)

    let giteeRepoInfo = {}
    let githubRepoInfo = {}
    let userRepos = []
    try {
      const results = await Promise.allSettled([
        fetchGiteeRepoInfo(),
        fetchGitHubRepoInfo(),
        fetchUserRepos(),
      ])
      if (results[0].status === 'fulfilled') giteeRepoInfo = results[0].value
      else console.warn(`  Could not refresh Gitee repo metadata: ${results[0].reason?.message || results[0].reason}`)
      if (results[1].status === 'fulfilled') githubRepoInfo = results[1].value
      else console.warn(`  Could not refresh GitHub repo metadata: ${results[1].reason?.message || results[1].reason}`)
      if (results[2].status === 'fulfilled') userRepos = results[2].value
      else console.warn(`  Could not refresh user repos: ${results[2].reason?.message || results[2].reason}`)
    } catch (err) {
      console.warn(`  Could not refresh repo metadata: ${err.message || err}`)
    }

    const necRepos = Array.isArray(userRepos) && userRepos.length > 0
      ? userRepos.filter(r =>
          r.name.toLowerCase().includes('energy') ||
          r.name.toLowerCase().includes('nec') ||
          r.name.toLowerCase().includes('robocon') ||
          r.name.toLowerCase().includes('new_energy')
        )
      : existingStats?.projects?.necRelated || FALLBACK_NEC_REPOS

    const dataSources = ['git']
    if ((await listRemotes()).includes('gitee')) dataSources.push('gitee')
    if ((await listRemotes()).includes(GITHUB_REMOTE)) dataSources.push('github')

    const stats = {
      generatedAt: new Date().toISOString(),
      dataSource: dataSources.join('+'),
      repo: {
        owner: GITEE_OWNER,
        name: GITEE_REPO,
        fullName: giteeRepoInfo.full_name || `${GITEE_OWNER}/${GITEE_REPO}`,
        url: giteeRepoInfo.html_url || `https://gitee.com/${GITEE_OWNER}/${GITEE_REPO}`,
        stars: giteeRepoInfo.stargazers_count ?? existingStats?.repo?.stars ?? 0,
        forks: giteeRepoInfo.forks_count ?? existingStats?.repo?.forks ?? 0,
        watches: giteeRepoInfo.watchers_count ?? existingStats?.repo?.watches ?? 0,
        openIssues: giteeRepoInfo.open_issues_count ?? existingStats?.repo?.openIssues ?? 0,
      },
      githubRepo: {
        owner: GITHUB_OWNER,
        name: GITHUB_REPO,
        fullName: githubRepoInfo.full_name || `${GITHUB_OWNER}/${GITHUB_REPO}`,
        url: githubRepoInfo.html_url || `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`,
        stars: githubRepoInfo.stargazers_count ?? existingStats?.githubRepo?.stars ?? 0,
        forks: githubRepoInfo.forks_count ?? existingStats?.githubRepo?.forks ?? 0,
        openIssues: githubRepoInfo.open_issues_count ?? existingStats?.githubRepo?.openIssues ?? 0,
      },
      commits: {
        total: aggregated.totalCommits,
        bot: aggregated.botCommits,
        human: aggregated.humanCommits,
      },
      contributors: {
        uniqueHumans: aggregated.uniqueHumans,
        top: aggregated.topContributors.slice(0, 15),
      },
      projects: {
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

    console.log('\nNEC team stats generated:')
    console.log(`  Data source: ${stats.dataSource}`)
    console.log(`  Total commits (deduplicated): ${stats.commits.total}`)
    console.log(`  Bot commits: ${stats.commits.bot}`)
    console.log(`  Human commits: ${stats.commits.human}`)
    console.log(`  Unique human contributors: ${stats.contributors.uniqueHumans}`)
    console.log(`  NEC-related projects: ${stats.projects.total}`)
    console.log(`\nWritten to: ${path.relative(ROOT, OUT_FILE)}`)
    console.log('\nNext steps:')
    console.log('  1. The homepage HeroSection and TeamPage read from this JSON.')
    console.log('  2. Run pnpm run build to verify.')
  } catch (err) {
    console.error('\nFailed to fetch fresh NEC stats:', err.message || err)
    if (existingStats) {
      console.log('\nPreserved existing stats file. To refresh with API metadata:')
      console.log('  export GITEE_ACCESS_TOKEN=<your_gitee_token>')
      console.log('  export GITHUB_ACCESS_TOKEN=<your_github_token>')
      console.log('  node scripts/fetch-gitee-team-stats.mjs')
    }
    process.exit(1)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
