import Util from "../../util/util";

export default {
  ready() {
    this.initFullscreen();
  },

  initFullscreen() {
    if (document.getElementById('cool-fullscreen-style')) return;
    const style = document.createElement('style');
    style.id = 'cool-fullscreen-style';
    style.textContent = `
      .cool-fullscreen-btn {
        position: fixed;
        right: 16px;
        bottom: 90px;
        z-index: 1000;
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.08);
        color: var(--cool-text-primary, #e8e8f4);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cool-fullscreen-btn:hover {
        background: ${Util.getConfig("themeColor")}22;
        border-color: ${Util.getConfig("themeColor")}44;
        transform: scale(1.1);
        box-shadow: 0 0 20px ${Util.getConfig("themeColor")}33;
      }
      .cool-fullscreen-btn:active { transform: scale(0.9); }
      .cool-fullscreen-btn svg { width: 16px; height: 16px; fill: currentColor; }

      .cool-fullscreen-mode {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 999;
        background: var(--cool-bg-primary, #070714);
        overflow: auto;
      }
      .cool-fullscreen-mode #header,
      .cool-fullscreen-mode #aside,
      .cool-fullscreen-mode #footer { display: none !important; }

      .cool-fullscreen-mode #content {
        padding: 40px 20% !important;
        background: transparent !important;
        backdrop-filter: none !important;
      }
      .cool-fullscreen-mode #container {
        max-width: 780px;
        margin: 0 auto;
      }
      .cool-fullscreen-mode #main { padding-left: 0 !important; }

      @media only screen and (max-width: 500px) {
        .cool-fullscreen-mode #content { padding: 24px 16px !important; }
      }
    `;
    document.head.appendChild(style);

    if (document.querySelector('.cool-fullscreen-btn')) return;
    const btn = document.createElement('div');
    btn.className = 'cool-fullscreen-btn cool-float-fast';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
    document.body.appendChild(btn);

    let isFullscreen = false;
    btn.addEventListener('click', () => {
      isFullscreen = !isFullscreen;
      document.body.classList.toggle('cool-fullscreen-mode', isFullscreen);
      btn.innerHTML = isFullscreen
        ? `<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
      Util.setLocal('fullscreen', isFullscreen);
    });

    const savedState = Util.getLocal('fullscreen');
    if (savedState === true) {
      document.body.classList.add('cool-fullscreen-mode');
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;
      isFullscreen = true;
    }
  }
}
