import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';
import ScrollSection from '../components/ui/ScrollSection';

const Home: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="flex flex-col">
            {/* Parallax Hero */}
            <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/assets/newimages/GH 1.jpg"
                        alt="Mont Bleu Landscape"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                </motion.div>

                <motion.div
                    style={{ opacity: textOpacity }}
                    className="container mx-auto px-6 relative z-10 text-center text-white"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 tracking-wide"
                    >
                        Mont Bleu
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="text-sm md:text-base font-light tracking-[0.3em] uppercase opacity-80"
                    >
                        Le Sanctuaire Farm - Franschhoek, South Africa
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/30" />
                </motion.div>
            </section>

            {/* Editorial Intro */}
            <section className="py-24 md:py-32 bg-sanctuary-sand">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <SectionObserver>
                        <p className="text-3xl font-serif uppercase tracking-widest text-sanctuary-gold mb-6">The Philosophy</p>

                        <div className="w-px h-12 bg-sanctuary-blue/20 mx-auto mb-8"></div>

                        <p className="text-base md:text-lg font-light text-sanctuary-blue/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Mont Bleu is a farm retreat in Franschhoek — a place where heaven and earth meet.
                        </p>

                        <h2 className="text-3xl md:text-5xl font-serif text-sanctuary-blue leading-tight mb-10 italic">
                            "Here, time slows. Nature speaks.<br className="hidden md:block" /> And the soul finds room to breathe."
                        </h2>
                    </SectionObserver>
                </div>
            </section>

            {/* Horizontal Scroll Pillars */}
            <ScrollSection>
                {/* Stay Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Oak 2.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">01</h2>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-serif mb-8 text-white drop-shadow-lg">Stay</h3>
                        </div>
                        <div className="space-y-8 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                Mont Bleu is our Guest Home - not a formal guesthouse, but a place designed to feel lived-in, warm, and unhurried. Choose from 1 of 5 unique suites.
                            </p>
                            <Button to="/stay" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">View Suites</Button>
                        </div>
                    </div>
                </div>

                {/* Explore Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Deck.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">02</h2>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-serif mb-8 text-white drop-shadow-lg">Explore</h3>
                        </div>
                        <div className="space-y-8 md:order-1 text-right backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                Discover our walking trails, river paths, and reflective pilgrimage journey across the estate. Just 2km from Franschhoek village and beautiful winelands region.
                            </p>
                            <Button to="/explore" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Start the Journey</Button>
                        </div>
                    </div>
                </div>

                {/* Connect Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Fynbos 1.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">03</h2>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-serif mb-8 text-white drop-shadow-lg">Connect</h3>
                        </div>
                        <div className="space-y-8 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                A sanctuary is not an escape from the world, but a place where the world is seen more clearly.
                            </p>
                            <Button to="/connect" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Read Philosophy</Button>
                        </div>
                    </div>
                </div>

                {/* Experience Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        {/* Using a placeholder image for Experience - ideally something 'sensory' or duplicate one for now */}
                        <img
                            src="/assets/newimages/Lounge 1.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">04</h2>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-serif mb-8 text-white drop-shadow-lg">Experience</h3>
                        </div>
                        <div className="space-y-8 md:order-1 text-right backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                Mont Bleu is not only a place to stay, but a place to experience — with your body, your senses, and your attention.
                            </p>
                            <Button to="/experiences" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Discover Experiences</Button>
                        </div>
                    </div>
                </div>
            </ScrollSection>


        </div>
    );
};

export default Home;
