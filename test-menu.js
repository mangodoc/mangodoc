const { spawn } = require('child_process');
const http = require('http');

// 1. Start the dev server
const server = spawn('npx', ['webpack-dev-server', '--mode=development', '--config', './build/webpack.config.js'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  cwd: __dirname,
  shell: true
});

let serverOutput = '';
server.stdout.on('data', d => { serverOutput += d.toString(); });
server.stderr.on('data', d => { serverOutput += d.toString(); });

// 2. Wait for server to be ready
function waitForServer(url, maxRetries) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const check = () => {
      http.get(url, res => {
        resolve();
      }).on('error', () => {
        retries++;
        if (retries > maxRetries) reject(new Error('Server did not start'));
        else setTimeout(check, 1000);
      });
    };
    check();
  });
}

async function run() {
  try {
    console.log('Starting dev server...');
    await waitForServer('http://localhost:8081/', 60);
    console.log('Dev server ready');
    
    // 3. Use puppeteer
    const puppeteerPath = require('child_process').execSync('npx puppeteer browsers ls', { encoding: 'utf8' });
    console.log('Puppeteer browsers:', puppeteerPath);
    
    // Try using puppeteer
    try {
      const { execSync } = require('child_process');
      
      // Create a puppeteer script
      execSync(`npx puppeteer script - << 'EOF'
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:8081/ctx/#/guide/cover', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        
        // Check the sidebar highlight
        const activeItem = await page.evaluate(() => {
          const aside = document.getElementById('aside');
          if (!aside) return 'NO ASIDE';
          const active = aside.querySelector('.el-menu-item.is-active');
          if (!active) return 'NO ACTIVE';
          const link = active.querySelector('a.nav-a');
          return {
            index: active.getAttribute('index'),
            href: link ? link.getAttribute('href') : 'NO LINK',
            text: link ? link.textContent.trim() : 'NO TEXT'
          };
        });
        console.log('ACTIVE MENU:', JSON.stringify(activeItem));
        
        // Navigate to another page
        await page.evaluate(() => { window.location.hash = '#/guide/quickstart'; });
        await new Promise(r => setTimeout(r, 2000));
        
        const activeItem2 = await page.evaluate(() => {
          const aside = document.getElementById('aside');
          const active = aside.querySelector('.el-menu-item.is-active');
          if (!active) return 'NO ACTIVE';
          const link = active.querySelector('a.nav-a');
          return {
            index: active.getAttribute('index'),
            href: link ? link.getAttribute('href') : 'NO LINK',
            text: link ? link.textContent.trim() : 'NO TEXT'
          };
        });
        console.log('AFTER NAV ACTIVE:', JSON.stringify(activeItem2));
        
        await browser.close();
      EOF`, { shell: true, timeout: 60000, cwd: __dirname });
      
    } catch(e) {
      console.error('Puppeteer failed:', e.message);
    }
    
  } catch(e) {
    console.error('Test failed:', e.message);
  }
  
  server.kill();
  process.exit(0);
}

run();
