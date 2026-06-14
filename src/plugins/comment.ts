import Util from "../util/util"

interface CommentData {
  author: string
  date: string
  content: string
}

let commentContainer: HTMLElement | null = null
let cachedComments: CommentData[] = []

function parseRepo(repo: string): { owner: string; repo: string } | null {
  if (!repo) return null
  const m = repo.match(/github\.com\/([^/]+)\/([^/\s#?]+?)(?:\.git|\/|$)/)
  if (m) return { owner: m[1], repo: m[2] }
  return null
}

function getPagePath(): string {
  const hash = window.location.hash.replace(/^#\//, '').replace(/\/$/, '') || 'README'
  return hash
}

function getCommentDir(pagePath: string): string {
  return `docs/_comments/${pagePath}`
}

function parseCommentFile(content: string, filename: string): CommentData {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (fmMatch) {
    const meta = fmMatch[1]
    const body = fmMatch[2].trim()
    const author = meta.match(/^author:\s*(.+)$/m)?.[1] || 'Anonymous'
    const date = meta.match(/^date:\s*(.+)$/m)?.[1] || filename.replace(/\.md$/, '')
    return { author, date, content: body }
  }
  return {
    author: 'Anonymous',
    date: filename.replace(/\.md$/, ''),
    content: content.trim()
  }
}

function cacheKey(pagePath: string): string {
  return 'cool-comments-' + pagePath
}

function readCache(pagePath: string): CommentData[] | null {
  const raw = localStorage.getItem(cacheKey(pagePath))
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.ts < 300000) return parsed.data
  } catch (_) {}
  return null
}

function writeCache(pagePath: string, data: CommentData[]) {
  localStorage.setItem(cacheKey(pagePath), JSON.stringify({ ts: Date.now(), data }))
}

async function fetchComments(owner: string, repo: string, pagePath: string, token?: string): Promise<CommentData[]> {
  const cached = readCache(pagePath)
  if (cached) {
    cachedComments = cached
    return cached
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${getCommentDir(pagePath)}`
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
  try {
    const resp = await fetch(url, { headers })
    if (resp.status === 404) {
      cachedComments = []
      writeCache(pagePath, [])
      return []
    }
    if (!resp.ok) throw new Error('status ' + resp.status)
    const files: any[] = await resp.json()
    const mdFiles = files.filter(f => f.name.endsWith('.md'))
    const comments = (
      await Promise.all(
        mdFiles.map(async f => {
          try {
            const rawResp = await fetch(f.download_url)
            const raw = await rawResp.text()
            return parseCommentFile(raw, f.name)
          } catch (_) { return null }
        })
      )
    ).filter(Boolean) as CommentData[]
    comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    cachedComments = comments
    writeCache(pagePath, comments)
    return comments
  } catch (e) {
    console.warn('[comment] fetch error:', e)
    return cachedComments
  }
}

async function postComment(owner: string, repo: string, pagePath: string, author: string, content: string, token: string): Promise<string | null> {
  const ts = Date.now()
  const rand = Math.random().toString(36).slice(2, 6)
  const filename = `${ts}-${rand}.md`
  const path = `${getCommentDir(pagePath)}/${filename}`

  const body = `---\nauthor: ${author}\ndate: ${new Date(ts).toISOString()}\n---\n\n${content}`
  const encoded = btoa(unescape(encodeURIComponent(body)))

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  try {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `docs: add comment on ${pagePath}`,
        content: encoded
      })
    })
    if (!resp.ok) {
      let msg = `GitHub API ${resp.status}`
      try { const err = await resp.json(); if (err.message) msg += ': ' + err.message } catch (_) {}
      console.warn('[comment] post error:', msg)
      return msg
    }
    return null
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.warn('[comment] post error:', msg)
    return msg
  }
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderComments(comments: CommentData[]) {
  if (!commentContainer) return
  const header = commentContainer.querySelector('.cool-comments-header')
  if (header) header.textContent = `💬 评论 (${comments.length})`

  const list = commentContainer.querySelector('.cool-comments-list')
  if (!list) return

  if (!comments.length) {
    list.innerHTML = '<div class="cool-comments-empty">暂无评论，来写第一条吧</div>'
    return
  }

  list.innerHTML = comments.map(c => {
    const date = new Date(c.date)
    const dateStr = isNaN(date.getTime()) ? c.date : date.toLocaleDateString('zh-CN')
    const html = Util.md2html(c.content)
    return `
      <div class="cool-comment-item">
        <div class="cool-comment-meta">
          <span class="cool-comment-author">${esc(c.author)}</span>
          <span class="cool-comment-date">${dateStr}</span>
        </div>
        <div class="cool-comment-body">${html}</div>
      </div>
    `
  }).join('')
}

function addLocalComment(pagePath: string, author: string, content: string) {
  const comment: CommentData = {
    author,
    date: new Date().toISOString(),
    content
  }
  cachedComments.push(comment)
  writeCache(pagePath, cachedComments)
  renderComments(cachedComments)
}

async function loadComments(owner: string, repo: string, pagePath: string, token?: string) {
  const comments = await fetchComments(owner, repo, pagePath, token)
  renderComments(comments)
}

function initCommentUI(owner: string, repo: string, pagePath: string, token?: string) {
  const existing = document.getElementById('cool-comments')
  if (existing) existing.remove()

  const hasToken = typeof token === 'string' && token.length > 0

  const container = document.createElement('div')
  container.id = 'cool-comments'
  container.className = 'cool-comments'
  container.innerHTML = `
    <div class="cool-comments-header">💬 评论</div>
    <div class="cool-comments-list"></div>
    ${hasToken ? `
    <div class="cool-comments-form">
      <input class="cool-comments-input" id="cool-comment-author" placeholder="昵称（选填）" maxlength="30" />
      <textarea class="cool-comments-textarea" id="cool-comment-content" placeholder="写下评论… 支持 Markdown" rows="3"></textarea>
      <button class="cool-comments-submit" id="cool-comment-submit">发表评论</button>
      <div class="cool-comments-status" id="cool-comment-status"></div>
    </div>` : ''}
  `

  document.getElementById('container')?.appendChild(container)
  commentContainer = container

  loadComments(owner, repo, pagePath, token)

  if (!hasToken) return

  const submitBtn = container.querySelector('#cool-comment-submit') as HTMLButtonElement
  const authorInput = container.querySelector('#cool-comment-author') as HTMLInputElement
  const contentInput = container.querySelector('#cool-comment-content') as HTMLTextAreaElement
  const statusEl = container.querySelector('#cool-comment-status') as HTMLElement

  submitBtn.onclick = async () => {
    const author = authorInput.value.trim() || 'Anonymous'
    const content = contentInput.value.trim()
    if (!content) {
      statusEl.textContent = '请填写评论内容'
      statusEl.className = 'cool-comments-status error'
      return
    }
    submitBtn.disabled = true
    submitBtn.textContent = '提交中…'
    statusEl.textContent = ''
    const err = await postComment(owner, repo, pagePath, author, content, token)
    if (err === null) {
      contentInput.value = ''
      statusEl.textContent = '评论已提交'
      statusEl.className = 'cool-comments-status success'
      addLocalComment(pagePath, author, content)
    } else {
      statusEl.textContent = '提交失败: ' + err
      statusEl.className = 'cool-comments-status error'
    }
    submitBtn.disabled = false
    submitBtn.textContent = '发表评论'
  }
}

export default {
  doneEach() {
    const enabled = window.$pageconfig?.comment
    if (enabled === false) return

    const commentConfig = Util.getConfig('comment')
    if (!commentConfig) return

    const repoUrl = window.$mangodoc.repo
    const parsed = parseRepo(repoUrl)
    if (!parsed) return

    const pagePath = getPagePath()
    const token = typeof commentConfig === 'string' ? commentConfig : undefined

    setTimeout(() => initCommentUI(parsed.owner, parsed.repo, pagePath, token), 50)
  }
}
