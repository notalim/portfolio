"use client";

import { motion } from "framer-motion";
import { DotGrid } from "@/components/ui/DotGrid";
import Link from "next/link";

export default function Work() {
    return (
        <main className="pt-[60px] min-h-screen bg-background relative">
            {/* Background DotGrid */}
            <div className="absolute inset-0 overflow-hidden">
                <DotGrid
                    dotColor="var(--color-border-color)"
                    dotOpacity={0.15}
                    dotSize={4}
                    minGap={30}
                    cursorEffect={true}
                    cursorRadius={200}
                    hoverOpacity={1.0}
                />
            </div>

            <div className="container mx-auto max-w-5xl px-6 py-16 flex flex-col items-center justify-center h-[calc(100vh-60px)]">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-6xl text-primary-text mb-8 text-center"
                >
                    work <span className="font-sans italic">in progress</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center max-w-2xl"
                >
                    <p className="text-secondary-text mb-12">
                        This section is currently under development. I&apos;m
                        working on curating a showcase of my recent projects and
                        experiments. In the meantime, you can check out my
                        legacy portfolio.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            href="https://legacy.notalim.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 border border-border-color text-primary-text 
                        hover:bg-border-color/5 hover:scale-105 transition-all duration-300"
                        >
                            Visit Legacy Portfolio
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
