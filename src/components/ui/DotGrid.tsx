"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";

interface DotGridProps {
    className?: string;
    dotColor?: string;
    dotOpacity?: number;
    dotSize?: number;
    minGap?: number;
    dark?: boolean;
    cursorEffect?: boolean;
    cursorRadius?: number;
    hoverOpacity?: number;
}

export function DotGrid({
    className,
    dotColor = "#d9d9d9",
    dotOpacity = 0.35,
    dotSize = 4,
    minGap = 20,
    dark = false,
    cursorEffect = true,
    cursorRadius = 120,
    hoverOpacity = 0.9,
}: DotGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        columns: 0,
        rows: 0,
        gap: 0,
    });
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
    const [isHovering, setIsHovering] = useState(false);

    const calculateGrid = useCallback(() => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        // Calculate how many dots we can fit with minimum gap
        const columnsWithMinGap = Math.floor(
            containerWidth / (dotSize + minGap)
        );
        const rowsWithMinGap = Math.floor(containerHeight / (dotSize + minGap));

        // Calculate actual gap to distribute space evenly
        const gapX =
            columnsWithMinGap > 1
                ? (containerWidth - columnsWithMinGap * dotSize) /
                  (columnsWithMinGap - 1)
                : minGap;
        const gapY =
            rowsWithMinGap > 1
                ? (containerHeight - rowsWithMinGap * dotSize) /
                  (rowsWithMinGap - 1)
                : minGap;

        // Use the smaller gap to maintain square pattern
        const gap = Math.min(gapX, gapY);

        // Recalculate columns and rows with the final gap
        const columns = Math.floor((containerWidth + gap) / (dotSize + gap));
        const rows = Math.floor((containerHeight + gap) / (dotSize + gap));

        setDimensions({ columns, rows, gap });
    }, [dotSize, minGap]);

    useEffect(() => {
        calculateGrid();

        const resizeObserver = new ResizeObserver(calculateGrid);
        const currentContainer = containerRef.current;

        if (currentContainer) {
            resizeObserver.observe(currentContainer);
        }

        // Handle mouse move for cursor effect
        const handleMouseMove = (e: MouseEvent) => {
            if (!currentContainer || !cursorEffect) return;

            const rect = currentContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setMousePosition({ x, y });
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Handle mouse leave
        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        if (currentContainer) {
            currentContainer.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (currentContainer) {
                resizeObserver.unobserve(currentContainer);
                currentContainer.removeEventListener(
                    "mouseleave",
                    handleMouseLeave
                );
            }
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [cursorEffect, calculateGrid]);

    // Get dot opacity based on distance from cursor
    const getDotOpacity = (row: number, col: number) => {
        if (!cursorEffect || !isHovering) return dotOpacity;

        // Calculate dot position
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const containerHeight = containerRef.current?.offsetHeight || 0;
        const gridWidth =
            dimensions.columns * dotSize +
            (dimensions.columns - 1) * dimensions.gap;
        const gridHeight =
            dimensions.rows * dotSize + (dimensions.rows - 1) * dimensions.gap;
        const offsetX = (containerWidth - gridWidth) / 2;
        const offsetY = (containerHeight - gridHeight) / 2;

        const x = offsetX + col * (dotSize + dimensions.gap) + dotSize / 2;
        const y = offsetY + row * (dotSize + dimensions.gap) + dotSize / 2;

        // Calculate distance from cursor
        const dx = x - mousePosition.x;
        const dy = y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= cursorRadius) {
            // Linear falloff based on distance
            const t = 1 - distance / cursorRadius;
            return dotOpacity + t * (hoverOpacity - dotOpacity);
        }

        return dotOpacity;
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "absolute top-0 left-0 w-full h-full",
                dark ? "dark:hidden" : "",
                className
            )}
            style={{ zIndex: 10 }}
        >
            {dimensions.columns > 0 && dimensions.rows > 0 && (
                <div
                    className="grid relative"
                    style={{
                        gridTemplateColumns: `repeat(${dimensions.columns}, ${dotSize}px)`,
                        gridTemplateRows: `repeat(${dimensions.rows}, ${dotSize}px)`,
                        gap: `${dimensions.gap}px`,
                        justifyContent: "center",
                        alignContent: "center",
                        height: "100%",
                    }}
                >
                    {Array.from({
                        length: dimensions.columns * dimensions.rows,
                    }).map((_, i) => {
                        const col = i % dimensions.columns;
                        const row = Math.floor(i / dimensions.columns);
                        const currentOpacity = getDotOpacity(row, col);

                        return (
                            <div
                                key={i}
                                className="relative flex items-center justify-center"
                                style={{
                                    width: `${dotSize}px`,
                                    height: `${dotSize}px`,
                                    opacity: currentOpacity,
                                    transition: "opacity 0.3s ease-out",
                                }}
                            >
                                {/* Vertical line of the plus */}
                                <div
                                    className="absolute top-0 left-1/2 w-[1px] h-full -translate-x-1/2"
                                    style={{ backgroundColor: dotColor }}
                                ></div>
                                {/* Horizontal line of the plus */}
                                <div
                                    className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2"
                                    style={{ backgroundColor: dotColor }}
                                ></div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
