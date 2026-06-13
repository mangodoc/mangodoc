import Util from "../../util/util"

export default {
    ready(){
      injectStyle();
    }
}

function injectStyle() {
  if (document.getElementById('cool-theme-core')) return;
  let themeColor = Util.getConfig("themeColor");

  const styleEl = document.createElement("style");
  styleEl.id = 'cool-theme-core';
  styleEl.setAttribute('data-cool-theme', 'core');
  styleEl.textContent = `
    /* ============================================
       mangodoc cool theme v3 — Full-bleed glass
       ============================================ */

    /* ---------- CSS Custom Properties ---------- */
    :root {
      --cool-theme: ${themeColor};
      --cool-theme-rgb: ${parseInt(themeColor.slice(1,3), 16)}, ${parseInt(themeColor.slice(3,5), 16)}, ${parseInt(themeColor.slice(5,7), 16)};
      --cool-bg-primary: #070714;
      --cool-bg-secondary: #0f0f24;
      --cool-bg-tertiary: #16163a;
      --cool-bg-glass: rgba(15, 15, 36, 0.72);
      --cool-bg-glass-hover: rgba(15, 15, 36, 0.88);
      --cool-bg-overlay: rgba(7, 7, 20, 0.55);

      --cool-text-primary: #e8e8f4;
      --cool-text-secondary: #9a9abe;
      --cool-text-muted: #5e5e82;

      --cool-border: rgba(255, 255, 255, 0.05);
      --cool-border-glass: rgba(255, 255, 255, 0.09);

      --cool-shadow-glass: 0 8px 40px rgba(0, 0, 0, 0.5);
      --cool-shadow-glow: 0 0 24px ${themeColor}55;

      --cool-gradient-primary: linear-gradient(135deg, ${themeColor} 0%, #a855f7 100%);
      --cool-gradient-bg: linear-gradient(135deg, #070714 0%, #0f0f24 30%, #0a0a1e 60%, #0f0f24 100%);

      --cool-radius-sm: 4px;
      --cool-radius-md: 8px;
      --cool-radius-lg: 12px;

      --cool-transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      --cool-transition-fast: all 0.12s ease;
    }

    /* ============================================
       READING PROGRESS BAR
       ============================================ */
    #cool-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      width: 0%;
      z-index: 9999;
      background: linear-gradient(90deg, ${themeColor}, #a855f7, #60a5fa, ${themeColor});
      background-size: 300% 100%;
      animation: cool-progress-glow 3s ease infinite;
      box-shadow: 0 0 8px ${themeColor}66, 0 0 20px ${themeColor}33;
      transition: width 0.1s linear;
    }
    @keyframes cool-progress-glow {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* ============================================
       MOTION EFFECTS — Shimmer, float, pulse
       ============================================ */

    /* Heading shimmer — gradient slides across */
    @keyframes cool-text-shimmer {
      0%, 35% { background-position: 0% 50%; }
      55%, 100% { background-position: 100% 50%; }
    }

    /* Floating animation for action buttons */
    @keyframes cool-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    .cool-float {
      animation: cool-float 3s ease-in-out infinite;
    }
    .cool-float-fast {
      animation: cool-float 2s ease-in-out infinite;
    }

    /* Pulse glow for active elements */
    @keyframes cool-pulse-glow {
      0%, 100% { box-shadow: inset 0 0 20px ${themeColor}11, 0 0 0px ${themeColor}00; }
      50% { box-shadow: inset 0 0 20px ${themeColor}22, 0 0 12px ${themeColor}22; }
    }

    /* Back-to-top button */
    #cool-back-top {
      position: fixed;
      right: 16px;
      bottom: 48px;
      z-index: 1000;
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.08);
      color: var(--cool-text-primary);
      width: 32px; height: 32px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }
    #cool-back-top.visible { opacity: 1; pointer-events: auto; }
    #cool-back-top:hover {
      background: ${themeColor}22;
      border-color: ${themeColor}44;
      transform: scale(1.1);
      box-shadow: 0 0 20px ${themeColor}33;
    }
    #cool-back-top:active { transform: scale(0.9); }
    #cool-back-top svg { width: 16px; height: 16px; fill: currentColor; }

    /* ============================================
       BASE
       ============================================ */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      font-size: 15px;
      letter-spacing: 0.01em;
      background: var(--cool-gradient-bg);
      background-size: 200% 200%;
      animation: cool-bg-shift 20s ease infinite;
      color: var(--cool-text-primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    @keyframes cool-bg-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    html, body {
      height: 100%;
      overflow: hidden;
    }

    ::selection {
      background: ${themeColor}88;
      color: white;
    }

    /* ============================================
       LAYOUT — Full-bleed, no card containers
       ============================================ */
    #page, #app {
      height: 100%;
    }
    #page { background: transparent; }

    #footer {
      width: 100%;
      height: 36px !important;
      line-height: 36px;
      text-align: center;
      color: var(--cool-text-muted);
      font-size: 11px;
      border-top: 1px solid var(--cool-border-glass);
      background: var(--cool-bg-glass);
      backdrop-filter: blur(12px);
    }
    #footer a { font-size: 11px; color: ${themeColor}; text-decoration: none; }

    #main {
      padding-left: 0;
      min-height: 0;
      background: transparent;
      position: relative;
      flex: 1;
    }

    /* Content area — glass overlay for readability */
    #content {
      padding: 28px 40px;
      background: var(--cool-bg-overlay);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      min-height: 100%;
      transition: background var(--cool-transition);
      overflow-y: auto;
      scroll-behavior: smooth;
    }

    /* #container — transparent wrapper */
    #container {
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0;
      margin: 0 auto;
      width: 100%;
      max-width: 820px;
      box-shadow: none;
      overflow: visible;
      position: static;
      will-change: opacity, transform;
    }

    /* ============================================
       SIDEBAR — Clean floating panel
       ============================================ */
    #aside {
      position: fixed;
      top: 48px;
      left: 0;
      bottom: 0;
      width: 210px;
      z-index: 50;
      overflow-x: hidden;
      overflow-y: auto;
      padding-top: 8px;
      padding-right: 0;
      background: var(--cool-bg-glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-right: 1px solid var(--cool-border-glass);
    }

    #aside ul { margin: 0; padding: 0; }
    #aside ul li { list-style: none; }

    .el-menu { border-right: 0 !important; background: transparent !important; }

    /* ---- Menu item: clean, spacious  ---- */
    .el-menu-item {
      background: transparent !important;
      color: var(--cool-text-secondary) !important;
      transition: all 0.2s ease;
      margin: 3px 10px;
      height: 42px !important;
      line-height: 42px !important;
      font-size: 13px;
      border-radius: var(--cool-radius-md);
      padding: 0 !important;
      position: relative;
      cursor: pointer;
      overflow: hidden;
    }
    /* Link fills entire menu item — full area is clickable */
    .el-menu-item a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 14px;
      margin: 0;
      text-decoration: none;
      color: inherit !important;
      box-sizing: border-box;
    }
    .el-menu-item:hover {
      background: rgba(255,255,255,0.035) !important;
      color: ${themeColor} !important;
    }
    /* Hover left accent line — slides in smoothly */
    .el-menu-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) scaleY(0);
      width: 3px;
      height: 50%;
      background: var(--cool-gradient-primary);
      border-radius: 0 2px 2px 0;
      opacity: 0;
      transition: all 0.2s ease;
      pointer-events: none;
    }
    .el-menu-item:hover::before {
      opacity: 0.5;
      transform: translateY(-50%) scaleY(1);
    }

    /* Active: clean left accent + gradient, no pulse */
    .el-menu-item.is-active {
      color: ${themeColor} !important;
      font-weight: 600;
      background: linear-gradient(90deg, ${themeColor}14 0%, transparent 100%) !important;
    }
    .el-menu-item.is-active::before {
      opacity: 1;
      transform: translateY(-50%) scaleY(1);
      height: 60%;
      box-shadow: 0 0 8px ${themeColor}66;
    }

    /* ---- Submenu title: clean heading ---- */
    .el-submenu__title {
      background: transparent !important;
      color: var(--cool-text-primary) !important;
      height: 42px !important;
      line-height: 42px !important;
      font-size: 12.5px;
      font-weight: 600;
      padding: 0 14px !important;
      border-radius: var(--cool-radius-md);
      margin: 2px 10px;
      transition: all 0.2s ease;
      opacity: 0.75;
    }
    .el-submenu__title:hover {
      background: rgba(255,255,255,0.035) !important;
      color: ${themeColor} !important;
      opacity: 1;
    }

    /* Submenu arrow */
    .el-submenu__title .el-submenu__icon-arrow {
      transition: transform 0.25s ease !important;
      color: var(--cool-text-muted);
      font-size: 12px;
    }
    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
      transform: rotateZ(180deg) !important;
    }

    /* ---- Nested submenu items ---- */
    .el-submenu .el-menu {
      background: transparent !important;
      position: relative;
    }
    .el-submenu .el-menu::before {
      content: '';
      position: absolute;
      left: 26px;
      top: 4px;
      bottom: 4px;
      width: 1px;
      background: linear-gradient(180deg, ${themeColor}33 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .el-submenu.is-opened .el-menu::before {
      opacity: 1;
    }
    .el-submenu .el-menu .el-menu-item {
      padding: 0 !important;
      font-size: 12.5px;
      height: 36px !important;
      line-height: 36px !important;
      margin: 1px 10px 1px 18px;
    }
    .el-submenu .el-menu .el-menu-item a {
      padding: 0 14px 0 36px !important;
    }
    .el-submenu .el-menu .el-menu-item.is-active {
      background: linear-gradient(90deg, ${themeColor}10 0%, transparent 100%) !important;
    }
    .el-submenu .el-menu .el-menu-item.is-active::before {
      opacity: 1;
      transform: translateY(-50%) scaleY(1);
      box-shadow: 0 0 8px ${themeColor}66;
    }

    /* ============================================
       HEADER / NAV — Thin glass bar
       ============================================ */
    #header {
      height: 44px !important;
      line-height: 44px;
      text-align: right;
      background: var(--cool-bg-glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--cool-border-glass);
      padding: 0 20px;
      position: relative;
      z-index: 100;
    }

    #header .oper {
      font-size: 18px;
      color: ${themeColor};
      float: left;
      line-height: 44px;
      padding: 0;
      margin: 0 4px;
      cursor: pointer;
      transition: var(--cool-transition-fast);
    }
    #header .oper:hover {
      transform: scale(1.15) rotate(90deg);
      text-shadow: 0 0 12px ${themeColor}88;
    }

    #header ul { display: inline-block; padding: 0; margin: 0; height: 44px; line-height: 44px; }
    #header ul li {
      list-style: none;
      display: inline-block;
      float: left;
      margin-right: 10px;
    }
    #header ul li {
      position: relative;
    }
    #header ul li a {
      text-decoration: none;
      color: var(--cool-text-secondary) !important;
      font-weight: 500;
      font-size: 13px;
      position: relative;
      padding: 6px 10px;
      border-radius: var(--cool-radius-sm);
      transition: all 0.2s ease;
    }
    #header ul li a:hover {
      color: ${themeColor} !important;
      background: rgba(255,255,255,0.04);
    }

    #title {
      height: 40px;
      line-height: 40px;
      margin: 0;
      padding: 0;
      display: block;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      float: left;
      padding-left: 12px;
      background: var(--cool-gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.3px;
    }
    #title:hover { filter: brightness(1.3); }

    #logo {
      vertical-align: middle;
      margin-right: 6px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      -webkit-text-fill-color: initial;
      box-shadow: 0 0 8px ${themeColor}44;
    }

    #cool-dark-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 10px;
      width: 28px; height: 28px;
      border-radius: 50%;
      background: rgba(255,255,255,0.04);
      transition: var(--cool-transition);
      vertical-align: middle;
    }
    #cool-dark-toggle:hover {
      background: ${themeColor}22;
      box-shadow: 0 0 16px ${themeColor}44;
      transform: scale(1.1);
    }
    #cool-dark-toggle:active { transform: scale(0.9); }
    #cool-dark-toggle i { font-size: 15px !important; }

    .version { color: var(--cool-text-muted); font-size: 12px; margin-left: 6px; }

    /* ============================================
       TYPOGRAPHY
       ============================================ */
    h1 {
      font-size: 1.8rem;
      font-weight: 800;
      margin: 0 0 12px;
      background: var(--cool-gradient-primary);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
      text-shadow: none;
      transition: text-shadow 0.3s ease;
      position: relative;
      animation: cool-text-shimmer 7s ease-in-out infinite;
    }
    h1:hover {
      text-shadow: 0 0 30px ${themeColor}44, 0 0 60px ${themeColor}22;
      animation-duration: 2s;
    }

    h2 {
      font-size: 1.35rem;
      font-weight: 700;
      margin: 20px 0 8px;
      color: var(--cool-text-primary);
      padding-bottom: 6px;
      border-bottom: 1px solid var(--cool-border);
      position: relative;
    }
    h2::after {
      content: '';
      position: absolute;
      bottom: -1px; left: 0;
      width: 48px; height: 2px;
      background: var(--cool-gradient-primary);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    h2:hover::after { width: 80px; }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 14px 0 6px;
      color: var(--cool-text-primary);
    }
    h4, h5, h6 {
      font-weight: 600;
      color: var(--cool-text-primary);
      margin: 10px 0 4px;
    }

    p, li {
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      color: var(--cool-text-secondary);
      line-height: 1.7;
      font-size: 15px;
      margin: 6px 0;
    }
    #container strong { color: var(--cool-text-primary); }

    #container ul, #container ol {
      line-height: 1.7;
      word-spacing: 0.04rem;
      padding-left: 22px;
      margin: 6px 0;
    }
    ul { padding-left: 24px; }

    /* Colored list markers */
    #container ul li::marker {
      color: ${themeColor};
      font-size: 0.9em;
    }
    #container ol li::marker {
      color: ${themeColor}BB;
      font-weight: 600;
    }

    /* Enhanced link */
    a {
      color: ${themeColor};
      text-decoration: none;
      transition: all 0.2s ease;
      position: relative;
    }
    a:hover {
      filter: brightness(1.3);
      text-shadow: 0 0 12px ${themeColor}44;
    }

    /* Enhanced blockquote */
    blockquote {
      margin: 14px 0;
      padding: 10px 18px;
      color: var(--cool-text-secondary);
      border-radius: 0 var(--cool-radius-sm) var(--cool-radius-sm) 0;
      position: relative;
      background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%);
      border-left: none;
    }
    blockquote::before {
      content: '';
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 3px;
      background: var(--cool-gradient-primary);
      border-radius: 2px;
      box-shadow: 0 0 8px ${themeColor}44;
      transition: width 0.3s ease, box-shadow 0.3s ease;
    }
    blockquote:hover::before {
      width: 4px;
      box-shadow: 0 0 16px ${themeColor}66, 0 0 32px ${themeColor}33;
    }
    blockquote p { padding: 2px 0; margin: 0; }

    /* Decorative hr */
    hr {
      border: none;
      height: 1px;
      margin: 24px 0;
      background: linear-gradient(90deg, transparent 0%, var(--cool-border-glass) 20%, var(--cool-border-glass) 80%, transparent 100%);
    }

    /* ============================================
       CODE BLOCKS
       ============================================ */
    pre {
      background: #0d0d22;
      border-radius: var(--cool-radius-md);
      padding: 14px 16px;
      overflow: auto;
      border: 1px solid var(--cool-border);
      position: relative;
      margin: 14px 0;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
    }
    pre:hover {
      border-color: ${themeColor}33;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.3), 0 0 20px ${themeColor}11;
    }
    pre code {
      background: none;
      color: #d4d4e8;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.55;
    }
    code {
      border-radius: var(--cool-radius-sm);
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.88em;
    }
    p code {
      color: var(--cool-theme);
      margin: 0 2px;
      padding: 2px 6px;
      white-space: pre-wrap;
      background: rgba(var(--cool-theme-rgb), 0.08);
      font-weight: 500;
      border-radius: 3px;
      border: 1px solid rgba(var(--cool-theme-rgb), 0.15);
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    p code:hover {
      background: rgba(var(--cool-theme-rgb), 0.15);
      border-color: rgba(var(--cool-theme-rgb), 0.25);
      box-shadow: 0 0 12px rgba(var(--cool-theme-rgb), 0.2);
    }
    pre[class*="language-"] { padding-top: 28px !important; }
    pre[class*="language-"]::before {
      content: attr(data-lang);
      position: absolute;
      top: 0; right: 0;
      background: #0d0d22;
      padding: 3px 12px;
      font-size: 10px;
      font-weight: 600;
      border-radius: 0 var(--cool-radius-md) 0 var(--cool-radius-sm);
      font-family: sans-serif;
      color: ${themeColor};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--cool-border);
      border-left: 1px solid var(--cool-border);
    }

    .token.comment { color: #6b7280; font-style: italic; }
    .token.function { color: #60a5fa; }
    .token.keyword { color: #c084fc; text-shadow: 0 0 6px #c084fc44; }
    .token.string { color: #34d399; }
    .token.number { color: #fbbf24; }
    .token.operator { color: #f472b6; }
    .token.class-name { color: #22d3ee; }
    .token.attr-value { color: #34d399; }
    .token.attr-name { color: #fbbf24; }
    .token.builtin { color: #a78bfa; }
    .token.property { color: #60a5fa; }

    /* ============================================
       TABLES
       ============================================ */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 14px 0;
      border-radius: var(--cool-radius-md);
      overflow: hidden;
      border: 1px solid var(--cool-border);
    }
    thead { background: var(--cool-bg-tertiary); }
    th {
      padding: 8px 14px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: var(--cool-text-primary);
      border-bottom: 1px solid var(--cool-border);
    }
    td {
      padding: 7px 14px;
      font-size: 13px;
      color: var(--cool-text-secondary);
      border-bottom: 1px solid var(--cool-border);
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(255,255,255,0.03); }
    /* Striped rows */
    tbody tr:nth-child(even) td {
      background: rgba(255,255,255,0.015);
    }

    /* ============================================
       IMAGES
       ============================================ */
    #container>p>img {
      max-width: 100%;
      border-radius: var(--cool-radius-md);
      border: 1px solid var(--cool-border);
      transition: all 0.3s ease;
      margin: 8px 0;
    }
    #container>p>img:hover {
      border-color: ${themeColor}44;
      box-shadow: 0 0 24px ${themeColor}33, 0 4px 16px rgba(0,0,0,0.3);
      transform: scale(1.015);
    }
    img { max-width: 100%; }

    /* ============================================
       LOADING — Enhanced spinner
       ============================================ */
    .fullscreen-loading {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(7, 7, 20, 0.88);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      gap: 16px;
    }
    .fullscreen-loading::before {
      content: "";
      width: 36px;
      height: 36px;
      border: 3px solid rgba(255,255,255,0.04);
      border-top-color: ${themeColor};
      border-bottom-color: #a855f766;
      border-radius: 50%;
      animation: cool-spin 0.7s linear infinite;
      box-shadow: 0 0 20px ${themeColor}33;
    }
    .fullscreen-loading::after {
      content: "loading";
      font-size: 12px;
      color: var(--cool-text-muted);
      letter-spacing: 2px;
      text-transform: uppercase;
      animation: cool-loading-pulse 1.5s ease infinite;
    }
    @keyframes cool-spin { to { transform: rotate(360deg); } }
    @keyframes cool-loading-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }

    /* ============================================
       COLOR TAGS
       ============================================ */
    green { color: #34d399; }
    red { color: #f87171; }
    darkred { color: #b91c1c; }
    darkgreen { color: #059669; }
    pink { color: #f472b6; }
    gray { color: #6b7280; }
    orange { color: #fb923c; }
    blue { color: #60a5fa; }
    yellow { color: #fbbf24; }
    purple { color: #a78bfa; }
    brown { color: #a16207; }
    white { color: #f3f4f6; }
    black { color: #111827; }

    /* ============================================
       SCROLLBAR
       ============================================ */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, ${themeColor}44, #a855f744);
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, ${themeColor}66, #a855f766); }

    /* Firefox scrollbar */
    * {
      scrollbar-width: thin;
      scrollbar-color: ${themeColor}44 transparent;
    }

    /* ============================================
       BADGE
       ============================================ */
    .version-item sup {
      right: 0 !important;
      top: 12px !important;
      background: ${themeColor};
    }

    /* ============================================
       NAV ELEMENTS
       ============================================ */
    .nav-a { font-size: 13px; text-decoration: none; color: ${themeColor}; margin-left: 4px; }
    .nav-a:hover { filter: brightness(1.3); }
    .theme-color { color: ${themeColor}; }

    /* ============================================
       OVERRIDES — Element UI
       ============================================ */
    .el-dropdown-menu {
      background: var(--cool-bg-glass) !important;
      backdrop-filter: blur(24px) !important;
      border: 1px solid var(--cool-border-glass) !important;
      border-radius: var(--cool-radius-md) !important;
      box-shadow: var(--cool-shadow-glass) !important;
    }
    .el-dropdown-menu__item {
      color: var(--cool-text-secondary) !important;
      transition: all 0.2s ease !important;
      font-size: 13px !important;
      padding: 7px 20px !important;
      position: relative;
      border-radius: var(--cool-radius-sm);
      margin: 2px 6px;
    }
    .el-dropdown-menu__item:hover {
      background: rgba(255,255,255,0.06) !important;
      color: ${themeColor} !important;
      padding-left: 24px !important;
      box-shadow: inset 2px 0 0 ${themeColor}66;
    }
    .el-dropdown-menu__item .nav-a {
      margin-left: 0;
    }
    .el-alert {
      border-radius: var(--cool-radius-md) !important;
      border: 1px solid var(--cool-border) !important;
      margin: 8px 0 !important;
    }
    .el-tabs--border-card {
      background: rgba(13, 13, 34, 0.6) !important;
      border: 1px solid var(--cool-border-glass) !important;
      border-radius: var(--cool-radius-md) !important;
    }
    .el-tabs--border-card > .el-tabs__header {
      background: rgba(13, 13, 34, 0.8) !important;
      border-bottom: 1px solid var(--cool-border) !important;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: ${themeColor} !important;
      background: rgba(13, 13, 34, 0.4) !important;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      color: var(--cool-text-secondary) !important;
      font-size: 13px !important;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
      color: ${themeColor} !important;
    }

    /* ============================================
       COVER PAGE — Full-screen hero + feature cards
       ============================================ */
    .coverpage {
      width: 80%;
      margin: 0 auto;
      padding: 60px 0 40px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .coverpage .el-result {
      max-width: 640px;
    }
    .coverpage .logo {
      width: 40%;
      max-width: 280px;
      border-radius: 16px;
      box-shadow: 0 0 40px ${themeColor}44, 0 0 80px ${themeColor}22;
      transition: box-shadow 0.4s ease;
    }
    .coverpage .logo .el-image__inner {
      border-radius: 16px;
      object-fit: contain;
    }
    .coverpage .logo:hover {
      box-shadow: 0 0 60px ${themeColor}66, 0 0 120px ${themeColor}33;
    }
    .coverpage .future-card {
      margin: 8px;
      background: var(--cool-bg-glass) !important;
      backdrop-filter: blur(16px) !important;
      border: 1px solid var(--cool-border-glass) !important;
      border-radius: var(--cool-radius-lg) !important;
      transition: all 0.3s ease !important;
    }
    .coverpage .future-card:hover {
      border-color: ${themeColor}44 !important;
      box-shadow: 0 0 24px ${themeColor}22 !important;
      transform: translateY(-2px);
    }
    .coverpage .future-card h3 {
      color: var(--cool-text-primary);
      font-weight: 600;
      font-size: 1rem;
    }
    .coverpage .future-remark {
      color: var(--cool-text-muted);
      font-size: 13px;
      min-height: 48px;
      line-height: 1.6;
    }
    .coverpage .future-remark a {
      color: ${themeColor};
    }
    .coverpage .footer {
      text-align: center;
      color: var(--cool-text-muted);
      padding-top: 40px;
      font-size: 12px;
      width: 100%;
    }
    .coverpage .footer a {
      color: ${themeColor};
      font-size: 12px;
    }
    .coverpage .el-button--primary {
      background: var(--cool-theme, ${themeColor});
      border-color: var(--cool-theme, ${themeColor});
    }
    .coverpage .el-button--primary:hover {
      filter: brightness(1.12);
    }

    @media only screen and (max-width: 500px) {
      .coverpage {
        width: 96%;
        padding: 40px 0 20px;
      }
      .coverpage .logo {
        width: 70%;
        max-width: 240px;
      }
      .coverpage .el-result {
        max-width: 100%;
      }
    }

    /* ============================================
       RESPONSIVE
       ============================================ */
    @media only screen and (max-width: 500px) {
      /* ---- Layout ---- */
      #aside { display: none; }
      body.sidebar-open #aside { display: block !important; }
      #main { padding: 0; }
      #content { padding: 12px; }
      #container { max-width: 100%; padding: 0; }
      #footer { padding: 0 12px; }

      /* ---- Header: compact ---- */
      #header {
        height: 40px !important;
        line-height: 40px;
        padding: 0 8px !important;
      }
      #header .oper {
        font-size: 16px;
        line-height: 40px;
        margin: 0 2px 0 0;
      }
      #header ul {
        height: 40px;
        line-height: 40px;
        margin-right: 0;
      }
      #header ul li { margin: 0 1px; }
      #header ul li a {
        font-size: 12px;
        padding: 4px 6px;
      }
      .el-dropdown-link { font-size: 12px; padding: 4px 4px; }

      /* ---- Title / logo ---- */
      #title {
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        padding-left: 4px;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      #logo { width: 14px; height: 14px; margin-right: 4px; }

      /* ---- Actions (repo, version, toggles) ---- */
      .version { display: none; }
      #header .nav-a { font-size: 12px; }

      #cool-dark-toggle {
        width: 22px;
        height: 22px;
        margin-left: 4px;
      }
      #cool-dark-toggle i { font-size: 13px !important; }

      #cool-color-swatch { margin-left: 2px !important; }
      #cool-color-dot { width: 12px !important; height: 12px !important; }
      #cool-color-popover {
        right: -10px !important;
        min-width: 140px !important;
        padding: 8px !important;
        gap: 4px !important;
      }
      #cool-color-popover div { width: 28px !important; height: 28px !important; }

      #oper { display: inline !important; }

      /* ---- Typography ---- */
      h1 { font-size: 1.3rem; margin-bottom: 8px; }
      h2 { font-size: 1.1rem; margin: 12px 0 6px; }
      h2::after { width: 28px; }
      h3 { font-size: 1rem; }
      p, li { font-size: 14px; line-height: 1.6; }

      /* ---- Code blocks ---- */
      pre {
        padding: 10px 12px;
        font-size: 12px;
        margin: 10px -4px;
        border-radius: var(--cool-radius-sm);
      }
      pre[class*="language-"] { padding-top: 24px !important; }

      /* ---- Tables ---- */
      table {
        font-size: 12px;
        margin: 10px -4px;
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      th, td { padding: 5px 8px; }

      /* ---- Images ---- */
      #container>p>img {
        margin: 6px -4px;
        width: calc(100% + 8px);
        max-width: calc(100% + 8px);
      }

      /* ---- Action buttons ---- */
      .cool-fullscreen-btn {
        right: 10px !important;
        bottom: 80px !important;
        width: 28px !important;
        height: 28px !important;
      }
      #cool-back-top {
        right: 10px !important;
        bottom: 44px !important;
        width: 28px !important;
        height: 28px !important;
      }

      /* ---- Search ---- */
      #cool-search.open input { width: 100px; }
      .cool-search-results {
        right: 10px !important;
        left: 10px !important;
        min-width: auto;
        max-width: none;
        top: 44px;
      }

      /* ---- Blockquote ---- */
      blockquote {
        margin: 10px 0;
        padding: 6px 12px;
      }

      /* ---- Loading ---- */
      .fullscreen-loading::before { width: 30px; height: 30px; }
    }

    /* ---- Metadata footer (update time & view count) ---- */
    #container > .page-nav + div {
      color: var(--cool-text-muted) !important;
      font-size: 13px !important;
    }
    #container > .page-nav + div + div {
      color: var(--cool-text-muted) !important;
      font-size: 13px !important;
    }

    /* ============================================
       SEARCH — Inline search box + dropdown
       ============================================ */
    #cool-search {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin: 0 6px;
    }
    #cool-search .el-icon-search {
      font-size: 16px;
      color: var(--cool-text-secondary);
      cursor: pointer;
      padding: 0 6px;
      transition: var(--cool-transition-fast);
      display: inline-block;
      vertical-align: middle;
      line-height: 44px;
    }
    #cool-search .el-icon-search:hover {
      color: ${themeColor};
      transform: scale(1.15);
    }
    #cool-search input {
      width: 0;
      padding: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--cool-text-primary);
      font-size: 13px;
      transition: width 0.25s ease, padding 0.25s ease;
      vertical-align: middle;
      line-height: 28px;
    }
    #cool-search.open input {
      width: 160px;
      padding: 0 8px;
      border-bottom: 1px solid var(--cool-border-glass);
    }
    #cool-search input::placeholder {
      color: var(--cool-text-muted);
    }

    .cool-search-results {
      display: none;
      position: fixed;
      top: 48px;
      right: 80px;
      min-width: 300px;
      max-width: 420px;
      max-height: 400px;
      overflow-y: auto;
      background: var(--cool-bg-glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--cool-border-glass);
      border-radius: var(--cool-radius-md);
      box-shadow: var(--cool-shadow-glass);
      z-index: 999;
      padding: 6px 0;
      text-align: left;
    }
    .cool-search-result {
      display: block;
      padding: 10px 14px;
      color: var(--cool-text-primary);
      text-decoration: none;
      transition: background 0.15s ease, border-color 0.15s ease;
      border-radius: var(--cool-radius-sm);
      margin: 2px 8px;
      border: 1px solid transparent;
    }
    .cool-search-result:hover {
      background: ${themeColor}11;
      border-color: ${themeColor}33;
    }
    .cool-search-count {
      padding: 6px 14px 4px;
      font-size: 11px;
      color: var(--cool-text-muted);
      border-bottom: 1px solid var(--cool-border-glass);
      margin-bottom: 4px;
    }
    .cool-search-result-title {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--cool-text-primary);
      line-height: 1.4;
    }
    .cool-search-result:hover .cool-search-result-title {
      color: ${themeColor};
    }
    .cool-search-result-path {
      display: block;
      font-size: 11px;
      color: var(--cool-text-muted);
      margin-top: 1px;
      line-height: 1.3;
    }
    .cool-search-result-snippet {
      display: block;
      font-size: 12px;
      color: var(--cool-text-secondary);
      margin-top: 4px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .cool-search-result-snippet em {
      font-style: normal;
      color: ${themeColor};
      font-weight: 600;
    }

    .cool-search-status {
      padding: 24px;
      text-align: center;
      color: var(--cool-text-muted);
      font-size: 13px;
    }
  `;
  document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
}
