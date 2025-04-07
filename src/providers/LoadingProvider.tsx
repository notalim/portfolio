"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Handle initial mount - this ensures we only run client-side
        setMounted(true);

        // Function to set loading to false after resources are loaded
        const handleComplete = () => {
            // The LoadingScreen component handles the minimum display time
            // We just need to ensure all resources are loaded before signaling completion
            setTimeout(() => {
                setIsLoading(false);
            }, 500); // Small delay to ensure animations start smoothly
        };

        // Check if page is already loaded
        if (document.readyState === "complete") {
            handleComplete();
        } else {
            window.addEventListener("load", handleComplete);
            return () => {
                window.removeEventListener("load", handleComplete);
            };
        }
    }, []);

    // Don't render anything during SSR to avoid hydration mismatches
    if (!mounted) {
        return null;
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <LoadingScreen />}
            <div
                className="transition-opacity duration-500"
                style={{
                    opacity: isLoading ? 0 : 1,
                    visibility: isLoading ? "hidden" : "visible",
                }}
            >
                {children}
            </div>
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}
