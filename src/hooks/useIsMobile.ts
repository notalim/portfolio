"use client";

import { useState, useEffect } from "react";

/**
 * A custom hook that detects if the current viewport is a mobile device
 * based on screen width, using Tailwind's md breakpoint (768px) as the threshold.
 */
export function useIsMobile() {
    // Default to false during SSR
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the current screen size is mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
        };

        // Check on mount
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    return isMobile;
}
