import Util from "../../util/util";

/**
 * Dark mode plugin for cool theme
 * Provides dark/light mode toggle with localStorage persistence.
 * Sets window._coolToggleDark as the primary click handler (used by nav.ts onclick).
 * Also adds document-level delegation as a fallback.
 */
const plugin = {
    _lastToggle: 0,

    ready() {
        this.initDarkMode();
    },

    initDarkMode() {
        this.injectDarkModeStyles();

        const saved = localStorage.getItem('cool-dark-mode');
        let isDark: boolean;

        if (saved !== null) {
            isDark = saved === 'true';
        } else if (Util.getConfig('darkMode') === true) {
            isDark = true;
        } else if (Util.getConfig('darkMode') === false) {
            isDark = false;
        } else {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        // Install global toggle function — used by nav.ts onclick
        const self = this;
        window._coolToggleDark = function() {
            self._lastToggle = Date.now();
            const isDark = document.body.classList.contains('dark-mode');
            self.applyTheme(!isDark, true);
        };

        this.applyTheme(isDark, false);
        this.setupFallbackListener();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem('cool-dark-mode') === null &&
                Util.getConfig('darkMode') !== true &&
                Util.getConfig('darkMode') !== false) {
                this.applyTheme(e.matches, true);
            }
        });
    },

    injectDarkModeStyles() {
        const styleId = 'cool-dark-mode-vars';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            body.dark-mode {
                --cool-bg-primary: #070714;
                --cool-bg-secondary: #0f0f24;
                --cool-bg-tertiary: #16163a;
                --cool-bg-glass: rgba(15, 15, 36, 0.72);
                --cool-bg-overlay: rgba(7, 7, 20, 0.55);
                --cool-text-primary: #e8e8f4;
                --cool-text-secondary: #9a9abe;
                --cool-text-muted: #5e5e82;
                --cool-border: rgba(255, 255, 255, 0.05);
                --cool-border-glass: rgba(255, 255, 255, 0.09);
                --cool-gradient-bg: linear-gradient(135deg, #070714 0%, #0f0f24 30%, #0a0a1e 60%, #0f0f24 100%);
            }
            body.light-mode {
                --cool-bg-primary: #f4f6fb;
                --cool-bg-secondary: #ffffff;
                --cool-bg-tertiary: #eef0f5;
                --cool-bg-glass: rgba(255, 255, 255, 0.78);
                --cool-bg-overlay: rgba(255, 255, 255, 0.7);
                --cool-text-primary: #1a1a2e;
                --cool-text-secondary: #4a4a6a;
                --cool-text-muted: #8888aa;
                --cool-border: rgba(0, 0, 0, 0.05);
                --cool-border-glass: rgba(0, 0, 0, 0.07);
                --cool-gradient-bg: linear-gradient(135deg, #eef2ff 0%, #f8f9fc 50%, #e8ecf8 100%);
            }
            body.light-mode pre,
            body.light-mode pre[class*="language-"] { background: #0d0d22 !important; }
            body.light-mode pre code { color: #d4d4e8 !important; }
            @keyframes cool-toggle-spin {
                0% { transform: rotate(0deg) scale(0.8); opacity: 0.5; }
                50% { transform: rotate(180deg) scale(1.15); }
                100% { transform: rotate(360deg) scale(1); opacity: 1; }
            }
            #cool-dark-toggle.cool-toggle-anim i {
                animation: cool-toggle-spin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
    },

    applyTheme(isDark: boolean, animate = true) {
        const body = document.body;
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(isDark ? 'dark-mode' : 'light-mode');

        const icon = document.getElementById('cool-dark-icon');
        if (icon) icon.className = isDark ? 'el-icon-sunny' : 'el-icon-moon';

        if (animate) {
            const toggle = document.getElementById('cool-dark-toggle');
            if (toggle) {
                toggle.classList.remove('cool-toggle-anim');
                void toggle.offsetWidth;
                toggle.classList.add('cool-toggle-anim');
                setTimeout(() => toggle.classList.remove('cool-toggle-anim'), 600);
            }
        }

        localStorage.setItem('cool-dark-mode', String(isDark));
    },

    /** Document-level delegation: skip if onclick already handled it */
    setupFallbackListener() {
        const self = this;
        self._lastToggle = 0;
        document.addEventListener('click', function(e) {
            const target = e.target as HTMLElement;
            const toggle = target.closest('#cool-dark-toggle');
            if (!toggle) return;
            // If onclick (which fires first) already ran, skip
            const since = Date.now() - self._lastToggle;
            if (since < 200) return;
            self._lastToggle = Date.now();
            const isDark = document.body.classList.contains('dark-mode');
            self.applyTheme(!isDark, true);
        });
    }
};

export default plugin;

// TypeScript global declaration
declare global {
    interface Window {
        _coolToggleDark: () => void;
    }
}
