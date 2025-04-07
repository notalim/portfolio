"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
    minimumLoadingTime?: number; // minimum time to show loading screen in ms
}

export function LoadingScreen({
    minimumLoadingTime = 2000,
}: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Handle SSR
        setMounted(true);

        // Start time to ensure minimum display time
        const startTime = Date.now();

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                // Accelerate progress as it gets closer to 100
                const increment = Math.max(1, (100 - prev) / 15);
                const newProgress = Math.min(99, prev + increment);
                return newProgress;
            });
        }, 100);

        // When the page is fully loaded
        const handleLoad = () => {
            clearInterval(interval);

            // Calculate remaining time to meet minimum display duration
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

            // Complete progress after remaining time
            setTimeout(() => {
                setProgress(100);
                setIsComplete(true);

                // Fade out after completion
                setTimeout(() => {
                    setIsVisible(false);
                }, 600);
            }, remainingTime);
        };

        // Listen for page load
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener("load", handleLoad);
        };
    }, [minimumLoadingTime]);

    // Don't render anything during SSR
    if (!mounted) return null;

    // After fade out, don't render anything
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
        >
            <div className="w-full max-w-md px-8">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                        className="font-serif text-8xl font-light text-primary-text tracking-tight flex items-baseline"
                    >
                        <span className="font-serif">not</span>
                        <span className="font-sans italic">alim</span>
                    </motion.div>
                </div>

                {/* Grid pattern decorative element */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.08] -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.08, scale: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className="relative">
                                <div className="absolute inset-0 border-[0.5px] border-primary-text"></div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative w-full h-[1px] bg-border-color/30">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary-text"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-secondary-text"
                    >
                        putting the not in the notable
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-secondary-text"
                    >
                        {Math.round(progress)}%
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
