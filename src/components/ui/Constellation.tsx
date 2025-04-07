"use client";

import { motion, useAnimationControls, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface ConstellationProps {
    className?: string;
    starColor?: string;
    lineColor?: string;
    starCount?: number;
    pulseDuration?: number;
    starSize?: number;
    connectDistance?: number;

    avoidCenterRadius?: number;
}

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    pulseDuration: number;
    brightness: number;
    blinkDelay?: number;
    blinkDuration?: number;
}

interface Line {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
    weight: number;
}

export function Constellation({
    className = "",
    starColor = "var(--color-border-color)",
    lineColor = "var(--color-border-color)",
    starCount = 7,
    pulseDuration = 3,
    starSize = 1.5,
    connectDistance = 0.35,
    avoidCenterRadius = 60, // Area to avoid placing stars (around button)
}: ConstellationProps) {
    const [stars, setStars] = useState<Star[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const controls = useAnimationControls();

    useEffect(() => {
        // Generate random stars
        const generateStars = () => {
            const container = document.getElementById(
                "constellation-container"
            );
            if (!container) return;

            const rect = container.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });

            const newStars: Star[] = [];

            // Create a grid pattern with some randomness for more even distribution
            const gridSize = Math.floor(Math.sqrt(starCount * 1.5)); // Increase grid size for better distribution
            const cellWidth = rect.width / gridSize;
            const cellHeight = rect.height / gridSize;

            let currentCount = 0;

            // Center coordinates - to avoid placing stars in the center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Four corner stars for better distribution
            const cornerStars = [
                { x: rect.width * 0.2, y: rect.height * 0.2 },
                { x: rect.width * 0.8, y: rect.height * 0.2 },
                { x: rect.width * 0.2, y: rect.height * 0.8 },
                { x: rect.width * 0.8, y: rect.height * 0.8 },
            ];

            // Add corner stars first
            cornerStars.forEach((pos, idx) => {
                newStars.push({
                    id: currentCount++,
                    x: pos.x + (Math.random() * 30 - 15),
                    y: pos.y + (Math.random() * 30 - 15),
                    size: starSize * (1.0 + Math.random() * 0.3),
                    delay: 0.1 * idx,
                    pulseDuration: pulseDuration * (0.9 + Math.random() * 0.3),
                    brightness: 0.8 + Math.random() * 0.2,
                    blinkDelay: 5 + Math.random() * 10,
                    blinkDuration: 0.2 + Math.random() * 0.3,
                });
            });

            // Fill rest of space with stars
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (currentCount < starCount) {
                        // Add some randomness within each cell
                        const jitter = 0.7; // 0-1, how much randomness
                        const x = cellWidth * (i + jitter * Math.random());
                        const y = cellHeight * (j + jitter * Math.random());

                        // Check distance from center
                        const distFromCenter = Math.hypot(
                            x - centerX,
                            y - centerY
                        );

                        // Skip if too close to center (where button will be)
                        if (distFromCenter < avoidCenterRadius) {
                            continue;
                        }

                        // Ensure we don't place stars too close to the edge
                        const margin = 25;
                        const finalX = Math.max(
                            margin,
                            Math.min(rect.width - margin, x)
                        );
                        const finalY = Math.max(
                            margin,
                            Math.min(rect.height - margin, y)
                        );

                        // Make some stars smaller with varying brightness
                        const sizeVariation = Math.random();
                        const isMicroStar = sizeVariation < 0.4; // 40% chance of micro stars
                        const hasBlinkEffect = Math.random() < 0.3; // 30% chance of blinking effect

                        newStars.push({
                            id: currentCount++,
                            x: finalX,
                            y: finalY,
                            size: isMicroStar
                                ? starSize * (0.3 + Math.random() * 0.3)
                                : starSize * (0.6 + Math.random() * 0.5),
                            delay: Math.random() * 3,
                            pulseDuration: isMicroStar
                                ? pulseDuration * (1.2 + Math.random() * 0.8)
                                : pulseDuration * (0.8 + Math.random() * 0.4),
                            brightness: isMicroStar
                                ? 0.4 + Math.random() * 0.3
                                : 0.6 + Math.random() * 0.4,
                            ...(hasBlinkEffect
                                ? {
                                      blinkDelay: 7 + Math.random() * 15,
                                      blinkDuration: 0.1 + Math.random() * 0.2,
                                  }
                                : {}),
                        });
                    }
                }
            }

            // If we don't have enough stars, add some more randomly
            while (currentCount < starCount) {
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;

                // Check distance from center
                const distFromCenter = Math.hypot(x - centerX, y - centerY);

                // Skip if too close to center
                if (distFromCenter < avoidCenterRadius) {
                    continue;
                }

                newStars.push({
                    id: currentCount++,
                    x,
                    y,
                    size: starSize * (0.4 + Math.random() * 0.6),
                    delay: Math.random() * 3,
                    pulseDuration: pulseDuration * (0.8 + Math.random() * 0.4),
                    brightness: 0.5 + Math.random() * 0.5,
                    blinkDelay:
                        Math.random() < 0.3
                            ? 7 + Math.random() * 15
                            : undefined,
                    blinkDuration:
                        Math.random() < 0.3
                            ? 0.1 + Math.random() * 0.2
                            : undefined,
                });
            }

            setStars(newStars);
        };

        generateStars();

        const handleResize = () => {
            generateStars();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [
        starCount,
        pulseDuration,
        starSize,
        connectDistance,
        avoidCenterRadius,
    ]);

    // Find lines between nearby stars (simple distance-based algorithm)
    const lines: Line[] = stars.flatMap((star, i) => {
        return stars
            .slice(i + 1)
            .map((otherStar, j) => {
                const distance = Math.hypot(
                    star.x - otherStar.x,
                    star.y - otherStar.y
                );
                // Only connect stars that are relatively close
                if (distance < dimensions.width * connectDistance) {
                    const distanceRatio =
                        distance / (dimensions.width * connectDistance);
                    // Make closer stars have stronger connections
                    const baseOpacity = 0.2 + (1 - distanceRatio) * 0.6;
                    // Adjust opacity based on star brightness
                    const finalOpacity =
                        baseOpacity *
                        ((star.brightness + otherStar.brightness) / 2);

                    // Adjust line weight based on star size and distance
                    const weight =
                        0.1 +
                        0.3 *
                            (1 - distanceRatio) * // Distance factor
                            ((star.size + otherStar.size) / (2 * starSize)); // Size factor

                    return {
                        id: `${star.id}-${otherStar.id}`,
                        x1: star.x,
                        y1: star.y,
                        x2: otherStar.x,
                        y2: otherStar.y,
                        opacity: finalOpacity,
                        weight: weight,
                    };
                }
                return null;
            })
            .filter((line): line is Line => line !== null);
    });

    // Create blink and pulse variants for stars
    const createStarVariants = (star: Star): Variants => {
        if (star.blinkDelay) {
            return {
                // Blinking star animation
                initial: { opacity: 0, scale: 0 },
                animate: {
                    opacity: [
                        star.brightness * 0.4,
                        star.brightness,
                        star.brightness * 0.4,
                        0, // blink off
                        star.brightness * 0.7,
                        star.brightness * 0.4,
                    ],
                    scale: [0.8, 1.2, 0.8, 0.2, 1, 0.8],
                    transition: {
                        duration: star.pulseDuration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.8, 0.81, 0.9, 1],
                        repeatDelay: star.blinkDelay,
                    },
                },
            };
        } else {
            return {
                // Regular pulsing star animation
                initial: { opacity: 0, scale: 0 },
                animate: {
                    opacity: [
                        star.brightness * 0.4,
                        star.brightness,
                        star.brightness * 0.4,
                    ],
                    scale: [0.8, 1.2, 0.8],
                    transition: {
                        duration: star.pulseDuration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                },
            };
        }
    };

    return (
        <div
            id="constellation-container"
            className={`relative overflow-hidden w-full h-full ${className}`}
        >
            <svg className="absolute inset-0 w-full h-full">
                {/* Lines between stars */}
                {lines.map((line) => (
                    <motion.line
                        key={line.id}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke={lineColor}
                        strokeWidth={line.weight}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: line.opacity }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Stars */}
                {stars.map((star) => {
                    const variants = createStarVariants(star);

                    return (
                        <motion.circle
                            key={star.id}
                            cx={star.x}
                            cy={star.y}
                            r={star.size}
                            fill={starColor}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                        />
                    );
                })}
            </svg>
        </div>
    );
}
