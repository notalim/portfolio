"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { DotGrid } from "@/components/ui/DotGrid";
import Image from "next/image";
import {
    RiLinkedinLine,
    RiGithubLine,
    RiMailLine,
    RiTelegramLine,
} from "@remixicon/react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // In a real implementation, you would send the form data to a backend service
        // Options include:
        // 1. Your own API endpoint (requires backend setup)
        // 2. Email service like EmailJS, SendGrid, or Formspree
        // 3. Serverless function (Vercel Functions, AWS Lambda)

        // For demo purposes only - simulating submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormState({ name: "", email: "", message: "" });

            // For production: uncomment and configure one of these approaches
            // Option 1: EmailJS
            // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formState, 'YOUR_USER_ID');

            // Option 2: Formspree (simplest solution)
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //   method: 'POST',
            //   body: JSON.stringify(formState),
            //   headers: {'Content-Type': 'application/json'}
            // });

            // Option 3: Custom API route
            // fetch('/api/contact', {
            //   method: 'POST',
            //   body: JSON.stringify(formState),
            //   headers: {'Content-Type': 'application/json'}
            // });
        }, 1500);
    };

    // Contact links from ContactLinks.tsx
    const contactLinks = [
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/notalim",
            icon: <RiLinkedinLine size={20} />,
        },
        {
            name: "GitHub",
            href: "https://github.com/notalim",
            icon: <RiGithubLine size={20} />,
        },
        {
            name: "Telegram",
            href: "https://t.me/ricefeelings",
            icon: <RiTelegramLine size={20} />,
        },
        {
            name: "Email",
            href: "mailto:notalimka@gmail.com",
            label: "notalimka@gmail.com",
            icon: <RiMailLine size={20} />,
        },
    ];

    return (
        <main className="pt-[60px] bg-background relative overflow-hidden">
            {/* Background DotGrid with hover effect */}
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

            {/* Background image - paper plane */}
            <div className="absolute inset-x-0 bottom-[-140px] z-[2] overflow-visible h-[60vh]">
                <Image
                    src="/images/paperplane.png"
                    alt="Paper airplane"
                    fill
                    className="object-contain object-bottom opacity-80 mix-blend-multiply contrast-125 brightness-110"
                    priority
                />
            </div>

            {/* Creative layout with content and side links */}
            <div className="container mx-auto h-full relative z-[30]">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Main content area */}
                    <div className="flex-1 px-6 py-8 overflow-auto no-scrollbar pb-[15vh]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-serif text-6xl text-primary-text mb-6 lowercase"
                        >
                            contact <span className="font-sans italic">me</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-secondary-text mb-12 lowercase max-w-xl"
                        >
                            i&apos;m currently available for freelance work,
                            collaborations, and interesting projects. feel free
                            to reach out with any questions or opportunities.
                        </motion.p>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-border-color/10 p-8 border border-border-color max-w-xl"
                            >
                                <h3 className="text-2xl font-serif text-primary-text mb-4 lowercase">
                                    thank you for your message!
                                </h3>
                                <p className="text-secondary-text lowercase">
                                    i&apos;ll get back to you as soon as
                                    possible.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 relative z-10 bg-background/70 backdrop-blur-sm p-6 border border-border-color max-w-xl"
                                method="POST"
                            >
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm text-secondary-text lowercase"
                                    >
                                        name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-background border border-border-color focus:border-primary-text focus:outline-none transition-colors text-primary-text hover:border-primary-text/70"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm text-secondary-text lowercase"
                                    >
                                        email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-background border border-border-color focus:border-primary-text focus:outline-none transition-colors text-primary-text hover:border-primary-text/70"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="block text-sm text-secondary-text lowercase"
                                    >
                                        message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-background border border-border-color focus:border-primary-text focus:outline-none transition-colors text-primary-text resize-none hover:border-primary-text/70"
                                    ></textarea>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-8 py-3 border border-border-color text-primary-text hover:bg-border-color/10 hover:border-primary-text/70 transition-all duration-300 lowercase ${
                                            isSubmitting
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                    >
                                        {isSubmitting
                                            ? "sending..."
                                            : "send message"}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </div>

                    {/* Side links - now at the bottom on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="md:w-64 w-full md:border-l border-t md:border-t-0 border-border-color bg-background/50 backdrop-blur-sm md:flex-col flex-row flex justify-around md:justify-center md:px-6 px-4 py-6 md:py-0"
                    >
                        <div className="md:space-y-12 flex md:flex-col flex-row justify-around w-full">
                            <div>
                                <h3 className="text-primary-text font-serif text-xl mb-4 lowercase md:text-left text-center">
                                    location
                                </h3>
                                <p className="text-secondary-text lowercase md:text-left text-center">
                                    cincinnati
                                </p>
                            </div>

                            <div className="md:mt-0 mt-0">
                                <h3 className="text-primary-text font-serif text-xl mb-4 lowercase md:text-left text-center">
                                    email
                                </h3>
                                <a
                                    href={contactLinks[3].href}
                                    className="text-secondary-text hover:text-primary-text transition-colors flex items-center gap-2 justify-center md:justify-start"
                                >
                                    <span className="text-primary-text/60">
                                        {contactLinks[3].icon}
                                    </span>
                                    <span className="text-sm truncate">
                                        notalimka@gmail.com
                                    </span>
                                </a>
                            </div>

                            <div className="md:mt-0 mt-0">
                                <h3 className="text-primary-text font-serif text-xl mb-4 lowercase md:text-left text-center">
                                    social
                                </h3>
                                <div className="space-y-3 flex md:flex-col flex-row gap-3 md:gap-0">
                                    {contactLinks.slice(0, 3).map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary-text hover:text-primary-text transition-colors flex items-center gap-2 justify-center md:justify-start"
                                        >
                                            <span className="text-primary-text/60">
                                                {link.icon}
                                            </span>
                                            <span className="text-sm md:inline hidden">
                                                {link.name.toLowerCase()}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Add no-scrollbar style */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
