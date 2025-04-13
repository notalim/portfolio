"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import * as GeoJSON from "geojson";
import * as THREE from "three";

// coordinates for the trajectory (lowercase keys for consistency)
const locations = {
    almaty: { name: "almaty", lat: 43.2389, lng: 76.9454 }, // kazakhstan
    prague: { name: "prague", lat: 50.0755, lng: 14.4378 }, // czech republic
    hoboken: { name: "hoboken", lat: 40.744, lng: -74.0324 }, // nj, usa (stevens)
    cincinnati: { name: "cincinnati", lat: 39.1031, lng: -84.512 }, // oh, usa
};

// define colors from theme (rgba)
const PRIMARY_TEXT_COLOR = "rgba(37, 36, 34, 0.8)"; // --color-primary-text (#252422) with alpha
const SECONDARY_TEXT_COLOR_FILL = "rgba(79, 77, 72, 0.3)"; // --color-secondary-text (#4f4d48) for polygon fill

const SECONDARY_TEXT_COLOR_STROKE = "rgba(79, 77, 72, 0.05)"; // --color-secondary-text (#4f4d48) for polygon stroke (very faint)
const TIMBERWOLF_COLOR = "rgba(204, 197, 185, 0.75)"; // --color-timberwolf (#ccc5b9) with alpha
const BORDER_COLOR_LOW_ALPHA = "rgba(121, 117, 110, 0.1)"; // --color-border-color (#79756e) with low alpha

const trajectoryArcs = [
    {
        startLat: locations.almaty.lat,
        startLng: locations.almaty.lng,
        endLat: locations.prague.lat,
        endLng: locations.prague.lng,
        color: PRIMARY_TEXT_COLOR,
        label: "almaty to prague",
    },
    {
        startLat: locations.prague.lat,
        startLng: locations.prague.lng,
        endLat: locations.hoboken.lat,
        endLng: locations.hoboken.lng,
        color: PRIMARY_TEXT_COLOR,
        label: "prague to hoboken",
    },
    {
        startLat: locations.hoboken.lat,
        startLng: locations.hoboken.lng,
        endLat: locations.cincinnati.lat,
        endLng: locations.cincinnati.lng,
        color: PRIMARY_TEXT_COLOR,
        label: "hoboken to cincinnati",
    },
];

// Define type for land polygons
interface GeoFeature {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: Record<string, unknown>;
}

export function TrajectoryGlobe() {
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [landPolygons, setLandPolygons] = useState<GeoFeature[]>([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const updateContainerSize = useCallback(() => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }
    }, []);

    useEffect(() => {
        // fetch world map data
        fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
            .then((res) => res.json())
            .then((topoData: Topology) => {
                if (
                    topoData &&
                    topoData.objects &&
                    topoData.objects.countries
                ) {
                    const geoJson = feature(
                        topoData,
                        topoData.objects.countries
                    ) as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
                    if (geoJson && geoJson.features) {
                        setLandPolygons(geoJson.features as GeoFeature[]);
                    }
                }
            })
            .catch((error) =>
                console.error("error fetching or parsing world data:", error)
            );

        updateContainerSize();
        window.addEventListener("resize", updateContainerSize);
        return () => window.removeEventListener("resize", updateContainerSize);
    }, [updateContainerSize]);

    // Configure globe controls when component mounts
    useEffect(() => {
        if (!globeRef.current) return;

        // Complete disable zoom using multiple methods
        const disableZoom = () => {
            if (!globeRef.current) return;

            const controls = globeRef.current.controls();
            if (controls) {
                // Set auto-rotation
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.15;

                // Disable all zoom-related features
                controls.enableZoom = false;
                controls.enablePan = false;
                controls.minDistance = 201; // Force a specific distance
                controls.maxDistance = 201; // Keep same as minDistance to prevent zoom
                controls.enableDamping = true;
                controls.dampingFactor = 0.1;
                controls.rotateSpeed = 0.5;

                // Apply changes
                controls.update();
            }

            // Set fixed point of view
            globeRef.current.pointOfView({ altitude: 2.5 }, 0);
        };

        // Initial call to disable zoom
        disableZoom();

        // Further ensure zoom is disabled by intercepting wheel events
        const preventZoom = (e: WheelEvent) => {
            if (containerRef.current?.contains(e.target as Node)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Add multiple event listeners to prevent any zoom action
        containerRef.current?.addEventListener("wheel", preventZoom, {
            passive: false,
        });
        containerRef.current?.addEventListener(
            "DOMMouseScroll",
            preventZoom as any,
            { passive: false }
        );
        containerRef.current?.addEventListener(
            "mousewheel",
            preventZoom as any,
            { passive: false }
        );
        window.addEventListener("wheel", preventZoom, { passive: false });

        // For touch devices
        const preventPinchZoom = (e: TouchEvent) => {
            if (
                containerRef.current?.contains(e.target as Node) &&
                e.touches.length > 1
            ) {
                e.preventDefault();
            }
        };

        containerRef.current?.addEventListener("touchmove", preventPinchZoom, {
            passive: false,
        });

        // Make sure controls stay fixed even after user interactions
        const enforceSettings = () => {
            disableZoom();
        };

        containerRef.current?.addEventListener("mousedown", enforceSettings);
        containerRef.current?.addEventListener("mouseup", enforceSettings);
        containerRef.current?.addEventListener("touchstart", enforceSettings);
        containerRef.current?.addEventListener("touchend", enforceSettings);

        // Cleanup function
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener("wheel", preventZoom);
                containerRef.current.removeEventListener(
                    "DOMMouseScroll",
                    preventZoom as any
                );
                containerRef.current.removeEventListener(
                    "mousewheel",
                    preventZoom as any
                );
                containerRef.current.removeEventListener(
                    "touchmove",
                    preventPinchZoom
                );
                containerRef.current.removeEventListener(
                    "mousedown",
                    enforceSettings
                );
                containerRef.current.removeEventListener(
                    "mouseup",
                    enforceSettings
                );
                containerRef.current.removeEventListener(
                    "touchstart",
                    enforceSettings
                );
                containerRef.current.removeEventListener(
                    "touchend",
                    enforceSettings
                );
            }
            window.removeEventListener("wheel", preventZoom);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
        >
            <div className="w-full h-full scale-[1.4] md:scale-[1.6] opacity-90 pointer-events-auto cursor-grab">
                {containerSize.width > 0 && containerSize.height > 0 && (
                    <Globe
                        ref={globeRef}
                        width={containerSize.width}
                        height={containerSize.height}
                        backgroundColor="rgba(0,0,0,0)" // transparent background
                        globeMaterial={new THREE.MeshBasicMaterial({
                            color: "#F4F4F4",
                            transparent: true,
                            opacity: 0.8,
                        })}
                        atmosphereColor={BORDER_COLOR_LOW_ALPHA}
                        atmosphereAltitude={0.1}
                        arcsData={trajectoryArcs}
                        arcColor={"color"}
                        arcAltitude={0.15}
                        arcDashLength={0.5}
                        arcDashGap={0.8}
                        arcDashAnimateTime={1500}
                        arcStroke={0.4}
                        arcLabel={"label"}
                        polygonsData={landPolygons}
                        polygonCapColor={() => SECONDARY_TEXT_COLOR_FILL}
                        polygonSideColor={() => "rgba(0, 0, 0, 0)"}
                        polygonStrokeColor={() => SECONDARY_TEXT_COLOR_STROKE}
                        polygonAltitude={0.005}
                        polygonLabel={() => ""}
                        polygonsTransitionDuration={0}
                        rendererConfig={{ antialias: true }}
                        enablePointerInteraction={true}
                    />
                )}
            </div>
            <p className="absolute text-xs text-secondary-text text-center pointer-events-auto">
                my trajectory
            </p>
        </div>
    );
}
