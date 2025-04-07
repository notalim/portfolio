"use client";

import React from "react";

interface MarqueeProps {
    text: string;
    className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, className = "" }) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <div className="inline-block animate-marquee">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">
                        {text}
                    </span>
                ))}
            </div>
            <div className="inline-block animate-marquee">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
