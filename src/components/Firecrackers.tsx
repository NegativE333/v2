'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Firecrackers() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        class SaluteEmoji {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            swayOffset: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = canvas!.height + Math.random() * 100;
                this.size = Math.random() * 30 + 20; // 20-50px size
                this.speedY = Math.random() * 1.5 + 0.5; // Float speed
                this.speedX = 0;
                this.swayOffset = Math.random() * 100;
                this.opacity = 0;
            }

            update() {
                this.y -= this.speedY; // Move up
                this.x += Math.sin((this.y + this.swayOffset) * 0.01) * 0.5; // Gentle sway

                // Fade in at bottom, fade out at top (Max opacity 0.3)
                if (this.y > canvas!.height - 100) {
                    this.opacity = Math.min(this.opacity + 0.01, 0.3);
                } else if (this.y < 100) {
                    this.opacity -= 0.005;
                }

                // Reset
                if (this.y < -50 || this.opacity <= 0) {
                    this.reset();
                }
            }

            reset() {
                this.y = canvas!.height + 50;
                this.x = Math.random() * canvas!.width;
                this.opacity = 0;
                this.speedY = Math.random() * 1.5 + 0.5;
            }

            draw() {
                ctx!.globalAlpha = this.opacity;
                ctx!.font = `${this.size}px serif`;
                ctx!.textAlign = 'center';
                ctx!.textBaseline = 'middle';
                ctx!.fillText('🫡', this.x, this.y);
            }
        }

        const emojis: SaluteEmoji[] = [];
        // Create 15 floating emojis (Reduced from 40 for subtlety)
        for (let i = 0; i < 15; i++) {
            emojis.push(new SaluteEmoji());
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            emojis.forEach(emoji => {
                emoji.update();
                emoji.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1
            }}
        />
    );
}
