import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';
import ScrollSection from '../components/ui/ScrollSection';
import ReviewsCarousel from '../components/ui/ReviewsCarousel';

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
                    className="container mx-auto px-6 relative z-10 text-center text-white flex flex-col items-center"
                >
                    {/* Prominent Spring Package Block */}
                    <motion.div
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                         className="w-full max-w-2xl mb-12"
                    >
                        <div className="block bg-sanctuary-gold text-sanctuary-blue p-6 md:p-8 rounded-sm shadow-2xl transition-all duration-500 border border-transparent">
                            <span className="block text-xl md:text-3xl font-serif mb-4 uppercase tracking-widest font-bold">
                                🌸 Spring Midweek Special <br/>
                                <span className="text-lg md:text-xl font-sans font-medium tracking-normal mt-2 block opacity-90">R5,000 per couple</span>
                            </span>
                            <ul className="text-sm md:text-base font-medium opacity-90 tracking-wide list-none space-y-2 mb-6">
                                <li>• 2 Nights accommodation</li>
                                <li>• Continental breakfast</li>
                                <li>• Wine and chocolate pairing for 2</li>
                                <li>• Bottle of wine in room</li>
                            </ul>
                            <a href="/book" className="inline-block border-2 border-sanctuary-blue px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-sanctuary-blue hover:text-white transition-colors duration-300">
                                Enquire Now
                            </a>
                        </div>
                    </motion.div>

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
                        className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase opacity-80"
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

                        <p className="text-xl md:text-2xl font-light text-sanctuary-blue/80 mb-10 leading-relaxed max-w-2xl mx-auto">
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

                {/* Relax Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Pool 1.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Swimming Pool"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">02</h2>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-serif mb-8 text-white drop-shadow-lg">Relax</h3>
                        </div>
                        <div className="space-y-8 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                Relax in a quiet mountain sanctuary surrounded by mountains and epic Fynbos flora. Enjoy a swim in our sparkling pool, a sauna in our mountain sauna, a gas-fired hot-tub or a workout in our outdoor gym.
                            </p>
                            <Button to="/relax" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Explore Relaxation</Button>
                        </div>
                    </div>
                </div>

                {/* Explore Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Deck.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Explore"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">03</h2>
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

                {/* Connect & Experience Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Experience 2.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Connect & Experience"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>

                    <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="overflow-hidden">
                                <h2 className="text-6xl md:text-8xl font-serif mb-4 text-white drop-shadow-lg leading-none select-none">04</h2>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-serif mb-8 text-white drop-shadow-lg">Connect & Experience</h3>
                        </div>
                        <div className="space-y-8 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                A sanctuary is not an escape from the world, but a place where the world is seen more clearly. Engage your body, senses, and attention on the estate.
                            </p>
                            <Button to="/connect-experience" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Read Philosophy</Button>
                        </div>
                    </div>
                </div>
            </ScrollSection>

            {/* Guest Reviews Section */}
            <ReviewsCarousel />

            {/* Our Story / The Journey */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-sanctuary-sand/50 -skew-x-12 translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <SectionObserver>
                            <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-6 block font-medium">Our Story</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-sanctuary-blue mb-10 leading-tight">The Le Sanctuaire Journey</h2>
                            <div className="space-y-6 text-lg font-light text-sanctuary-blue/70 leading-relaxed">
                                <p>
                                    Le Sanctuaire was born from a simple yet profound vision: to create a mountain sanctuary that restores the soul through a deep connection with nature.
                                </p>
                                <p>
                                    Set on the slopes of the Franschhoek mountains, this is more than a farm—it is a working landscape of buchu, olives, and fynbos, designed as a "Guest Home" where the boundaries between hospitality and family living dissolve.
                                </p>
                                <p>
                                    From the hand-carved stone labyrinth to the silent mountain trails, every detail has been shaped with intention, guided by the belief that nature is our most powerful teacher in the art of being present.
                                </p>
                            </div>
                        </SectionObserver>
                        <SectionObserver delay={0.2}>
                            <div className="relative">
                                <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                                    <img src="/assets/newimages/GH Deck.jpg" alt="Le Sanctuaire Estate" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-10 -left-10 w-64 h-80 hidden lg:block border-8 border-white shadow-xl overflow-hidden">
                                    <img src="/assets/newimages/Labyrinth.jpg" alt="The Labyrinth" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </SectionObserver>
                    </div>
                </div>
            </section>

            {/* A Day in the Life */}
            <section className="py-24 md:py-32 bg-sanctuary-blue text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <SectionObserver>
                            <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-6 block font-medium">The Experience</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6">A Day at the Sanctuary</h2>
                            <p className="text-xl font-light opacity-60 max-w-2xl mx-auto">From the first light on the Wemmershoek to the starlit mountain air.</p>
                        </SectionObserver>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { time: "07:00", title: "Sunrise Stillness", desc: "A gentle walk to the Yoga Deck as the first light spills over the Franschhoek valley." },
                            { time: "09:00", title: "Farm Breakfast", desc: "Sourdough, local cheeses, and locally sourced honey on the mountain-view deck." },
                            { time: "11:00", title: "The Pilgrim's Trail", desc: "A guided hike through the fynbos to our hidden waterfall and swimming pools." },
                            { time: "16:00", title: "Heat & Water", desc: "A restorative session in the mountain-view sauna followed by a river plunge." },
                            { time: "18:30", title: "Sundowers", desc: "A glass of local Chenin from the honesty bar as the mountains turn to fire." },
                            { time: "20:00", title: "Starlit Rest", desc: "Unwinding by the indoor fireplace or soaking in the gas-fired mountain hot tub." }
                        ].map((step, idx) => (
                            <SectionObserver key={idx} delay={idx * 0.1}>
                                <div className="border-l border-white/10 pl-8 pb-12 relative last:pb-0 h-full">
                                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-sanctuary-gold rounded-full" />
                                    <span className="text-sanctuary-gold font-serif text-2xl mb-4 block">{step.time}</span>
                                    <h4 className="text-xl font-serif mb-4">{step.title}</h4>
                                    <p className="text-sm font-light opacity-60 leading-relaxed">{step.desc}</p>
                                </div>
                            </SectionObserver>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
