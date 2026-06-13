import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 2000 });

  await page.goto('http://localhost:8083/ctx/#/guide/quickstart', {
    waitUntil: 'networkidle2', timeout: 20000,
  });
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({ path: 'test-style.png', fullPage: true });

  const info = await page.evaluate(() => {
    const container = document.getElementById('container');
    if (!container) return 'NO_CONTAINER';
    return Array.from(container.children).map((el, i) => {
      const style = window.getComputedStyle(el);
      return {
        idx: i,
        tag: el.tagName,
        cls: el.className,
        text: (el.textContent || '').trim().substring(0, 40),
        css: {
          fontSize: style.fontSize,
          color: style.color,
          textAlign: style.textAlign,
          margin: style.margin,
          padding: style.padding,
          fontFamily: style.fontFamily,
          background: style.background,
          borderTop: style.borderTop,
        },
        innerHtml: el.innerHTML.substring(0, 200),
      };
    });
  });

  for (const c of info) {
    if (c.idx >= 10) {
      console.log(`[${c.idx}] ${c.tag} .${c.cls} "${c.text}"`);
      console.log(`    css:`, JSON.stringify(c.css));
      console.log(`    html: ${c.innerHtml}`);
    }
  }

  await browser.close();
})();
