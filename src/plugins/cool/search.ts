import MiniSearch from 'minisearch'

interface PageItem {
  id: string
  title: string
  content: string
}

let miniSearch: MiniSearch | null = null
let isIndexReady = false
let searchBox: HTMLElement | null = null
let searchInput: HTMLInputElement | null = null
let resultsEl: HTMLElement | null = null

function hashToUrl(hash: string): string {
  let url = hash.replace(/^#/, '')
  if (url === '/' || url === '') return 'docs/README.md'
  return 'docs' + url + '.md'
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---\n?/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*`~\[\]()>|\\_\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function collectPages(items: any[], result: PageItem[]) {
  for (const item of items) {
    if (item.href && item.title) {
      result.push({ id: item.href, title: item.title, content: '' })
    }
    if (item.children) collectPages(item.children, result)
  }
}

async function buildIndex() {
  try {
    const resp = await fetch('docs/_sidebar.json?t=' + Math.random())
    const sidebar = await resp.json()
    const pages: PageItem[] = []
    collectPages(sidebar, pages)
    if (pages.length === 0) return

    await Promise.all(pages.map(async (page) => {
      try {
        const url = hashToUrl(page.id)
        const resp = await fetch(url + '?t=' + Math.random())
        const md = await resp.text()
        page.content = stripMarkdown(md).substring(0, 10000)
      } catch (_) {}
    }))

    miniSearch = new MiniSearch({
      fields: ['title', 'content'],
      storeFields: ['title', 'id'],
      searchOptions: {
        boost: { title: 3 },
        fuzzy: 0.2,
        prefix: true,
      }
    })

    miniSearch.addAll(pages)
    isIndexReady = true
    console.info('[search] index ready, ' + pages.length + ' pages')
  } catch (e) {
    console.warn('[search] build index failed:', e)
  }
}

function createSearchUI() {
  const header = document.getElementById('header')
  if (!header) return

  searchBox = document.createElement('div')
  searchBox.id = 'cool-search'

  const icon = document.createElement('i')
  icon.className = 'el-icon-search'
  searchBox.appendChild(icon)

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = '搜索文档...'
  input.autocomplete = 'off'
  searchBox.appendChild(input)
  searchInput = input

  const results = document.createElement('div')
  results.className = 'cool-search-results'
  searchBox.appendChild(results)
  resultsEl = results

  const darkToggle = document.getElementById('cool-dark-toggle')
  if (darkToggle) {
    header.insertBefore(searchBox, darkToggle)
  } else {
    header.appendChild(searchBox)
  }

  icon.onclick = (e) => {
    e.stopPropagation()
    searchBox!.classList.toggle('open')
    if (searchBox!.classList.contains('open')) {
      input.focus()
    }
  }

  let timer: any = null
  input.oninput = () => {
    clearTimeout(timer)
    const q = input.value.trim()
    if (q.length < 1) { hideResults(); return }
    timer = setTimeout(() => doSearch(q), 250)
  }

  input.onfocus = () => {
    const q = input.value.trim()
    if (q) doSearch(q)
  }

  document.addEventListener('click', (e) => {
    if (searchBox && !searchBox.contains(e.target as Node)) {
      searchBox.classList.remove('open')
      hideResults()
    }
  })

  input.onkeydown = (e) => {
    if (e.key === 'Escape') {
      searchBox!.classList.remove('open')
      hideResults()
      input.blur()
    }
    if (e.key === 'Enter') {
      const first = results.querySelector('a')
      if (first) { (first as HTMLAnchorElement).click(); hideResults() }
    }
  }
}

function doSearch(query: string) {
  if (!resultsEl) return

  if (!miniSearch || !isIndexReady) {
    resultsEl.innerHTML = '<div class="cool-search-status">索引构建中…</div>'
    resultsEl.style.display = 'block'
    return
  }

  const results = miniSearch.search(query)

  if (results.length === 0) {
    resultsEl.innerHTML = '<div class="cool-search-status">未找到相关结果</div>'
    resultsEl.style.display = 'block'
    return
  }

  const html = results.slice(0, 10).map((r: any) =>
    `<a class="cool-search-result" href="${r.id}">${esc(r.title || '')}</a>`
  ).join('')

  resultsEl.innerHTML = html
  resultsEl.style.display = 'block'
}

function hideResults() {
  if (resultsEl) resultsEl.style.display = 'none'
}

function esc(s: string): string {
  const d = document.createElement('div')
  d.appendChild(document.createTextNode(s))
  return d.innerHTML
}

export default {
  ready() {
    buildIndex()
    waitForHeader()
  }
}

function waitForHeader() {
  if (document.getElementById('header')) {
    createSearchUI()
    return
  }
  let attempts = 0
  const timer = setInterval(() => {
    attempts++
    if (document.getElementById('header')) {
      clearInterval(timer)
      createSearchUI()
    } else if (attempts > 50) {
      clearInterval(timer)
    }
  }, 100)
}
