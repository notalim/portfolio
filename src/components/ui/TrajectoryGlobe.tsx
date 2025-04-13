"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import * as GeoJSON from "geojson";

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

    // configure globe controls - run when globeRef updates
    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();
            if (controls) {
                console.log("configuring controls..."); // debug log
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.15;
                controls.enableZoom = false; // explicitly disable zoom
                controls.update();
                console.log("zoom enabled:", controls.enableZoom); // debug log
            }

            // set initial view significantly more zoomed out - with a delay
            const timer = setTimeout(() => {
                if (globeRef.current) {
                    console.log("setting point of view..."); // debug log
                }
            }, 100); // delay by 100ms

            // Cleanup the timer if the component unmounts or ref changes
            return () => clearTimeout(timer);
        }
    }, []); // Remove globeRef.current from dependencies

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="w-full h-full scale-[1.4] md:scale-[1.6] opacity-90 pointer-events-auto cursor-grab">
                {containerSize.width > 0 && containerSize.height > 0 && (
                    <Globe
                        ref={globeRef} // Assign the ref here
                        width={containerSize.width}
                        height={containerSize.height}
                        backgroundColor="rgba(0,0,0,0)" // transparent background
                        globeMaterial={{
                            color: TIMBERWOLF_COLOR, // use timberwolf color
                            transparent: true,
                            opacity: 0.8, // less transparent
                        }}
                        atmosphereColor={BORDER_COLOR_LOW_ALPHA} // fainter atmosphere
                        atmosphereAltitude={0.1}
                        arcsData={trajectoryArcs}
                        arcColor={"color"}
                        arcAltitude={0.15} // lower arc elevation
                        arcDashLength={0.5}
                        arcDashGap={0.8} // smaller gap for faster perceived speed
                        arcDashAnimateTime={1500} // faster animation
                        arcStroke={0.4} // slightly thicker arcs
                        arcLabel={"label"}
                        polygonsData={landPolygons}
                        polygonCapColor={() => SECONDARY_TEXT_COLOR_FILL} // use secondary text fill
                        polygonSideColor={() => "rgba(0, 0, 0, 0)"} // no side color
                        polygonStrokeColor={() => SECONDARY_TEXT_COLOR_STROKE} // very faint secondary text stroke
                        polygonAltitude={0.005} // Set very low altitude for polygons
                        polygonLabel={() => ""} // disable tooltips
                    />
                )}
            </div>
            <p className="absolute text-xs text-secondary-text text-center pointer-events-auto">
                my trajectory
            </p>
        </div>
    );
}
