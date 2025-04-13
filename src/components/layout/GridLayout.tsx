"use client";

import Marquee from "../ui/Marquee";
import { Waves } from "../ui/waves-background";
import { ContactLinks } from "../ui/ContactLinks";
import { DotGrid } from "../ui/DotGrid";

const GridLayout = () => {
    return (
        <div className="min-h-screen grid grid-cols-12 grid-rows-[auto_auto_1fr_auto_auto] text-primary-text relative">
            <div className="col-span-12 h-[60px]"></div>

            <div className="col-span-12 border-y border-border-color border-solid overflow-hidden bg-background">
                <Marquee
                    text="minimalism is <i>not</i> absence ✦ simplicity is <i>not</i> easy ✦ design is <i>not</i> decoration ✦ code is <i>not</i> just function ✦ "
                    dangerouslySetInnerHTML={true}
                />
            </div>

            <div className="col-span-12 grid grid-cols-12">
                <div className="col-span-12 md:col-span-8 border-b md:border-b-0 md:border-r border-border-color border-solid p-4 md:p-8 relative bg-background">
                    <Waves
                        lineColor="var(--color-border-color)"
                        backgroundColor="var(--color-background)"
                        waveSpeedX={0.015}
                        waveSpeedY={0.008}
                        waveAmpX={25}
                        waveAmpY={15}
                        xGap={15}
                        yGap={25}
                        friction={0.95}
                        tension={0.008}
                        maxCursorMove={120}
                        lineWidth={0.6}
                        qualityMultiplier={2.5}
                        className="absolute inset-0"
                    />
                </div>

                <div className="col-span-12 md:col-span-4 border-solid border-border-color bg-background min-h-[200px] md:min-h-[300px]">
                    <ContactLinks className="h-full" />
                </div>
            </div>

            <div className="col-span-12 border-t border-border-color border-solid px-4 md:px-12 relative">
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

                <div className="relative py-4 md:py-8 min-h-[220px] md:min-h-[300px]">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                        <div className="font-sans text-5xl md:text-8xl italic text-secondary-text mb-1 md:mb-0">
                            not
                        </div>
                        <div className="text-xs text-secondary-text max-w-full md:max-w-xs">
                            /nɒt/ (adverb) &mdash; A boundary that defines and
                            refines.
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mt-2 md:mt-4">
                        <div className="font-serif text-6xl md:text-9xl font-light scale-y-124 mb-1 md:mb-0">
                            alim
                        </div>
                        <div className="text-xs text-secondary-text max-w-full md:max-w-xs">
                            /ˈæl.ɪm/ (noun) &mdash; A fusion of endless
                            curiosity, transcending limits.
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-12 border-t border-border-color border-solid bg-background">
                <div className="flex justify-center md:justify-end items-center p-4">
                    <div className="text-sm text-secondary-text">
                        From Kazakhstan, Based in USA
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GridLayout;
