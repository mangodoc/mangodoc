import Util from "../util/util";
import Layout from "../enum/layout";

let overlay: HTMLElement | null = null;
let imgEl: HTMLImageElement | null = null;
let currentScale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;
let lastTranslateX = 0;
let lastTranslateY = 0;

function createOverlay() {
  if (overlay) return;

  const style = document.createElement('style');
  style.id = 'imgview-style';
  style.textContent = `
    .imgview-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0,0,0,0.88);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: zoom-out;
      opacity: 0;
      transition: opacity 0.25s ease;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }
    .imgview-overlay.visible {
      opacity: 1;
    }
    .imgview-overlay img {
      max-width: 92vw;
      max-height: 88vh;
      object-fit: contain;
      border-radius: 6px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      transition: transform 0.2s ease;
      user-select: none;
      -webkit-user-drag: none;
    }
    .imgview-overlay.imgview-zoomed {
      cursor: grab;
    }
    .imgview-overlay.imgview-dragging {
      cursor: grabbing;
    }
    .imgview-close {
      position: fixed;
      top: 16px;
      right: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10001;
      transition: background 0.2s, transform 0.2s;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    .imgview-close:hover {
      background: rgba(255,255,255,0.25);
      transform: scale(1.1);
    }
    .imgview-toolbar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 10001;
      background: rgba(0,0,0,0.5);
      border-radius: 24px;
      padding: 6px 12px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
    }
    .imgview-toolbar button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }
    .imgview-toolbar button:hover {
      background: rgba(255,255,255,0.25);
    }
    .imgview-hint {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.5);
      font-size: 12px;
      z-index: 10001;
      pointer-events: none;
      transition: opacity 0.3s;
    }
  `;
  document.head.appendChild(style);

  overlay = document.createElement('div');
  overlay.className = 'imgview-overlay';
  overlay.innerHTML = `
    <div class="imgview-close">&times;</div>
    <div class="imgview-hint">滚轮缩放 &middot; 拖拽平移 &middot; 双击还原</div>
    <div class="imgview-toolbar">
      <button class="imgview-zoom-in" title="放大">+</button>
      <button class="imgview-zoom-out" title="缩小">&minus;</button>
      <button class="imgview-reset" title="还原">&#8634;</button>
    </div>
    <img draggable="false" />
  `;
  document.body.appendChild(overlay);

  imgEl = overlay.querySelector('img') as HTMLImageElement;
  const closeBtn = overlay.querySelector('.imgview-close') as HTMLElement;
  const zoomInBtn = overlay.querySelector('.imgview-zoom-in') as HTMLElement;
  const zoomOutBtn = overlay.querySelector('.imgview-zoom-out') as HTMLElement;
  const resetBtn = overlay.querySelector('.imgview-reset') as HTMLElement;
  const hint = overlay.querySelector('.imgview-hint') as HTMLElement;

  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  zoomInBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomTo(currentScale * 1.4); });
  zoomOutBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomTo(currentScale / 1.4); });
  resetBtn.addEventListener('click', (e) => { e.stopPropagation(); resetView(); });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  overlay.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    zoomTo(currentScale * delta);
  }, { passive: false });

  overlay.addEventListener('dblclick', (e) => {
    e.preventDefault();
    if (currentScale > 1.05) {
      resetView();
    } else {
      zoomTo(2.5);
    }
  });

  overlay.addEventListener('mousedown', (e) => {
    if (currentScale <= 1) return;
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lastTranslateX = translateX;
    lastTranslateY = translateY;
    overlay!.classList.add('imgview-dragging');
  });

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  let fadeTimer = setTimeout(() => {
    if (hint) hint.style.opacity = '0';
  }, 2500);

  document.addEventListener('keydown', onKeyDown);
}

function onKeyDown(e: KeyboardEvent) {
  if (!overlay || !overlay.classList.contains('imgview-overlay')) return;
  if (e.key === 'Escape') close();
  if (e.key === '+' || e.key === '=') zoomTo(currentScale * 1.2);
  if (e.key === '-') zoomTo(currentScale / 1.2);
  if (e.key === '0') resetView();
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging || !imgEl) return;
  translateX = lastTranslateX + (e.clientX - startX);
  translateY = lastTranslateY + (e.clientY - startY);
  applyTransform();
}

function onMouseUp() {
  if (!isDragging) return;
  isDragging = false;
  overlay!.classList.remove('imgview-dragging');
}

function applyTransform() {
  if (!imgEl) return;
  imgEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

function zoomTo(scale: number) {
  currentScale = Math.max(0.2, Math.min(10, scale));
  applyTransform();
  if (overlay) {
    overlay.classList.toggle('imgview-zoomed', currentScale > 1.05);
  }
}

function resetView() {
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
  if (overlay) {
    overlay.classList.remove('imgview-zoomed');
  }
}

function open(src: string, alt: string) {
  createOverlay();
  if (!overlay || !imgEl) return;

  resetView();
  imgEl.src = src;
  imgEl.alt = alt;
  overlay.style.display = 'flex';
  requestAnimationFrame(() => {
    overlay!.classList.add('visible');
  });
  document.body.style.overflow = 'hidden';
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('visible');
  setTimeout(() => {
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 250);
}

function bindImages() {
  const container = document.getElementById(Layout.container);
  if (!container) return;

  const images = container.querySelectorAll('img:not(.imgview-bound)');
  images.forEach((img: Element) => {
    const imgEl = img as HTMLImageElement;
    imgEl.classList.add('imgview-bound');
    imgEl.style.cursor = 'zoom-in';
    imgEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      open(imgEl.src, imgEl.alt || '');
    });
  });
}

export default {
  doneEach() {
    setTimeout(() => bindImages(), 100);
  }
};
