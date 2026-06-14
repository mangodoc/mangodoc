export default {
  doneEach() {
    document.querySelectorAll<HTMLPreElement>('#container pre').forEach(pre => {
      if (pre.getAttribute('data-lang')) return
      const code = pre.querySelector('code')
      if (!code) return
      const m = code.className.match(/(?:^|\s)(language-([^\s:]+))(?::([^\s]+))?/)
      if (m) {
        pre.setAttribute('data-lang', m[2])
        if (m[3]) {
          pre.setAttribute('data-filename', m[3])
          code.className = code.className.replace(m[1] + ':' + m[3], m[1])
        }
      }
    })
  },
  mounted() {
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLPreElement>('#container pre').forEach(pre => {
        if (pre.querySelector('.cool-copy-btn')) return
        const btn = document.createElement('button')
        btn.className = 'cool-copy-btn'
        btn.textContent = '复制'
        btn.onclick = () => {
          const code = pre.querySelector('code')
          const text = code ? code.textContent || '' : pre.textContent || ''
          try {
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.position = 'fixed'
            ta.style.left = '-9999px'
            ta.style.top = '-9999px'
            ta.style.opacity = '0'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
          } catch (_) {}
          btn.textContent = '已复制'
          setTimeout(() => { btn.textContent = '复制' }, 1500)
        }
        pre.appendChild(btn)
      })
    })
    setTimeout(() => {
      document.querySelectorAll<HTMLPreElement>('#container pre code').forEach(code => {
        const pre = code.closest('pre')
        if (!pre || pre.hasAttribute('data-line-numbers')) return
        const html = code.innerHTML
        const lines = html.split('\n')
        if (lines.length <= 1) return
        if (lines[lines.length - 1].trim() === '') lines.pop()
        code.innerHTML = lines.map(line => `<span class="code-line">${line || ' '}</span>`).join('\n')
        pre.setAttribute('data-line-numbers', '')
      })
    }, 400)
  }
}
