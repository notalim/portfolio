"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Constellation } from "@/components/ui/Constellation";
import { DotGrid } from "@/components/ui/DotGrid";

export default function NotFound() {
    return (
        <main className="pt-[60px] min-h-screen bg-background relative overflow-hidden">
            {/* Background DotGrid */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <DotGrid
                    dotColor="var(--color-border-color)"
                    dotOpacity={0.2}
                    dotSize={4}
                    minGap={20}
                    cursorEffect={true}
                    cursorRadius={120}
                    hoverOpacity={0.8}
                />
            </div>

            <div className="absolute inset-0 z-0 opacity-40">
                <Constellation
                    starCount={30}
                    starColor="var(--color-border-color)"
                    lineColor="var(--color-border-color)"
                    pulseDuration={4}
                    starSize={1.5}
                    connectDistance={0.3}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-[calc(100vh-60px)] flex flex-col items-center justify-center text-center p-8 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <span className="font-sans text-8xl text-primary-text">
                        4
                    </span>
                    <span className="font-serif text-9xl text-primary-text">
                        0
                    </span>
                    <span className="font-sans text-8xl text-primary-text">
                        4
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-xl text-secondary-text mb-8"
                >
                    putting the <span className="font-serif italic">not</span>{" "}
                    in not found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="text-sm text-secondary-text mb-10"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Link
                        href="/"
                        className="border border-border-color px-6 py-3 text-secondary-text hover:text-primary-text hover:bg-border-color/5 transition-all duration-300 relative group"
                    >
                        <span className="relative z-10">return home</span>
                        <motion.div
                            className="absolute inset-0 bg-background opacity-0 group-hover:opacity-10 transition-opacity"
                            initial={{ scale: 0.9 }}
                            whileHover={{ scale: 1 }}
                        />
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
