'use client';

import { useEffect, useState } from 'react';

export default function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<number[]>([]);

    useEffect(() => {
        // Create 50 snowflakes
        const flakes = Array.from({ length: 50 }, (_, i) => i);
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="snowfall-container">
            {snowflakes.map((i) => {
                const left = Math.random() * 100;
                // Slower animation: 15-30s
                const animDuration = 15 + Math.random() * 15;
                const animDelay = Math.random() * 20; // 0-20s delay
                // Lower opacity: 0.1 - 0.3
                const opacity = 0.1 + Math.random() * 0.2;
                // Smaller size: 2px - 5px
                const size = 2 + Math.random() * 3;

                return (
                    <div
                        key={i}
                        className="snowflake"
                        style={{
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: opacity,
                            animationDuration: `${animDuration}s, ${animDuration * 0.3 + Math.random() * 5}s`, // Fall duration, Sway duration
                            animationDelay: `-${animDelay}s, -${animDelay}s`, // Negative delay to start mid-animation
                        }}
                    />
                );
            })}
        </div>
    );
}
