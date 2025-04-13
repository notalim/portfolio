"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

const Header = () => {
    const isMobile = useIsMobile();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex items-stretch justify-between h-[60px] ${
                isHomePage
                    ? "bg-transparent"
                    : "bg-background/90 backdrop-blur-sm"
            } transition-all duration-300`}
        >
            <div
                className={`p-4 flex items-center ${
                    isHomePage
                        ? "border-r border-border-color border-solid"
                        : ""
                }`}
            >
                <Link href="/" className="flex items-center">
                    <span className="font-sans text-secondary-text italic lowercase">
                        not
                    </span>
                    <span className="font-serif text-secondary-text lowercase">
                        alim
                    </span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 p-4">
                <Link
                    href="/about"
                    className={`text-secondary-text hover:text-primary-text transition-colors lowercase ${
                        pathname === "/about" ? "text-primary-text" : ""
                    }`}
                >
                    about
                </Link>
                <Link
                    href="/work"
                    className={`text-secondary-text hover:text-primary-text transition-colors lowercase ${
                        pathname === "/work" ? "text-primary-text" : ""
                    }`}
                >
                    work
                </Link>
            </nav>

            {/* Mobile: All links inline */}
            {isMobile && (
                <div className="flex md:hidden items-center justify-center flex-1">
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/about"
                            className={`text-secondary-text hover:text-primary-text transition-colors lowercase ${
                                pathname === "/about" ? "text-primary-text" : ""
                            }`}
                        >
                            about
                        </Link>
                        <Link
                            href="/work"
                            className={`text-secondary-text hover:text-primary-text transition-colors lowercase ${
                                pathname === "/work" ? "text-primary-text" : ""
                            }`}
                        >
                            work
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-secondary-text hover:text-primary-text transition-colors lowercase ${
                                pathname === "/contact"
                                    ? "text-primary-text"
                                    : ""
                            }`}
                        >
                            contact
                        </Link>
                    </div>
                </div>
            )}

            {/* Contact Link (Desktop Only) */}
            <div
                className={`p-4 md:flex items-center hidden ${
                    isHomePage
                        ? "border-l border-border-color border-solid"
                        : ""
                }`}
            >
                <Link href="/contact" className="group">
                    <span className="text-sm text-secondary-text lowercase relative">
                        contact me
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-primary-text group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
