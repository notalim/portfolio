"use client";

import { motion } from "framer-motion";
import { TrajectoryGlobe } from "@/components/ui/TrajectoryGlobe";
import Image from "next/image";
import { DotGrid } from "@/components/ui/DotGrid";

export default function About() {
    return (
        <main className="pt-[60px] min-h-screen bg-background relative overflow-hidden">
            {/* DotGrid behind entire page */}
            <div className="absolute inset-0 pointer-events-none">
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

            {/* Semi-transparent content background - pointer-events-none */}
            <div className="absolute inset-0 bg-background/40 pointer-events-none"></div>

            <div className="container mx-auto max-w-5xl px-6 py-16 relative z-[3]">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-6xl text-primary-text mb-12"
                >
                    about <span className="font-sans italic">not</span>{" "}
                    <span className="font-serif italic">me</span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="text-secondary-text mb-8 lowercase">
                            hey, i&apos;m alim — a software engineer. i
                            graduated from stevens institute of technology with
                            a degree in computer science in 2024 and a minor in
                            music tech, where i also worked as a ta and got
                            hands-on with everything from full-stack apps to
                            data pipelines.
                        </p>

                        <p className="text-secondary-text mb-8 lowercase">
                            i spent my high school years studying in the czech
                            republic before moving to the us for university.
                        </p>

                        <p className="text-secondary-text mb-8 lowercase">
                            always down to talk frontend frameworks, music
                            theory, video games, and the gym.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative min-h-[450px] md:min-h-[550px]"
                    >
                        {/* Globe container with higher z-index to ensure interactivity */}
                        <div className="absolute inset-0 z-[15]">
                            <TrajectoryGlobe />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Louis the dog - using pointer-events-none to avoid blocking interaction with the globe */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 md:bottom-12 z-[40] flex flex-col items-center pointer-events-none">
                <div className="pointer-events-auto">
                    <Image
                        src="/images/louis_low_polygon.png"
                        alt="Louis the dog"
                        width={80}
                        height={80}
                        className="object-contain"
                        priority
                    />
                    <div className="text-primary-text text-xs mt-2 lowercase text-center">
                        my dog louis
                    </div>
                </div>
            </div>
        </main>
    );
}
