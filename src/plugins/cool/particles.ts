import Util from "../../util/util";

/**
 * Particle background plugin for cool theme
 * Draws animated particle network on a canvas behind the content.
 * Enabled by default for cool theme, performance-friendly.
 * Auto-pauses when tab is hidden.
 * 
 * Config:
 *   particles: false         — disable
 *   particlesCount: 50       — particle count (default 50)
 *   particlesSpeed: 0.4      — movement speed (default 0.4)
 */
export default {
    ready() {
        if (Util.getConfig('particles') === false) return;
        this.startParticles();
    },

    startParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'cool-particles-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const safeCtx: CanvasRenderingContext2D = ctx;

        let animId: number | null = null;

        const count = Util.getConfig('particlesCount') || 50;
        const speed = Util.getConfig('particlesSpeed') || 0.4;
        const themeColor = Util.getConfig('themeColor') || '#409EFF';
        // Derive a secondary color for gradient variety
        const color2 = '#a855f7';
        const linkDist = 150;
        const linkDistSq = linkDist * linkDist;

        interface Particle {
            x: number; y: number;
            vx: number; vy: number;
            size: number; baseSize: number;
            alpha: number; alphaDir: number;
            color: string;
        }
        let particles: Particle[] = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Init particles with varied sizes and colors
        const colors = [themeColor, color2, '#60a5fa', '#c084fc'];
        for (let i = 0; i < count; i++) {
            const baseSize = Math.random() * 2.5 + 1.2;
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                size: baseSize,
                baseSize: baseSize,
                alpha: Math.random() * 0.5 + 0.25,
                alphaDir: Math.random() > 0.5 ? 1 : -1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        function draw() {
            safeCtx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connection lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < linkDistSq) {
                        const dist = Math.sqrt(distSq);
                        const t = 1 - dist / linkDist;
                        safeCtx.beginPath();
                        safeCtx.moveTo(a.x, a.y);
                        safeCtx.lineTo(b.x, b.y);
                        safeCtx.strokeStyle = a.color;
                        safeCtx.globalAlpha = t * 0.25;
                        safeCtx.lineWidth = t * 0.8;
                        safeCtx.stroke();
                    }
                }
            }

            // Draw particles with glow
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Boundary wrap (smoother than bounce)
                if (p.x < -20) p.x = canvas.width + 20;
                if (p.x > canvas.width + 20) p.x = -20;
                if (p.y < -20) p.y = canvas.height + 20;
                if (p.y > canvas.height + 20) p.y = -20;

                // Breathing alpha
                p.alpha += p.alphaDir * 0.004;
                if (p.alpha > 0.75 || p.alpha < 0.15) p.alphaDir *= -1;
                // Subtle size pulse
                p.size = p.baseSize + Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.3;

                // Glow layer
                const gradient = safeCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                gradient.addColorStop(0, p.color + '66');
                gradient.addColorStop(1, p.color + '00');
                safeCtx.beginPath();
                safeCtx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                safeCtx.fillStyle = gradient;
                safeCtx.globalAlpha = p.alpha * 0.3;
                safeCtx.fill();

                // Core dot
                safeCtx.beginPath();
                safeCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                safeCtx.fillStyle = p.color;
                safeCtx.globalAlpha = p.alpha;
                safeCtx.fill();
            }

            safeCtx.globalAlpha = 1;
            safeCtx.lineWidth = 1;
            animId = requestAnimationFrame(draw);
        }

        // Pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && animId !== null) {
                cancelAnimationFrame(animId);
                animId = null;
            } else if (!document.hidden) {
                draw();
            }
        });

        draw();
    }
};
