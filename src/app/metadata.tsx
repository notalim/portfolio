import { Metadata } from "next";

// Define the base URL for production deployment
// This will be used for canonical URLs and social card images
const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://notalim.vercel.app";

// Default metadata for the site
const defaultMetadata: Metadata = {
    title: {
        default: "notalim",
        template: "%s | notalim",
    },
    description: "alim kassymov portfolio - creative developer",
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
        title: "notalim",
        description: "alim kassymov portfolio - creative developer",
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
        title: "notalim",
        description: "alim kassymov portfolio - creative developer",
        images: [`${baseUrl}/og-image.png`],
    },
    // Favicon configuration - these files should be placed in the /public directory
    // Next.js automatically serves files from the /public directory at the root URL path
    // For example, /public/favicon.ico is accessible at https://yourdomain.com/favicon.ico
    icons: {
        icon: "/favicon.ico", // /public/favicon.ico
        shortcut: "/favicon.ico", // /public/favicon.ico
        apple: "/apple-touch-icon.png", // /public/apple-touch-icon.png
    },
};

export default defaultMetadata;
