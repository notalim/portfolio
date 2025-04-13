"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { DotGrid } from "@/components/ui/DotGrid";

export default function Work() {
    return (
        <main className="pt-[60px] h-[calc(100vh)] bg-background relative overflow-hidden">
            {/* DotGrid with hover effect restored */}
            <div className="absolute inset-0">
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

            {/* background image - positioned to show full arms */}
            <div className="absolute inset-x-0 bottom-[-40px] z-[2] overflow-visible h-[70vh]">
                <Image
                    src="/images/about_background.png"
                    alt="Creation inspired hands"
                    fill
                    className="object-contain object-bottom opacity-80 mix-blend-multiply contrast-125 brightness-110"
                    priority
                />
            </div>

            {/* content container with higher z-index */}
            <div className="container relative z-[30] mx-auto max-w-5xl px-6 flex flex-col items-center justify-center h-full pb-[15vh]">
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
                    className="text-center max-w-2xl bg-background/70 backdrop-blur-sm p-6 border border-border-color"
                >
                    <p className="text-secondary-text mb-6">
                        this section is currently under development. i&apos;m
                        working on curating a showcase of my recent projects and
                        experiments. in the meantime, you can check out my
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
                            hover:bg-border-color/5 hover:scale-105 transition-all duration-300 bg-background/90 cursor-pointer"
                        >
                            visit legacy portfolio
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
