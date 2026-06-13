export default {
    _contentEl: null as any,
    _barEl: null as any,
    _btnEl: null as any,

    ready() {
        this.createProgressBar();
        this.createBackToTop();
    },

    doneEach() {
        this.fadeInContent();
        this.updateProgressBar();
        this.checkBackToTop();
    },

    mounted() {
        this.setupScrollListener();
    },

    createProgressBar() {
        if (document.getElementById('cool-progress-bar')) return;
        const bar = document.createElement('div');
        bar.id = 'cool-progress-bar';
        document.body.prepend(bar);
        this._barEl = bar;
    },

    fadeInContent() {
        const el = document.getElementById('container');
        if (!el) return;

        el.style.transition = 'none';
        el.style.opacity = '0.5';
        el.style.transform = 'translateY(6px)';
        void el.offsetHeight;
        el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        setTimeout(() => { el.style.transition = ''; }, 400);
    },

    createBackToTop() {
        if (document.getElementById('cool-back-top')) return;
        const btn = document.createElement('div');
        btn.id = 'cool-back-top';
        btn.className = 'cool-float';
        btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;
        btn.addEventListener('click', () => {
            const el = this._contentEl;
            if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btn);
        this._btnEl = btn;
    },

    checkBackToTop() {
        setTimeout(() => this.toggleBackToTop(), 100);
    },

    toggleBackToTop() {
        const btn = this._btnEl;
        if (!btn) return;
        const el = this._contentEl;
        if (!el) return;
        btn.classList.toggle('visible', el.scrollTop > 300);
    },

    updateProgressBar() {
        setTimeout(() => { this.setProgressWidth(); }, 50);
    },

    setupScrollListener() {
        const contentEl = document.getElementById('content');
        if (!contentEl) return;
        this._contentEl = contentEl;

        let ticking = false;
        contentEl.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.setProgressWidth();
                    this.toggleBackToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    setProgressWidth() {
        const bar = this._barEl || document.getElementById('cool-progress-bar');
        if (!bar) return;
        const el = this._contentEl;
        if (!el) return;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const p = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
        bar.style.width = (p * 100) + '%';
    }
};
