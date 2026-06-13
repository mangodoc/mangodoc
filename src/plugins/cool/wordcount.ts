export default {
  container: null as any,
  _contentEl: null as any,

  ready() {
    console.info('[cool] wordcount ready');
  },

  doneEach() {
    this._contentEl = document.querySelector('#container');
    this.init();
    this.updateCount();
    console.info('[cool] wordcount doneEach');
  },

  init() {
    if (!this._contentEl) return;
    const container = document.createElement('div');
    container.className = 'word-count-container';
    container.style.cssText = `
      text-align: right;
      color: var(--cool-text-muted, #66668a);
      font-size: 13px;
      padding: 8px 16px;
      border-radius: 4px;
      opacity: 0.8;
    `;

    this._contentEl.insertBefore(container, this._contentEl.firstChild);
    this.container = container;
  },

  updateCount() {
    if (!this.container || !this._contentEl) return;

    const text = this._contentEl.textContent || '';
    const wordCount = this.countWords(text);
    const readingTime = this.calculateReadingTime(wordCount);

    this.container.innerHTML = `📖 约 ${wordCount} 字 · 阅读 ${readingTime} 分钟`;
  },

  countWords(text: string): number {
    const chinese = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const english = (text.match(/[a-zA-Z0-9]/g) || []).length;
    return Math.round(chinese + english * 0.5);
  },

  calculateReadingTime(wordCount: number): number {
    return Math.max(1, Math.ceil(wordCount / 200));
  }
};
