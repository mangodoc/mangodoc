export default {
  container: null as HTMLElement | null,

  ready() {
    console.info('[cool] wordcount ready');
  },

  doneEach() {
    this.init();
    this.updateCount();
    console.info('[cool] wordcount doneEach');
  },

  init() {
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

    const content = document.querySelector('#container');
    if (content) {
      content.insertBefore(container, content.firstChild);
      this.container = container;
    }
  },

  updateCount() {
    if (!this.container) return;
    const content = document.querySelector('#container');
    if (!content) return;

    const text = content.textContent || '';
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
