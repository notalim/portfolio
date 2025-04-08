"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    // Track if this is the first load or a subsequent navigation
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Handle initial mount - this ensures we only run client-side
        setMounted(true);

        // Function to set loading to false after resources are loaded
        const handleComplete = () => {
            // The LoadingScreen component handles the minimum display time
            // We just need to ensure all resources are loaded before signaling completion
            setTimeout(() => {
                setIsLoading(false);
                setInitialLoad(false);
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

    // Listen for route changes - we don't want to show loading screen on these
    useEffect(() => {
        // We only care about route changes after initial load is complete
        if (!initialLoad) {
            // Reset isLoading on route change
            setIsLoading(false);
        }
    }, [pathname, searchParams, initialLoad]);

    // Don't render anything during SSR to avoid hydration mismatches
    if (!mounted) {
        return null;
    }

    // Only show loading on initial load, not on subsequent navigations
    const shouldShowLoading = isLoading && initialLoad;

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {shouldShowLoading && <LoadingScreen />}
            <div
                className="transition-opacity duration-500"
                style={{
                    opacity: shouldShowLoading ? 0 : 1,
                    visibility: shouldShowLoading ? "hidden" : "visible",
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
