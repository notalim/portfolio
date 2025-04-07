import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // map the css variables to tailwind's font classes
                sans: ["var(--font-satoshi)"],
                serif: ["var(--font-zodiak)"],
                mono: ["var(--font-mono)"],
            },
            letterSpacing: {
                // custom value removed as it's applied directly in globals.css
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                marquee: "marquee 25s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
