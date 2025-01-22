export default {
  container: null as HTMLElement | null,

  ready() {
    console.info('wordcount ready');
  },

  doneEach() {
    this.init();
    this.updateCount();
    console.info('wordcount doneEach');
  },

  init() {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'word-count-container';
    container.style.textAlign = 'right';
    container.style.color = '#666';
    container.style.fontSize = '14px';
    container.style.padding = '8px 16px';
    container.style.borderRadius = '4px';

    // 插入到#container最前面
    const content = document.querySelector('#container');
    if (content) {
      content.insertBefore(container, content.firstChild);
      this.container = container;
      console.log('阅读时长插件已加载到#container顶部');
    }
  },

  updateCount() {
    if (!this.container) return;

    const content = document.querySelector('#container');
    if (!content) return;

    // 统计字数
    const text = content.textContent || '';
    const wordCount = this.countWords(text);
    const readingTime = this.calculateReadingTime(wordCount);

    // 更新显示
    this.container.innerHTML = `预计阅读时间：约${readingTime}分钟`;
  },

  countWords(text: string): number {
    // 简单统计：中文字符算1个，英文字符和数字算0.5个
    const chinese = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const english = (text.match(/[a-zA-Z0-9]/g) || []).length;
    return Math.round(chinese + english * 0.5);
  },

  calculateReadingTime(wordCount: number): number {
    // 按每分钟200字计算，至少1分钟
    return Math.max(1, Math.ceil(wordCount / 200));
  }
};
