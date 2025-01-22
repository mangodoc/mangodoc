import Util from "../../util/util";

export default {
  ready() {
    this.initFullscreen();
  },

  initFullscreen() {
    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
      .fullscreen-btn {
        position: fixed;
        right: 20px;
        bottom: 120px;
        z-index: 1000;
        background: ${Util.getConfig("themeColor")};
        color: white;
        padding: 6px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .fullscreen-btn:hover {
        background: ${Util.getConfig("themeColor")};
        transform: scale(1.1);
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      }
      
      .fullscreen-btn:active {
        transform: scale(0.95);
      }
      
      .fullscreen-btn svg {
        width: 18px;
        height: 18px;
      }
      
      .fullscreen-mode {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        background: white;
        overflow: auto;
      }
      
      .fullscreen-mode #header,
      .fullscreen-mode #aside,
      .fullscreen-mode #footer {
        display: none;
      }
      
      .fullscreen-mode #container {
        width: 86% !important;
        max-width: none;
        margin: 0;
        padding: 0;
        margin-left: 0;
      }
      
      .fullscreen-mode #main {
        padding-left: 0 !important;
      }
      
      .fullscreen-mode #toc {
        right: 20px !important;
        top: 80px !important;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      @media only screen and (max-width: 500px) {
        .fullscreen-mode #container {
          width: 100% !important;
        }
        .fullscreen-btn {
          right: 10px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // 创建全屏按钮
    const fullscreenBtn = document.createElement('div');
    fullscreenBtn.className = 'fullscreen-btn';
    fullscreenBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
      </svg>
    `;
    document.body.appendChild(fullscreenBtn);

    // 全屏状态
    let isFullscreen = false;

    // 切换全屏
    fullscreenBtn.addEventListener('click', () => {
      isFullscreen = !isFullscreen;
      document.body.classList.toggle('fullscreen-mode', isFullscreen);
      fullscreenBtn.innerHTML = isFullscreen ? `
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        </svg>
      ` : `
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
      `;
      
      // 保存全屏状态
      Util.setLocal('fullscreen', isFullscreen);
    });

    // 恢复上次的全屏状态
    const savedState = Util.getLocal('fullscreen');
    if (savedState === 'true') {
      document.body.classList.add('fullscreen-mode');
      fullscreenBtn.innerHTML = '&#x26F7;';
      isFullscreen = true;
    }
  }
}