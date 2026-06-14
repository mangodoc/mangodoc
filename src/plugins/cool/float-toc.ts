import Util from '../../util/util'

let observer: IntersectionObserver | null = null

interface TocItem {
  id: string
  text: string
  level: number
  children: TocItem[]
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'heading'
}

function ensureHeadingIds(): HTMLHeadingElement[] {
  const selector = '#container h1, #container h2, #container h3, #container h4, #container h5, #container h6'
  const headings = document.querySelectorAll<HTMLHeadingElement>(selector)
  const seen = new Map<string, number>()
  headings.forEach(h => {
    if (!h.id) {
      let id = slugify(h.textContent || '')
      if (seen.has(id)) {
        const n = seen.get(id)! + 1
        seen.set(id, n)
        id = id + '-' + n
      } else {
        seen.set(id, 0)
      }
      h.id = id
    }
    h.style.scrollMarginTop = '60px'
  })
  return Array.from(headings)
}

function buildTree(headings: HTMLHeadingElement[]): TocItem[] {
  const root: TocItem[] = []
  const stack: TocItem[] = []
  headings.forEach(h => {
    const level = parseInt(h.tagName[1])
    const item: TocItem = {
      id: h.id,
      text: h.textContent || '',
      level,
      children: []
    }
    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop()
    }
    if (!stack.length) {
      root.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }
    stack.push(item)
  })
  return root
}

function renderToc(items: TocItem[]): string {
  if (!items.length) return ''
  let html = '<ul class="cool-toc-list">'
  items.forEach(item => {
    html += `<li class="cool-toc-item">`
    html += `<a href="#${item.id}" class="cool-toc-link" data-toc-id="${item.id}">${item.text}</a>`
    if (item.children.length) {
      html += renderToc(item.children)
    }
    html += '</li>'
  })
  html += '</ul>'
  return html
}

function setActive(id: string, links: NodeListOf<HTMLAnchorElement>) {
  links.forEach(link => {
    link.classList.toggle('cool-toc-active', link.getAttribute('data-toc-id') === id)
  })
}

function findInitialActive(headings: NodeListOf<HTMLElement>): string {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  let closestId = ''
  let closestDist = Infinity
  headings.forEach(h => {
    const dist = h.getBoundingClientRect().top
    if (dist <= 80 && dist > -h.offsetHeight) {
      closestId = h.id
      closestDist = 0
    } else if (dist > 80 && dist < closestDist) {
      closestDist = dist
      closestId = h.id
    }
  })
  return closestId
}

function closeToc() {
  const nav = document.getElementById('cool-toc')
  if (nav) nav.classList.remove('cool-toc-open')
}

function initTocScroll() {
  const nav = document.getElementById('cool-toc')
  if (!nav) return
  const links = nav.querySelectorAll<HTMLAnchorElement>('.cool-toc-link')
  const headings = document.querySelectorAll<HTMLElement>('#container h1, #container h2, #container h3, #container h4, #container h5, #container h6')
  if (!headings.length) return

  const initial = findInitialActive(headings)
  if (initial) setActive(initial, links)

  if (observer) observer.disconnect()
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id, links)
      }
    })
  }, { rootMargin: '-64px 0px -55% 0px', threshold: 0 })

  headings.forEach(h => observer!.observe(h))

  links.forEach(link => {
    link.onclick = e => {
      e.preventDefault()
      closeToc()
      const id = link.getAttribute('data-toc-id')
      if (id) {
        const target = document.getElementById(id)
        if (target) {
          const scroller = document.getElementById('content')
          if (scroller) {
            const targetRect = target.getBoundingClientRect()
            const containerRect = scroller.getBoundingClientRect()
            const offset = targetRect.top - containerRect.top + scroller.scrollTop - 64
            scroller.scrollTo({ top: offset, behavior: 'smooth' })
          }
        }
      }
    }
  })
}

function createToggle() {
  const existing = document.getElementById('cool-toc-toggle')
  if (existing) existing.remove()

  const btn = document.createElement('button')
  btn.id = 'cool-toc-toggle'
  btn.setAttribute('aria-label', '打开目录')
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="currentColor"/><rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/><rect x="2" y="11.5" width="12" height="1.5" rx="0.75" fill="currentColor"/></svg>'

  btn.onclick = () => {
    const nav = document.getElementById('cool-toc')
    if (nav) nav.classList.toggle('cool-toc-open')
  }

  document.body.appendChild(btn)

  document.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (target.closest('#cool-toc') || target.closest('#cool-toc-toggle')) return
    closeToc()
  })
}

export default {
  doneEach() {
    if (Util.getConfig('floatToc') === false) return

    const existing = document.getElementById('cool-toc')
    if (existing) existing.remove()

    const headings = ensureHeadingIds()
    if (headings.length < 2) return

    const tree = buildTree(headings)
    const nav = document.createElement('nav')
    nav.id = 'cool-toc'
    nav.innerHTML = `<div class="cool-toc-header">目录</div>${renderToc(tree)}`

    document.body.appendChild(nav)
    createToggle()

    setTimeout(initTocScroll, 100)
  },
  mounted() {
    if (Util.getConfig('floatToc') === false) return
    const check = setInterval(() => {
      if (document.getElementById('cool-toc')) {
        clearInterval(check)
        initTocScroll()
        createToggle()
      }
    }, 200)
    setTimeout(() => clearInterval(check), 5000)
  }
}
