import "./globals.css";
import Header from "@/components/layout/Header";
import Pointer from "@/components/ui/Pointer";
import { LoadingProvider } from "@/providers/LoadingProvider";
import defaultMetadata from "./metadata";

// Export the metadata for the site
export const metadata = defaultMetadata;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background">
                <div className="noise" aria-hidden="true" />
                <LoadingProvider>
                    <Pointer />
                    <Header />
                    {children}
                </LoadingProvider>
            </body>
        </html>
    );
}
