"use client";

import { useEffect, useState } from "react";

const Pointer = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        document.body.style.cursor = "none";

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updatePosition);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            document.body.style.cursor = "auto";
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
            <div
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                style={{
                    left: position.x,
                    top: position.y,
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin-slow"
                    style={{
                        filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))",
                    }}
                >
                    <path
                        d="M16 7L17 14L23 16L17 18L16 25L15 18L9 16L15 14L16 7Z"
                        stroke="white"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        shapeRendering="geometricPrecision"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Pointer;
