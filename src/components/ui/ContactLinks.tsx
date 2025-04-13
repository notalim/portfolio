"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Constellation } from "./Constellation";
import {
    RiLinkedinLine,
    RiGithubLine,
    RiMailLine,
    RiTelegramLine,
} from "@remixicon/react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ContactLinksProps {
    className?: string;
}

export function ContactLinks({ className = "" }: ContactLinksProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [buttonWidth, setButtonWidth] = useState(0);
    const isMobile = useIsMobile();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Measure button width for dropdown content
    useEffect(() => {
        if (buttonRef.current) {
            const width = buttonRef.current.offsetWidth;
            setButtonWidth(width);
        }
    }, []);

    const contactLinks = [
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/notalim",
            icon: <RiLinkedinLine size={16} />,
        },
        {
            name: "GitHub",
            href: "https://github.com/notalim",
            icon: <RiGithubLine size={16} />,
        },
        // {
        //     name: "Twitter",
        //     href: "https://twitter.com/notalim",
        //     icon: <RiTwitterXLine size={16} />,
        // },
        {
            name: "Telegram",
            href: "https://t.me/ricefeelings",
            icon: <RiTelegramLine size={16} />,
        },
        {
            name: "Email",
            href: "mailto:notalimka@gmail.com",
            icon: <RiMailLine size={16} />,
        },
    ];

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to container
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

        // Limit the movement more to prevent scroll issues
        setMousePosition({
            x: Math.max(-0.4, Math.min(0.4, x)),
            y: Math.max(-0.4, Math.min(0.4, y)),
        });
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    x: mousePosition.x * 12, // Reduced movement
                    y: mousePosition.y * 12,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    mass: 0.1,
                }}
            >
                <Constellation
                    starCount={15}
                    starColor="var(--color-border-color)"
                    lineColor="var(--color-border-color)"
                    pulseDuration={4}
                    starSize={1.5}
                    connectDistance={isMobile ? 0.2 : 0.5}
                    avoidCenterRadius={100}
                />
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6 md:p-6 p-4">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        className="text-secondary-text mb-1 md:mb-2 text-sm tracking-widest"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        currently
                    </motion.p>
                    <motion.p
                        className="text-secondary-text font-serif italic mb-6 md:mb-10 text-lg"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    >
                        open to new opportunities
                    </motion.p>
                </motion.div>

                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <motion.button
                            ref={buttonRef}
                            className="relative text-primary-text text-xl border border-border-color px-8 py-2 md:py-3 rounded-none group hover:bg-border-color/10 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">
                                let&apos;s talk
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-background opacity-0 group-hover:opacity-20 transition-opacity"
                                initial={{ scale: 0.9 }}
                                whileHover={{ scale: 1 }}
                            />
                        </motion.button>
                    </DropdownMenuTrigger>
                    <AnimatePresence>
                        {isOpen && (
                            <DropdownMenuContent
                                className="bg-background/95 border border-border-color backdrop-blur-sm rounded-none p-0"
                                style={{
                                    width:
                                        buttonWidth > 0
                                            ? `${buttonWidth}px`
                                            : "auto",
                                }}
                                forceMount
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{
                                        staggerChildren: 0.05,
                                        duration: 0.2,
                                    }}
                                >
                                    {contactLinks.map((link, index) => (
                                        <DropdownMenuItem
                                            key={link.name}
                                            asChild
                                        >
                                            <motion.a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between px-3 py-2 text-secondary-text hover:text-primary-text cursor-none transition-colors"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <span>{link.name}</span>
                                                <span className="text-xs flex items-center">
                                                    {link.icon}
                                                </span>
                                            </motion.a>
                                        </DropdownMenuItem>
                                    ))}
                                </motion.div>
                            </DropdownMenuContent>
                        )}
                    </AnimatePresence>
                </DropdownMenu>

                <motion.p
                    className="text-secondary-text mt-6 md:mt-12 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                >
                    do our stars{" "}
                    <span className="text-primary-text font-serif">align</span>?
                </motion.p>
            </div>
        </div>
    );
}
