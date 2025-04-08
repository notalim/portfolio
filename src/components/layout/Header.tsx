"use client";

import Link from "next/link";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const isMobile = useIsMobile();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-stretch justify-between h-[60px] bg-background/90 backdrop-blur-sm">
            <div className="border-r border-border-color border-solid p-4 flex items-center">
                <Link href="/" className="flex items-center">
                    <span className="font-sans text-secondary-text italic">
                        not
                    </span>
                    <span className="font-serif text-secondary-text">alim</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 p-4">
                <Link
                    href="/about"
                    className="text-secondary-text hover:text-primary-text transition-colors"
                >
                    About
                </Link>
                <Link
                    href="/work"
                    className="text-secondary-text hover:text-primary-text transition-colors"
                >
                    Work
                </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            {isMobile && (
                <div className="flex md:hidden items-center px-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-secondary-text"
                        aria-label="Toggle navigation menu"
                    >
                        <div
                            className={`w-6 h-5 relative flex flex-col justify-between transition-all duration-300 ${
                                mobileMenuOpen ? "transform" : ""
                            }`}
                        >
                            <span
                                className={`w-full h-px bg-current transform transition-all duration-300 ${
                                    mobileMenuOpen
                                        ? "rotate-45 translate-y-2"
                                        : ""
                                }`}
                            ></span>
                            <span
                                className={`w-full h-px bg-current transition-all duration-300 ${
                                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                            ></span>
                            <span
                                className={`w-full h-px bg-current transform transition-all duration-300 ${
                                    mobileMenuOpen
                                        ? "-rotate-45 -translate-y-2"
                                        : ""
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>
            )}

            <div className="border-l border-border-color border-solid p-4 flex items-center">
                <span className="text-sm text-secondary-text">
                    Available for work
                </span>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && isMobile && (
                    <motion.div
                        className="fixed top-[60px] left-0 right-0 bg-background border-t border-border-color z-40"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col p-4">
                            <Link
                                href="/about"
                                className="text-secondary-text hover:text-primary-text transition-colors py-3 border-b border-border-color"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/work"
                                className="text-secondary-text hover:text-primary-text transition-colors py-3"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Work
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
