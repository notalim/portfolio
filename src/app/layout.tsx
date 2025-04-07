import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Pointer from "@/components/ui/Pointer";
import { LoadingProvider } from "@/providers/LoadingProvider";

// font definitions moved to globals.css / styles/fonts.css

export const metadata: Metadata = {
    title: "notalim",
    description: "Portfolio of notalim",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <LoadingProvider>
                    <Pointer />
                    <Header />
                    {children}
                </LoadingProvider>
            </body>
        </html>
    );
}
