"use client";

import { motion } from "framer-motion";
import { DotGrid } from "@/components/ui/DotGrid";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function About() {
    const isMobile = useIsMobile();

    return (
        <main className="pt-[60px] min-h-screen bg-background relative overflow-hidden">
            {/* Background DotGrid */}
            <div className="absolute inset-0 z-[1] overflow-hidden">
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

            {/* Background Image */}
            <div
                className={`absolute inset-x-0 ${
                    isMobile ? "bottom-0" : "bottom-[-100px]"
                } z-[2] overflow-hidden h-[60vh]`}
            >
                <Image
                    src="/images/about_background.png"
                    alt="Creation inspired hands"
                    fill
                    className="object-contain object-bottom opacity-80 mix-blend-multiply contrast-125 brightness-110"
                    priority
                />
            </div>

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-2"
                    >
                        <p className="text-secondary-text mb-8">
                            I am a creative developer with expertise in web
                            development, UI/UX design, and interactive
                            experiences. My work sits at the intersection of
                            technology and design, where I strive to create
                            digital products that are both beautiful and
                            functional.
                        </p>

                        <p className="text-secondary-text mb-8">
                            With a background in computer science and a passion
                            for visual design, I bring a unique perspective to
                            every project. I believe that the best digital
                            experiences are those that seamlessly blend
                            technical excellence with thoughtful design.
                        </p>

                        <p className="text-secondary-text mb-8">
                            I&apos;m currently based in the United States,
                            having moved from Kazakhstan. This change of
                            environment has significantly influenced my creative
                            process and perspective, allowing me to bring
                            diverse cultural influences to my work.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="border-l border-border-color pl-6"
                    >
                        <h2 className="text-xl text-primary-text mb-4">
                            Skills
                        </h2>
                        <ul className="text-secondary-text space-y-2 mb-8">
                            <li>Frontend Development</li>
                            <li>UI/UX Design</li>
                            <li>Interactive Experiences</li>
                            <li>Creative Coding</li>
                            <li>WebGL / Three.js</li>
                            <li>React / Next.js</li>
                        </ul>

                        <h2 className="text-xl text-primary-text mb-4">
                            Education
                        </h2>
                        <p className="text-secondary-text mb-2">
                            BSc Computer Science
                        </p>
                        <p className="text-secondary-text text-sm mb-8">
                            2016 - 2020
                        </p>

                        <h2 className="text-xl text-primary-text mb-4">
                            Languages
                        </h2>
                        <ul className="text-secondary-text">
                            <li>English (Fluent)</li>
                            <li>Russian (Native)</li>
                            <li>Kazakh (Native)</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Extra space for the hands to be fully visible on mobile */}
                {isMobile && <div className="w-full mt-16"></div>}
            </div>
        </main>
    );
}
