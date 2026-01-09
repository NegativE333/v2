'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Countdown from '@/components/Countdown';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
    ssr: false,
    loading: () => (
        <div className="video-card">
            <div className="video-container">
                <div className="video-wrapper">
                    <div className="video-loading">
                        <div className="loading-spinner" />
                    </div>
                </div>
            </div>
        </div>
    ),
});

import Snowfall from '@/components/Snowfall';
import Firecrackers from '@/components/Firecrackers';
import CancellationNotice from '@/components/CancellationNotice';

export default function Home() {
    const videoUrl = "https://ik.imagekit.io/52eyzwbyy/InShot_20251223_102216894.mp4/ik-master.m3u8?tr=sr-240_360_480_720_1080_2160";
    const TARGET_DATE = '2025-12-27T12:47:00';
    
    // Check if premiere is cancelled via environment variable
    const isCancelled = false;

    const [isReleased, setIsReleased] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showFirecrackers, setShowFirecrackers] = useState(false);
    const [isGolden, setIsGolden] = useState(false);

    useEffect(() => {
        // If cancelled, skip release check
        if (isCancelled) {
            setIsLoading(false);
            return;
        }

        const checkRelease = () => {
            const now = new Date();
            const target = new Date(TARGET_DATE);

            if (now >= target) {
                setIsReleased(true);
            }
            setIsLoading(false);
        };

        checkRelease();
    }, [isCancelled]);

    const handleCountdownComplete = () => {
        setIsReleased(true);
    };

    if (isLoading) {
        return (
            <div className="page" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="video-loading">
                    <div className="loading-spinner" />
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <Snowfall />
            {showFirecrackers && <Firecrackers />}

            {/* Main Content */}
            <main className="main">
                <div className="container">
                    {/* Hero */}
                    <div className="hero">
                        <p className="hero-eyebrow">
                            {isCancelled 
                                ? "Premiere Cancelled" 
                                : isReleased 
                                    ? "Live Now" 
                                    : "Christmas Special • December 25, 2025"}
                        </p>
                        <h1 className={`hero-title ${isGolden ? 'text-golden' : ''}`}>{"Oh Unde!"}</h1>
                        <p className="hero-description">
                            {isCancelled 
                                ? "" 
                                : isReleased 
                                    ? "The story of a man who fought the deadline... and lost." 
                                    : "The story of a man who fought the deadline... and lost. Premieres at Midnight."}
                        </p>
                    </div>

                    {/* Content Card (Cancellation, Countdown, or Video) */}
                    <div className="video-card">
                        {isCancelled ? (
                            <CancellationNotice />
                        ) : isReleased ? (
                            <VideoPlayer
                                src={videoUrl}
                                title="Oh Unde!"
                                onFireworkTrigger={setShowFirecrackers}
                                onGoldenTrigger={setIsGolden}
                            />
                        ) : (
                            <Countdown targetDate={TARGET_DATE} onComplete={handleCountdownComplete} />
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p className="footer-text">
                        {isCancelled 
                            ? "Maybe next time?"
                            : isReleased 
                                ? "See you again on 25 Dec 2026!" 
                                : "See you on the 25th!"}
                    </p>
                </div>
            </footer>
        </div>
    );
}
