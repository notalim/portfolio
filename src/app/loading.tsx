"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
            <div className="w-full max-w-md px-8">
                <div className="flex items-baseline mb-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="font-sans text-5xl italic text-secondary-text"
                    >
                        not
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                        }}
                        className="font-serif text-6xl text-secondary-text"
                    >
                        alim
                    </motion.div>
                </div>

                <div className="relative w-full h-[1px] bg-border-color/30">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary-text"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse",
                        }}
                    />
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-sm text-secondary-text"
                    >
                        loading
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
