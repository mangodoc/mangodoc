import Util from "../../util/util";

/**
 * BGM plugin for Shanshui theme
 * Floating music player in bottom-right corner.
 * Plays ambient background music.
 *
 * Config:
 *   bgm: "https://..."  — audio file URL
 *   bgmLoop: true        — loop playback (default true)
 *   bgmVolume: 0.3       — volume 0-1 (default 0.3)
 */
export default {
    ready() {
        this.createPlayer();
    },

    createPlayer() {
        const url = Util.getConfig('bgm');
        if (!url) return;

        const btn = document.createElement('div');
        btn.id = 'shanshui-bgm-btn';
        btn.style.cssText = `
            position: fixed; right: 16px; bottom: 90px;
            z-index: 1000; width: 32px; height: 32px;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(120,160,180,0.2);
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.06);
            transition: all 0.25s ease;
            color: #5A7D5E;
            user-select: none;
        `;
        btn.innerHTML = '<span>🎵</span>';
        btn.title = '播放背景音乐';
        document.body.appendChild(btn);

        // Create audio element
        const audio = document.createElement('audio');
        audio.id = 'shanshui-bgm';
        audio.src = url;
        audio.loop = Util.getConfig('bgmLoop') !== false;
        audio.volume = Util.getConfig('bgmVolume') || 0.3;
        audio.preload = 'metadata';

        let playing = false;
        const saved = localStorage.getItem('shanshui-bgm-playing');
        if (saved === 'true') {
            // Will resume on first user interaction
            playing = true;
        }

        btn.addEventListener('click', () => {
            playing = !playing;
            if (playing) {
                audio.play().catch(() => {
                    // Autoplay blocked — user needs to interact first
                    playing = false;
                    btn.innerHTML = '<span>🔇</span>';
                });
                btn.innerHTML = '<span>🔊</span>';
                btn.style.boxShadow = `0 0 16px rgba(90, 125, 94, 0.3)`;
            } else {
                audio.pause();
                btn.innerHTML = '<span>🎵</span>';
                btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
            }
            localStorage.setItem('shanshui-bgm-playing', String(playing));
        });

        // Resume playback if was playing
        if (playing) {
            const resumeOnce = () => {
                audio.play().then(() => {
                    btn.innerHTML = '<span>🔊</span>';
                    btn.style.boxShadow = `0 0 16px rgba(90, 125, 94, 0.3)`;
                }).catch(() => {});
                document.removeEventListener('click', resumeOnce);
                document.removeEventListener('touchstart', resumeOnce);
            };
            document.addEventListener('click', resumeOnce, { once: true });
            document.addEventListener('touchstart', resumeOnce, { once: true });
        }

        // Store audio reference
        (window as any)._shanshuiBgm = audio;
    }
};
