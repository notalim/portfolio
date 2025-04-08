import { Metadata } from "next";

// Define the base URL for production deployment
// This will be used for canonical URLs and social card images
const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://notalim.vercel.app";

// Default metadata for the site
const defaultMetadata: Metadata = {
    title: {
        default: "notalim | Creative Developer",
        template: "%s | notalim",
    },
    description:
        "Creative developer portfolio of notalim, showcasing web development and design projects.",
    keywords: [
        "developer",
        "creative developer",
        "web development",
        "portfolio",
        "frontend",
        "design",
    ],
    authors: [{ name: "notalim" }],
    creator: "notalim",
    publisher: "notalim",
    robots: "index, follow",
    metadataBase: new URL(baseUrl),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        title: "notalim | Creative Developer",
        description:
            "Creative developer portfolio of notalim, showcasing web development and design projects.",
        siteName: "notalim portfolio",
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "notalim portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "notalim | Creative Developer",
        description:
            "Creative developer portfolio of notalim, showcasing web development and design projects.",
        images: [`${baseUrl}/og-image.png`],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default defaultMetadata;
