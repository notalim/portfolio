"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";

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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const gridRef = useRef({ columns: 0, rows: 0, gap: 0 });
    const requestRef = useRef<number | null>(null);
    const dotsPositionsRef = useRef<{ x: number; y: number }[]>([]);

    // Draw the grid on canvas
    const drawGrid = useCallback(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Scale for high DPI displays
        const dpr = window.devicePixelRatio || 1;
        ctx.scale(dpr, dpr);

        // Set line width
        ctx.lineWidth = 1;

        // Process dot color
        let color = dotColor;
        if (color.startsWith("var(")) {
            // Extract variable name
            const varName = color.replace("var(", "").replace(")", "");
            // Get computed color from CSS variable
            color =
                getComputedStyle(document.documentElement).getPropertyValue(
                    varName
                ) || "#d9d9d9";
        }

        // Draw dots
        dotsPositionsRef.current.forEach((dot) => {
            const { x, y } = dot;

            // Calculate opacity based on cursor proximity
            let opacity = dotOpacity;

            if (cursorEffect && mouseRef.current.active) {
                const dx = x - mouseRef.current.x;
                const dy = y - mouseRef.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= cursorRadius) {
                    // Linear falloff based on distance
                    const t = 1 - distance / cursorRadius;
                    opacity = dotOpacity + t * (hoverOpacity - dotOpacity);
                }
            }

            // Set dot opacity
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = color;

            // Draw the plus shape (cross)
            // Vertical line
            ctx.beginPath();
            ctx.moveTo(x, y - dotSize / 2);
            ctx.lineTo(x, y + dotSize / 2);
            ctx.stroke();

            // Horizontal line
            ctx.beginPath();
            ctx.moveTo(x - dotSize / 2, y);
            ctx.lineTo(x + dotSize / 2, y);
            ctx.stroke();
        });

        // Reset scale
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }, [
        dotColor,
        dotOpacity,
        dotSize,
        cursorEffect,
        cursorRadius,
        hoverOpacity,
    ]);

    // Calculate grid dimensions and dot positions
    const calculateGrid = useCallback(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;

        // Match canvas size to container
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // Calculate grid dimensions
        const containerWidth = rect.width;
        const containerHeight = rect.height;

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

        // Calculate final columns and rows
        const columns = Math.floor((containerWidth + gap) / (dotSize + gap));
        const rows = Math.floor((containerHeight + gap) / (dotSize + gap));

        gridRef.current = { columns, rows, gap };

        // Calculate dot positions
        const dots: { x: number; y: number }[] = [];
        const gridWidth = columns * dotSize + (columns - 1) * gap;
        const gridHeight = rows * dotSize + (rows - 1) * gap;
        const offsetX = (containerWidth - gridWidth) / 2;
        const offsetY = (containerHeight - gridHeight) / 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const x = offsetX + col * (dotSize + gap) + dotSize / 2;
                const y = offsetY + row * (dotSize + gap) + dotSize / 2;
                dots.push({ x, y });
            }
        }

        dotsPositionsRef.current = dots;
    }, [dotSize, minGap]);

    // Animation loop for smooth cursor tracking
    const animate = useCallback(() => {
        drawGrid();
        requestRef.current = requestAnimationFrame(animate);
    }, [drawGrid]);

    // Initialize grid and start animation
    useEffect(() => {
        calculateGrid();
        drawGrid(); // Draw once after initial calculation
    }, [calculateGrid, drawGrid]);

    // Handle mouse movement
    useEffect(() => {
        // Store a reference to containerRef.current to use in cleanup function
        const container = containerRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            if (!container || !cursorEffect) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                mouseRef.current = { x, y, active: true };
            } else {
                mouseRef.current.active = false;
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        // Throttle mouse movement to improve performance
        let throttleTimer: number | null = null;
        const throttledMouseMove = (e: MouseEvent) => {
            if (throttleTimer) return;
            throttleTimer = window.setTimeout(() => {
                handleMouseMove(e);
                throttleTimer = null;
            }, 10); // 10ms throttle
        };

        requestRef.current = requestAnimationFrame(animate);

        window.addEventListener("mousemove", throttledMouseMove);
        window.addEventListener("resize", calculateGrid);
        if (container) {
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            window.removeEventListener("mousemove", throttledMouseMove);
            window.removeEventListener("resize", calculateGrid);
            if (container) {
                container.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (throttleTimer) {
                clearTimeout(throttleTimer);
            }
        };
    }, [calculateGrid, animate, cursorEffect]);

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
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
