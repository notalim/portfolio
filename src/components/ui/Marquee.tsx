"use client";

import React from "react";

interface MarqueeProps {
    text: string;
    className?: string;
    dangerouslySetInnerHTML?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
    text,
    className = "",
    dangerouslySetInnerHTML = false,
}) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <div className="inline-block animate-marquee">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className="text-sm"
                        {...(dangerouslySetInnerHTML
                            ? { dangerouslySetInnerHTML: { __html: text } }
                            : { children: text })}
                    />
                ))}
            </div>
            <div className="inline-block animate-marquee">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className="text-sm"
                        {...(dangerouslySetInnerHTML
                            ? { dangerouslySetInnerHTML: { __html: text } }
                            : { children: text })}
                    />
                ))}
            </div>
        </div>
    );
};

export default Marquee;
