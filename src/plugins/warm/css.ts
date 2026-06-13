import Util from "../../util/util"

export default {
    ready(){
      injectLandscape();
      injectStyles();
    }
}

function injectLandscape() {
  let themeColor = Util.getConfig("themeColor") || "#C8785A";

  // Remove existing landscape layers if any
  document.querySelectorAll('.shanshui-layer').forEach(el => el.remove());

  // Create landscape container
  const container = document.createElement('div');
  container.id = 'shanshui-bg';
  container.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: -2; overflow: hidden;
    pointer-events: none;
  `;

  // Sky gradient
  const sky = document.createElement('div');
  sky.style.cssText = `
    position: absolute; inset: 0;
    background: linear-gradient(180deg, #D4E4F7 0%, #E8F0FE 40%, #F0F4F8 70%, #E8EDE4 100%);
  `;
  container.appendChild(sky);

  // Far mountains
  const far = document.createElement('div');
  far.className = 'shanshui-layer';
  far.style.cssText = `
    position: absolute; bottom: 18%; left: -5%; right: -5%;
    height: 35%; z-index: 0;
    background: linear-gradient(180deg, transparent 0%, #6B8F71 40%, #5A7D5E 100%);
    clip-path: polygon(0% 100%, 2% 55%, 8% 65%, 12% 45%, 18% 50%, 22% 35%, 28% 42%, 32% 28%, 38% 38%, 45% 25%, 50% 32%, 55% 20%, 62% 30%, 68% 22%, 75% 35%, 80% 28%, 85% 38%, 90% 30%, 95% 40%, 100% 50%, 100% 100%);
    filter: blur(6px);
    opacity: 0.4;
  `;
  container.appendChild(far);

  // Middle mountains
  const mid = document.createElement('div');
  mid.className = 'shanshui-layer';
  mid.style.cssText = `
    position: absolute; bottom: 12%; left: -3%; right: -3%;
    height: 30%; z-index: 1;
    background: linear-gradient(180deg, transparent 0%, #4A6741 50%, #3D5A3F 100%);
    clip-path: polygon(0% 100%, 5% 60%, 10% 50%, 18% 55%, 24% 40%, 30% 48%, 35% 35%, 42% 42%, 48% 30%, 55% 38%, 60% 25%, 68% 35%, 75% 28%, 82% 38%, 88% 32%, 93% 42%, 100% 48%, 100% 100%);
    filter: blur(3px);
    opacity: 0.55;
  `;
  container.appendChild(mid);

  // Near mountain (right side, prominent)
  const near = document.createElement('div');
  near.className = 'shanshui-layer';
  near.style.cssText = `
    position: absolute; bottom: 8%; right: 0;
    width: 45%; height: 28%; z-index: 2;
    background: linear-gradient(180deg, transparent 0%, #2E4A32 30%, #1E3321 100%);
    clip-path: polygon(0% 100%, 5% 70%, 12% 55%, 20% 60%, 28% 45%, 35% 50%, 40% 35%, 50% 42%, 55% 30%, 65% 38%, 72% 28%, 80% 35%, 88% 40%, 95% 50%, 100% 60%, 100% 100%);
    filter: blur(1px);
    opacity: 0.7;
  `;
  container.appendChild(near);

  // Small pine trees on near mountain
  const trees = document.createElement('div');
  trees.className = 'shanshui-layer';
  trees.style.cssText = `
    position: absolute; bottom: 8%; right: 5%;
    width: 35%; height: 15%; z-index: 3;
    opacity: 0.5;
  `;

  // Tree silhouettes using pseudo elements via canvas-like divs
  const treePositions = [
    { left: '5%', bottom: '30%', h: '60%', w: '3%' },
    { left: '12%', bottom: '25%', h: '70%', w: '4%' },
    { left: '20%', bottom: '35%', h: '55%', w: '3%' },
    { left: '28%', bottom: '20%', h: '75%', w: '4%' },
    { left: '38%', bottom: '30%', h: '60%', w: '3%' },
    { left: '45%', bottom: '22%', h: '68%', w: '3.5%' },
    { left: '55%', bottom: '35%', h: '55%', w: '3%' },
    { left: '62%', bottom: '28%', h: '62%', w: '4%' },
    { left: '72%', bottom: '32%', h: '58%', w: '3%' },
    { left: '80%', bottom: '25%', h: '65%', w: '3.5%' },
    { left: '88%', bottom: '38%', h: '52%', w: '3%' },
  ];

  for (const t of treePositions) {
    const tree = document.createElement('div');
    tree.style.cssText = `
      position: absolute; left: ${t.left}; bottom: ${t.bottom};
      width: ${t.w}; height: ${t.h};
      background: #1A2E1D;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      border-radius: 2px 2px 0 0;
    `;
    trees.appendChild(tree);
  }
  container.appendChild(trees);

  // Water surface
  const water = document.createElement('div');
  water.className = 'shanshui-layer';
  water.style.cssText = `
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 10%; z-index: 4;
    background: linear-gradient(180deg, #7BA7BC 0%, #6B97AC 50%, #5A879C 100%);
    opacity: 0.6;
  `;
  container.appendChild(water);

  // Water wave animation
  const wave1 = document.createElement('div');
  wave1.className = 'shanshui-layer';
  wave1.style.cssText = `
    position: absolute; bottom: 10%; left: 0; right: 0;
    height: 20px; z-index: 5;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 20'%3E%3Cpath d='M0,10 Q75,0 150,10 Q225,20 300,10 Q375,0 450,10 Q525,20 600,10 Q675,0 750,10 Q825,20 900,10 Q975,0 1050,10 Q1125,20 1200,10 L1200,20 L0,20 Z' fill='%237BA7BC55'/%3E%3C/svg%3E") repeat-x;
    background-size: 600px 20px;
    animation: shanshui-wave 4s ease-in-out infinite;
    opacity: 0.5;
  `;
  container.appendChild(wave1);

  const wave2 = document.createElement('div');
  wave2.className = 'shanshui-layer';
  wave2.style.cssText = `
    position: absolute; bottom: 9%; left: 0; right: 0;
    height: 15px; z-index: 5;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 15'%3E%3Cpath d='M0,7 Q100,0 200,7 Q300,14 400,7 Q500,0 600,7 Q700,14 800,7 Q900,0 1000,7 Q1100,14 1200,7 L1200,15 L0,15 Z' fill='%236B97AC44'/%3E%3C/svg%3E") repeat-x;
    background-size: 400px 15px;
    animation: shanshui-wave 3s ease-in-out infinite reverse;
    opacity: 0.35;
  `;
  container.appendChild(wave2);

  // Mist layer
  const mist = document.createElement('div');
  mist.style.cssText = `
    position: absolute; bottom: 25%; left: 0; right: 0;
    height: 20%; z-index: 6;
    background: linear-gradient(90deg,
      transparent 0%, rgba(255,255,255,0.08) 20%,
      rgba(255,255,255,0.15) 40%, transparent 50%,
      rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.06) 85%, transparent 100%);
    filter: blur(20px);
    animation: shanshui-mist 12s ease-in-out infinite alternate;
    pointer-events: none;
  `;
  container.appendChild(mist);

  document.body.prepend(container);
}

function injectStyles() {
  const themeColor = Util.getConfig("themeColor") || "#C8785A";

  const styleEl = document.createElement("style");
  styleEl.textContent = `
    @keyframes shanshui-wave {
      0% { transform: translateX(0); }
      50% { transform: translateX(-150px); }
      100% { transform: translateX(0); }
    }
    @keyframes shanshui-mist {
      0% { transform: translateX(-5%) scaleX(1); opacity: 0.6; }
      50% { transform: translateX(3%) scaleX(1.05); opacity: 0.8; }
      100% { transform: translateX(-2%) scaleX(0.98); opacity: 0.5; }
    }

    ::selection { background: ${themeColor}44; color: #2C2C2C; }

    body {
      margin: 0; padding: 0;
      font-family: 'Noto Serif SC', 'Source Han Serif', Georgia, 'Times New Roman', serif;
      font-size: 15px;
      line-height: 1.8;
      color: #2C2C2C;
      background: #E8EDE4;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    html, body { height: 100%; overflow: hidden; }

    #page, #app { height: 100%; }
    #page { background: transparent; }

    /* ============================================
       LAYOUT — Floating card over landscape
       ============================================ */
    #main {
      padding-left: 0;
      min-height: 0;
      background: transparent;
      position: relative;
      flex: 1;
    }

    #content {
      padding: 24px 32px;
      min-height: 100%;
      overflow-y: auto;
      scroll-behavior: smooth;
      position: relative;
      z-index: 10;
    }

    #container {
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 16px;
      border: 1px solid rgba(120, 160, 180, 0.12);
      padding: 24px 36px;
      margin: 20px auto;
      width: 100%;
      max-width: 820px;
      box-shadow: 0 8px 32px rgba(120, 140, 120, 0.1),
                  0 2px 8px rgba(0, 0, 0, 0.04);
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    #container:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(120, 140, 120, 0.15),
                  0 4px 12px rgba(0, 0, 0, 0.06);
    }

    /* ============================================
       FOOTER
       ============================================ */
    #footer {
      width: 100%;
      height: 36px !important; line-height: 36px;
      text-align: center;
      color: #7A7A7A;
      font-size: 11px;
      font-family: sans-serif;
      border-top: 1px solid rgba(120, 160, 180, 0.1);
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(8px);
    }
    #footer a { color: ${themeColor}; text-decoration: none; font-size: 11px; }

    /* ============================================
       HEADER / NAV — Ink-wash transparent
       ============================================ */
    #header {
      height: 48px !important; line-height: 48px;
      text-align: right;
      background: rgba(255, 255, 255, 0.55);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(120, 160, 180, 0.1);
      padding: 0 24px;
      position: relative;
      z-index: 100;
      font-family: sans-serif;
    }

    #header .oper {
      font-size: 18px;
      color: #5A7D5E;
      float: left; line-height: 48px;
      padding: 0; margin: 0 6px 0 0;
      cursor: pointer;
      transition: transform 0.2s ease;
      opacity: 0.5;
    }
    #header .oper:hover { opacity: 1; transform: rotate(90deg); }

    #header ul { display: inline-block; padding: 0; margin: 0; height: 48px; line-height: 48px; }
    #header ul li {
      list-style: none; display: inline-block; float: left; margin: 0 2px;
    }
    #header ul li a {
      text-decoration: none; color: #5A5A5A !important;
      font-size: 13px; padding: 5px 10px; border-radius: 6px;
      transition: color 0.2s ease;
    }
    #header ul li a:hover { color: ${themeColor} !important; }

    .el-dropdown-link {
      color: #5A5A5A; cursor: pointer; font-size: 13px; padding: 5px 6px;
      border-radius: 6px; transition: color 0.2s ease;
    }
    .el-dropdown-link:hover { color: ${themeColor}; }

    #title {
      height: 48px; line-height: 48px; margin: 0; padding: 0;
      display: block; font-size: 16px; font-weight: 700;
      text-decoration: none; float: left; padding-left: 6px;
      color: #3D3228; letter-spacing: 0.5px;
    }
    #title:hover { color: ${themeColor}; }

    #logo {
      vertical-align: middle; margin-right: 6px;
      width: 20px; height: 20px; border-radius: 50%;
    }

    .version { color: #9A9A9A; font-size: 11px; margin-left: 4px; opacity: 0.7; }

    /* ============================================
       SIDEBAR — Ink wash overlay
       ============================================ */
    #aside {
      position: fixed;
      top: 48px; left: 0; bottom: 0;
      width: 210px; z-index: 50;
      overflow-x: hidden; overflow-y: auto;
      padding-top: 8px; padding-right: 0;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid rgba(120, 160, 180, 0.1);
    }

    #aside ul { margin: 0; padding: 0; }
    #aside ul li { list-style: none; }

    .el-menu { border-right: 0 !important; background: transparent !important; }

    .el-menu-item {
      background: transparent !important;
      color: #5A5A5A !important;
      transition: all 0.2s ease;
      margin: 2px 8px;
      height: 40px !important; line-height: 40px !important;
      font-size: 13px;
      border-radius: 8px;
      padding: 0 !important;
      position: relative;
      cursor: pointer;
      overflow: hidden;
    }
    .el-menu-item a {
      display: flex; align-items: center;
      width: 100%; height: 100%;
      padding: 0 14px; margin: 0;
      text-decoration: none; color: inherit !important;
      box-sizing: border-box;
    }
    .el-menu-item:hover { background: rgba(200, 120, 90, 0.06) !important; color: ${themeColor} !important; }
    .el-menu-item::before {
      content: '';
      position: absolute; left: 0; top: 50%;
      transform: translateY(-50%) scaleY(0);
      width: 3px; height: 50%;
      background: ${themeColor};
      border-radius: 0 2px 2px 0;
      opacity: 0;
      transition: all 0.2s ease;
      pointer-events: none;
    }
    .el-menu-item:hover::before { opacity: 0.4; transform: translateY(-50%) scaleY(1); }

    .el-menu-item.is-active {
      color: ${themeColor} !important;
      font-weight: 600;
      background: linear-gradient(90deg, ${themeColor}0C 0%, transparent 100%) !important;
    }
    .el-menu-item.is-active::before { opacity: 1; transform: translateY(-50%) scaleY(1); height: 60%; }

    .el-submenu__title {
      background: transparent !important;
      color: #3D3228 !important;
      height: 40px !important; line-height: 40px !important;
      font-size: 12.5px; font-weight: 600;
      padding: 0 14px !important;
      border-radius: 8px; margin: 2px 8px;
      transition: all 0.2s ease;
      opacity: 0.75;
    }
    .el-submenu__title:hover { background: rgba(200, 120, 90, 0.06) !important; color: ${themeColor} !important; opacity: 1; }

    .el-submenu__title .el-submenu__icon-arrow {
      transition: transform 0.25s ease !important;
      color: #9A9A9A; font-size: 12px;
    }
    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow { transform: rotateZ(180deg) !important; }

    .el-submenu .el-menu { background: transparent !important; position: relative; }
    .el-submenu .el-menu .el-menu-item {
      padding: 0 !important;
      font-size: 12.5px; height: 36px !important; line-height: 36px !important;
      margin: 1px 8px 1px 18px;
    }
    .el-submenu .el-menu .el-menu-item a { padding: 0 14px 0 36px !important; }
    .el-submenu .el-menu .el-menu-item.is-active { background: linear-gradient(90deg, ${themeColor}0C 0%, transparent 100%) !important; }

    /* ============================================
       TYPOGRAPHY
       ============================================ */
    h1 {
      font-size: 1.8rem; font-weight: 700;
      margin: 0 0 12px;
      color: #3D3228;
      letter-spacing: 0.5px;
      border-left: 4px solid ${themeColor};
      padding-left: 14px;
    }
    h2 {
      font-size: 1.35rem; font-weight: 600;
      margin: 20px 0 8px;
      color: #3D3228;
      padding-bottom: 6px;
      border-bottom: 1px solid #E8DDD0;
    }
    h3 { font-size: 1.1rem; font-weight: 600; margin: 14px 0 6px; color: #3D3228; }
    h4, h5, h6 { font-weight: 600; color: #3D3228; margin: 10px 0 4px; }

    p, li {
      font-family: 'Noto Serif SC', 'Source Han Serif', Georgia, serif;
      color: #4A4A4A; line-height: 1.8; font-size: 15px; margin: 6px 0;
    }
    #container strong { color: #3D3228; }

    #container ul, #container ol {
      line-height: 1.7; word-spacing: 0.04rem;
      padding-left: 24px; margin: 6px 0;
    }
    ul { padding-left: 24px; }

    a {
      color: ${themeColor};
      text-decoration: none;
      transition: color 0.2s ease;
      position: relative;
    }
    a:hover { color: #A05840; text-decoration: underline; }

    blockquote {
      margin: 14px 0;
      padding: 10px 18px;
      color: #6A6A6A;
      background: rgba(200, 120, 90, 0.04);
      border-radius: 0 8px 8px 0;
      position: relative;
      font-style: italic;
    }
    blockquote::before {
      content: '';
      position: absolute; top: 0; left: 0; bottom: 0;
      width: 3px;
      background: ${themeColor};
      border-radius: 2px;
    }
    blockquote p { padding: 2px 0; margin: 0; }

    hr {
      border: none;
      height: 1px;
      margin: 24px 0;
      background: linear-gradient(90deg, transparent 0%, #E8DDD0 20%, #E8DDD0 80%, transparent 100%);
    }

    /* ============================================
       CODE
       ============================================ */
    pre {
      background: #F5F0E8;
      border-radius: 8px;
      padding: 14px 16px;
      overflow: auto;
      border: 1px solid #E8DDD0;
      position: relative;
      margin: 14px 0;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    pre:hover { border-color: ${themeColor}44; }
    pre code {
      background: none; color: #3D3228;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 13px; line-height: 1.55;
    }
    code {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.88em;
    }
    p code {
      color: ${themeColor};
      margin: 0 2px; padding: 2px 6px; white-space: pre-wrap;
      background: rgba(200, 120, 90, 0.06);
      font-weight: 500; border-radius: 3px;
      border: 1px solid rgba(200, 120, 90, 0.12);
    }
    pre[class*="language-"] { padding-top: 28px !important; }
    pre[class*="language-"]::before {
      content: attr(data-lang);
      position: absolute; top: 0; right: 0;
      background: #F5F0E8;
      padding: 3px 12px; font-size: 10px; font-weight: 600;
      border-radius: 0 8px 0 4px;
      font-family: sans-serif;
      color: ${themeColor};
      text-transform: uppercase; letter-spacing: 0.5px;
      border-bottom: 1px solid #E8DDD0; border-left: 1px solid #E8DDD0;
    }

    .token.comment { color: #8A8A8A; font-style: italic; }
    .token.function { color: #C05640; }
    .token.keyword { color: #5A7D5E; font-weight: 600; }
    .token.string { color: #A06830; }
    .token.number { color: #D49040; }
    .token.operator { color: #7A5A7A; }
    .token.class-name { color: #3D6A8A; }
    .token.attr-value { color: #A06830; }
    .token.attr-name { color: #D49040; }

    /* ============================================
       TABLES / IMAGES
       ============================================ */
    table {
      width: 100%; border-collapse: separate; border-spacing: 0;
      margin: 14px 0; border-radius: 8px; overflow: hidden;
      border: 1px solid #E8DDD0;
    }
    thead { background: #F5F0E8; }
    th { padding: 8px 14px; text-align: left; font-weight: 600; font-size: 13px; color: #3D3228; border-bottom: 1px solid #E8DDD0; }
    td { padding: 7px 14px; font-size: 13px; color: #4A4A4A; border-bottom: 1px solid #E8DDD0; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(200, 120, 90, 0.03); }

    #container>p>img {
      max-width: 100%; border-radius: 8px;
      border: 1px solid #E8DDD0; transition: all 0.3s ease; margin: 8px 0;
    }
    #container>p>img:hover {
      border-color: ${themeColor}44;
      box-shadow: 0 0 20px rgba(200, 120, 90, 0.15);
      transform: scale(1.008);
    }
    img { max-width: 100%; }

    /* ============================================
       LOADING
       ============================================ */
    .fullscreen-loading {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(232, 237, 228, 0.9);
      backdrop-filter: blur(8px);
      display: flex; justify-content: center; align-items: center;
      z-index: 9999;
    }
    .fullscreen-loading::before {
      content: "☯";
      font-size: 40px;
      color: #7A9A7A;
      animation: shanshui-loading 1.5s ease-in-out infinite;
    }
    @keyframes shanshui-loading {
      0%, 100% { opacity: 0.3; transform: rotate(0deg) scale(0.8); }
      50% { opacity: 0.8; transform: rotate(180deg) scale(1); }
    }

    /* ============================================
       OVERRIDES
       ============================================ */
    .el-dropdown-menu {
      background: rgba(255, 255, 255, 0.92) !important;
      backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(120, 160, 180, 0.12) !important;
      border-radius: 8px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08) !important;
    }
    .el-dropdown-menu__item {
      color: #5A5A5A !important;
      transition: all 0.2s ease !important;
      font-size: 13px !important;
      padding: 7px 20px !important;
      border-radius: 4px; margin: 2px 6px;
    }
    .el-dropdown-menu__item:hover {
      background: rgba(200, 120, 90, 0.06) !important;
      color: ${themeColor} !important;
      padding-left: 24px !important;
    }
    .el-alert { border-radius: 8px !important; border: 1px solid #E8DDD0 !important; margin: 8px 0 !important; }
    .el-tabs--border-card {
      background: rgba(255,255,255,0.6) !important;
      border: 1px solid rgba(120,160,180,0.12) !important;
      border-radius: 8px !important;
    }

    .nav-a { font-size: 13px; text-decoration: none; color: ${themeColor}; margin-left: 4px; }
    .nav-a:hover { filter: brightness(1.1); }
    .theme-color { color: ${themeColor}; }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(200, 120, 90, 0.3); border-radius: 8px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(200, 120, 90, 0.5); }

    .version-item sup { right: 0 !important; top: 12px !important; background: ${themeColor}; }

    /* ============================================
       RESPONSIVE
       ============================================ */
    @media only screen and (max-width: 500px) {
      #aside { display: none; }
      body.sidebar-open #aside { display: block !important; }
      #header { height: 40px !important; line-height: 40px; padding: 0 10px !important; }
      #title { font-size: 14px; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      #logo { width: 16px; height: 16px; }
      #content { padding: 12px; }
      #container { padding: 14px 18px; margin: 10px 4px; }
      h1 { font-size: 1.35rem; }
      h2 { font-size: 1.1rem; }
      p, li { font-size: 14px; }
      .version { display: none; }
      #oper { display: inline !important; }
    }
  `;
  document.head.appendChild(styleEl);
}
