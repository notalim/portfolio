import Marquee from "../ui/Marquee";
import { DotGrid } from "../ui/DotGrid";
import { Waves } from "../ui/waves-background";
import { ContactLinks } from "../ui/ContactLinks";

const GridLayout = () => {
    return (
        <div className="min-h-screen grid grid-cols-12 grid-rows-[auto_auto_1fr_auto_auto] text-primary-text relative">
            <div className="col-span-12 h-[60px]"></div>

            <div className="col-span-12 border-y border-border-color border-solid">
                <Marquee text="CREATIVE DEVELOPER////CREATIVE DEVELOPER////" />
            </div>

            <div className="col-span-8 border-r border-border-color border-solid p-8 relative">
                {/* canvas-based wavy curtain effect that responds to cursor movement */}
                <Waves
                    lineColor="var(--color-border-color)"
                    backgroundColor="transparent"
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
                    className="absolute inset-0 z-10"
                />
            </div>

            <div className="col-span-4 border-border-color border-solid relative">
                <ContactLinks className="h-full" />
            </div>

            <div className="col-span-12 border-t border-border-color border-solid px-12 relative">
                {/* DotGrid with cursor interaction effect */}
                <DotGrid
                    className="z-10 absolute inset-0"
                    dotColor="var(--color-border-color)"
                    dotOpacity={0.15}
                    dotSize={4}
                    minGap={30}
                    cursorEffect={true}
                    cursorRadius={200}
                    hoverOpacity={1.0}
                />

                {/* Content positioned above DotGrid for mouse interaction */}
                <div className="relative w-full z-20 py-8 pointer-events-none">
                    {/* Top Row */}
                    <div className="flex items-baseline justify-between">
                        <div className="font-sans text-8xl italic text-secondary-text pointer-events-auto">
                            not
                        </div>
                        <div className="text-xs text-secondary-text max-w-xs pointer-events-auto">
                            /nɒt/ (adverb) &mdash; A boundary that defines and
                            refines.
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-baseline justify-between mt-4">
                        <div className="font-serif text-9xl font-light scale-y-124 pointer-events-auto">
                            alim
                        </div>
                        <div className="text-xs text-secondary-text max-w-xs pointer-events-auto">
                            /ˈæl.ɪm/ (noun) &mdash; A fusion of endless
                            curiosity, transcending limits.
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-12 border-t border-border-color border-solid">
                <div className="flex justify-between items-center p-4">
                    <div className="text-sm text-secondary-text">© 2025</div>
                    <div className="text-sm text-secondary-text">
                        From Kazakhstan, Based in USA
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GridLayout;
