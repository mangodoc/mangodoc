import Util from "../../util/util";

const PRESET_COLORS = [
    { color: '#409EFF', label: '蓝' },
    { color: '#667eea', label: '靛' },
    { color: '#a855f7', label: '紫' },
    { color: '#ec4899', label: '粉' },
    { color: '#f43f5e', label: '玫' },
    { color: '#f97316', label: '橙' },
    { color: '#22c55e', label: '绿' },
    { color: '#06b6d4', label: '青' },
];

export default {
    ready() {
        this.applySavedColor();
        this.injectColorSwatch();
    },

    injectColorSwatch() {
        if (document.getElementById('cool-color-swatch')) return;

        const poll = setInterval(() => {
            const header = document.getElementById('header');
            const darkToggle = document.getElementById('cool-dark-toggle');
            if (!header || !darkToggle) return;
            clearInterval(poll);

            const wrapper = document.createElement('span');
            wrapper.id = 'cool-color-swatch';
            wrapper.style.cssText = 'display:inline-flex;align-items:center;margin-left:6px;position:relative;vertical-align:middle';

            const dot = document.createElement('span');
            dot.id = 'cool-color-dot';
            this.updateDot(dot, this.getCurrentColor());

            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePopover(wrapper, dot);
            });

            let hoverTimer: any = null;
            dot.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimer);
                dot.style.opacity = '1';
                dot.style.borderColor = 'rgba(255,255,255,0.25)';
                dot.style.transform = 'scale(1.15)';
            });
            dot.addEventListener('mouseleave', () => {
                if (!wrapper.classList.contains('open')) {
                    hoverTimer = setTimeout(() => {
                        this.dotIdle(dot);
                    }, 200);
                }
            });

            wrapper.appendChild(dot);
            header.insertBefore(wrapper, darkToggle);

            document.addEventListener('click', (e: any) => {
                if (wrapper.contains(e.target)) return;
                this.closePopover(wrapper, dot);
            });
        }, 200);
    },

    dotIdle(dot: HTMLElement) {
        dot.style.opacity = '0.5';
        dot.style.borderColor = 'rgba(255,255,255,0.12)';
        dot.style.transform = 'scale(1)';
    },

    updateDot(dot: HTMLElement, color: string) {
        dot.style.cssText = `display:inline-block;width:14px;height:14px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.12);cursor:pointer;transition:all 0.25s ease;opacity:0.5;box-sizing:border-box`;
    },

    togglePopover(w: HTMLElement, d: HTMLElement) {
        const existing = document.getElementById('cool-color-popover');
        if (existing) { this.closePopover(w, d); return; }
        this.openPopover(w, d);
    },

    openPopover(w: HTMLElement, d: HTMLElement) {
        w.classList.add('open');
        d.style.opacity = '1';
        d.style.borderColor = 'rgba(255,255,255,0.25)';

        const pop = document.createElement('div');
        pop.id = 'cool-color-popover';
        pop.style.cssText = 'position:absolute;top:100%;right:0;margin-top:8px;background:rgba(15,15,36,0.92);' +
            'backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.09);border-radius:10px;' +
            'padding:10px;box-shadow:0 8px 32px rgba(0,0,0,0.5);z-index:200;' +
            'display:grid;grid-template-columns:repeat(4,1fr);gap:6px;min-width:160px';

        const cur = this.getCurrentColor();
        for (const p of PRESET_COLORS) {
            const btn = document.createElement('div');
            const active = p.color.toLowerCase() === cur.toLowerCase();
            btn.style.cssText = `width:32px;height:32px;border-radius:50%;background:${p.color};cursor:pointer;` +
                `transition:all 0.2s ease;border:${active ? '2px solid #fff' : '2px solid rgba(255,255,255,0.08)'};` +
                `box-shadow:${active ? '0 0 12px ' + p.color + '66' : 'none'}`;
            btn.title = p.label;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setColor(p.color);
                this.closePopover(w, d);
            });
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.15)';
                btn.style.boxShadow = '0 0 16px ' + p.color + '66';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                const now = this.getCurrentColor().toLowerCase();
                const isNow = p.color.toLowerCase() === now;
                btn.style.boxShadow = isNow ? '0 0 12px ' + p.color + '66' : 'none';
                btn.style.border = isNow ? '2px solid #fff' : '2px solid rgba(255,255,255,0.08)';
            });
            pop.appendChild(btn);
        }
        w.appendChild(pop);
    },

    closePopover(w: HTMLElement, d: HTMLElement) {
        w.classList.remove('open');
        this.dotIdle(d);
        const p = document.getElementById('cool-color-popover');
        if (p) p.remove();
    },

    /** Apply new theme color */
    setColor(newColor: string) {
        const r = parseInt(newColor.slice(1, 3), 16);
        const g = parseInt(newColor.slice(3, 5), 16);
        const b = parseInt(newColor.slice(5, 7), 16);
        const rgb = `${r}, ${g}, ${b}`;

        // 1. Update CSS custom properties — affects rules using var(--cool-theme)
        const root = document.documentElement;
        root.style.setProperty('--cool-theme', newColor);
        root.style.setProperty('--cool-theme-rgb', rgb);

        // 2. Rebuild the core style tag: replace old hex color with new
        const style = document.querySelector('style[data-cool-theme="core"]');
        if (style) {
            try {
                let css = style.textContent || '';
                const hexMatch = css.match(/--cool-theme:\s*(#[0-9a-fA-F]{6})/);
                let oldColor: string;
                if (hexMatch && hexMatch[1]) {
                    oldColor = hexMatch[1];
                } else {
                    oldColor = (Util.getConfig('themeColor') || '#409EFF') as string;
                }
                // Replace old hex everywhere
                css = css.split(oldColor).join(newColor);

                // Also replace old RGB with new RGB
                const oR = parseInt(oldColor.slice(1, 3), 16);
                const oG = parseInt(oldColor.slice(3, 5), 16);
                const oB = parseInt(oldColor.slice(5, 7), 16);
                css = css.split(`${oR}, ${oG}, ${oB}`).join(rgb);

                style.textContent = css;
            } catch (e) {
                // If rebuild fails, CSS vars still work for var() rules
                console.warn('colorpicker rebuild failed, CSS vars still active', e);
            }
        }

        // 3. Update the dot
        const dot = document.getElementById('cool-color-dot');
        if (dot) dot.style.background = newColor;

        // 4. Persist
        localStorage.setItem('cool-theme-color', newColor);
        if (window.$mangodoc) window.$mangodoc.themeColor = newColor;
    },

    applySavedColor() {
        const saved = localStorage.getItem('cool-theme-color');
        if (!saved) return;
        const current = this.getConfigColor();
        if (saved.toLowerCase() === current.toLowerCase()) return;

        const poll = setInterval(() => {
            if (!document.querySelector('style[data-cool-theme="core"]')) return;
            clearInterval(poll);
            this.setColor(saved);
            // Update dot if already injected
            const dot = document.getElementById('cool-color-dot');
            if (dot) dot.style.background = saved;
        }, 50);
        setTimeout(() => clearInterval(poll), 3000);
    },

    getCurrentColor(): string {
        return localStorage.getItem('cool-theme-color') || this.getConfigColor();
    },

    getConfigColor(): string {
        return (Util.getConfig('themeColor') || '#409EFF') as string;
    }
};
