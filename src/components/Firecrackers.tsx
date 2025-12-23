'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Firecrackers() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize confetti with our custom canvas
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true,
        });

        // Modern Neon Palette
        const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // "Crossfire" Effect - shooting from corners across the screen
            myConfetti({
                particleCount,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
                startVelocity: 60, // Faster
                gravity: 1.2, // Heavier feel
                drift: 1, // Slight drift
                scalar: 1.2, // Larger particles
                shapes: ['circle', 'square'], // Modern geometry
            });
            myConfetti({
                particleCount,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
                startVelocity: 60,
                gravity: 1.2,
                drift: -1,
                scalar: 1.2,
                shapes: ['circle', 'square'],
            });
        }, 600);

        return () => {
            clearInterval(interval);
            myConfetti.reset();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        />
    );
}
