export default {
  doneEach() {
    const pres = document.querySelectorAll<HTMLPreElement>('#container pre')
    for (const pre of pres) {
      if (pre.querySelector('.cool-copy-btn')) continue

      const btn = document.createElement('button')
      btn.className = 'cool-copy-btn'
      btn.textContent = '复制'

      btn.addEventListener('click', () => {
        const code = pre.querySelector('code')
        const text = code ? code.textContent || '' : pre.textContent || ''
        const copy = () => {
          btn.textContent = '已复制'
          setTimeout(() => { btn.textContent = '复制' }, 1500)
        }
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(copy).catch(copy)
        } else {
          const ta = document.createElement('textarea')
          ta.value = text
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
          copy()
        }
      })

      pre.appendChild(btn)
    }
  }
}
