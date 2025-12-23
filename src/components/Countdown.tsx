'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownProps {
    targetDate: string;
    onComplete?: () => void;
}

export default function Countdown({ targetDate, onComplete }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Target Date parsed from prop
        const target = new Date(targetDate);

        const calculateTimeLeft = () => {
            const difference = +target - +new Date();

            if (difference <= 0) {
                if (onComplete) onComplete();
                // Don't update state to avoid re-renders if parent unmounts/changes
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="countdown-container">
                <div className="countdown-loading">
                    <div className="loading-spinner" />
                </div>
            </div>
        );
    }

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className="countdown-container">
            <div className="countdown-grid">
                {timeUnits.map((unit) => (
                    <div key={unit.label} className="countdown-item">
                        <div className="countdown-value">
                            {unit.value.toString().padStart(2, '0')}
                        </div>
                        <div className="countdown-label">{unit.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
