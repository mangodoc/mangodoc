export default {
  doneEach() {
    document.querySelectorAll<HTMLPreElement>('#container pre').forEach(pre => {
      if (pre.getAttribute('data-lang')) return
      const code = pre.querySelector('code')
      if (!code) return
      const m = code.className.match(/(?:^|\s)language-(\w+)/)
      if (m) pre.setAttribute('data-lang', m[1])
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
  }
}
