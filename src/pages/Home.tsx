import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';
import ScrollSection from '../components/ui/ScrollSection';
import ReviewsCarousel from '../components/ui/ReviewsCarousel';

const HERO_VIDEOS = [
    {
        src: '/assets/videos/drone-shots.mp4',
        poster: '/assets/videos/drone-shots-poster.jpg',
        label: 'The Sanctuary'
    },
    {
        src: '/assets/videos/diving-pool.mp4',
        poster: '/assets/videos/diving-pool-poster.jpg',
        label: 'Mountain Pool'
    },
    {
        src: '/assets/videos/sunset-views.mp4',
        poster: '/assets/videos/sunset-views-poster.jpg',
        label: 'Franschhoek Sunset'
    }
];

const Home: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [activeMobileVideo, setActiveMobileVideo] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const checkViewport = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMobileVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Ensure active mobile video plays continuously on iOS Safari
    useEffect(() => {
        if (isDesktop) return;
        const activeVid = mobileVideoRefs.current[activeMobileVideo];
        if (activeVid) {
            activeVid.muted = true;
            activeVid.defaultMuted = true;
            activeVid.playsInline = true;
            const playPromise = activeVid.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Retry play on first touch/scroll if iOS Low Power Mode blocked initial autoplay
                });
            }
        }
        const handleInteraction = () => {
            const vid = mobileVideoRefs.current[activeMobileVideo];
            if (vid && vid.paused) {
                vid.muted = true;
                vid.play().catch(() => {});
            }
        };
        window.addEventListener('touchstart', handleInteraction, { passive: true });
        window.addEventListener('scroll', handleInteraction, { passive: true });
        return () => {
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, [activeMobileVideo, isDesktop]);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="flex flex-col">
            <Helmet>
                <title>Mont Bleu Guesthouse | Boutique Accommodation Franschhoek</title>
                <meta name="description" content="Mont Bleu is a boutique guesthouse on Le Sanctuaire Farm in Franschhoek. Five unique suites, mountain views, pool, sauna, and daily farm breakfasts. Book direct for the best rates." />
                <link rel="canonical" href="https://www.montbleu.co.za/" />
                <meta property="og:url" content="https://www.montbleu.co.za/" />
                <meta property="og:title" content="Mont Bleu Guesthouse | Boutique Accommodation Franschhoek" />
                <meta property="og:description" content="Boutique guesthouse on Le Sanctuaire Farm in Franschhoek. Five unique suites with mountain views, pool, sauna and daily farm breakfasts." />
                <meta property="og:image" content="https://www.montbleu.co.za/assets/home-hero.jpg" />
            </Helmet>
            {/* Parallax Triptych Video Hero */}
            <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-sanctuary-blue">
                <motion.div
                    style={{ y: heroY, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    {/* Desktop 3-Panel Feathered Triptych */}
                    {isDesktop && (
                        <div className="hidden md:block relative w-full h-full">
                            {/* Left Panel (0% to 36%) */}
                            <div className="absolute inset-y-0 left-0 w-[36%] overflow-hidden z-0">
                                <video
                                    src={HERO_VIDEOS[0].src}
                                    poster={HERO_VIDEOS[0].poster}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Right Panel (64% to 100%) */}
                            <div className="absolute inset-y-0 right-0 w-[36%] overflow-hidden z-0">
                                <video
                                    src={HERO_VIDEOS[2].src}
                                    poster={HERO_VIDEOS[2].poster}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Center Panel (28% to 72%) with soft feathered cross-dissolve edges */}
                            <div
                                className="absolute inset-y-0 left-[28%] w-[44%] overflow-hidden z-10"
                                style={{
                                    WebkitMaskImage:
                                        'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 9%, black 18%, black 82%, rgba(0,0,0,0.5) 91%, transparent 100%)',
                                    maskImage:
                                        'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 9%, black 18%, black 82%, rgba(0,0,0,0.5) 91%, transparent 100%)',
                                }}
                            >
                                <video
                                    src={HERO_VIDEOS[1].src}
                                    poster={HERO_VIDEOS[1].poster}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Mobile Full-Screen Portrait Video Switcher */}
                    {!isDesktop && (
                        <div className="block md:hidden relative w-full h-full">
                            {HERO_VIDEOS.map((video, index) => (
                                <video
                                    key={video.src}
                                    ref={(el) => {
                                        mobileVideoRefs.current[index] = el;
                                    }}
                                    src={video.src}
                                    poster={video.poster}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    onLoadedData={(e) => {
                                        if (activeMobileVideo === index) {
                                            e.currentTarget.muted = true;
                                            e.currentTarget.play().catch(() => {});
                                        }
                                    }}
                                    onEnded={(e) => {
                                        e.currentTarget.currentTime = 0;
                                        e.currentTarget.play().catch(() => {});
                                    }}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                                        activeMobileVideo === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Cinematic Contrast Overlay */}
                    <div className="absolute inset-0 bg-black/35 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/60 pointer-events-none" />
                </motion.div>

                <motion.div
                    style={{ opacity: textOpacity }}
                    className="container mx-auto px-6 relative z-10 text-center text-white flex flex-col items-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 tracking-wide drop-shadow-lg"
                    >
                        Mont Bleu
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase opacity-90 drop-shadow-md"
                    >
                        Le Sanctuaire Farm - Franschhoek, South Africa
                    </motion.p>
                </motion.div>

                {/* Mobile Video Selector Pills */}
                <div className="flex md:hidden absolute bottom-28 left-1/2 -translate-x-1/2 z-20 gap-2">
                    {HERO_VIDEOS.map((video, idx) => (
                        <button
                            key={video.label}
                            onClick={() => setActiveMobileVideo(idx)}
                            aria-label={`View ${video.label}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeMobileVideo === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'
                            }`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-4 z-10"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/40" />
                </motion.div>
            </section>



            {/* Editorial Intro */}
            <section className="py-24 md:py-32 bg-sanctuary-sand overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1480px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Left Image: Mont Bleu Guesthouse Facade */}
                        <div className="lg:col-span-4 order-2 lg:order-1">
                            <SectionObserver delay={0.1}>
                                <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl border-4 border-white/80 group">
                                    <img
                                        src="/assets/newimages/GH 1.jpg"
                                        alt="Mont Bleu Guesthouse Exterior"
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </SectionObserver>
                        </div>

                        {/* Center Philosophy Text */}
                        <div className="lg:col-span-4 text-center order-1 lg:order-2 px-2">
                            <SectionObserver>
                                <p className="text-3xl font-serif uppercase tracking-widest text-sanctuary-gold mb-6">The Philosophy</p>

                                <div className="w-px h-12 bg-sanctuary-blue/20 mx-auto mb-8"></div>

                                <p className="text-xl md:text-2xl font-light text-sanctuary-blue/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                                    Mont Bleu is a farm retreat in Franschhoek — a place where heaven and earth meet.
                                </p>

                                <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif text-sanctuary-blue leading-tight mb-4 lg:mb-0 italic">
                                    "Here, time slows. Nature speaks.<br className="hidden md:block" /> And the soul finds room to breathe."
                                </h2>
                            </SectionObserver>
                        </div>

                        {/* Right Image: Guesthouse Lawn & Pool */}
                        <div className="lg:col-span-4 order-3">
                            <SectionObserver delay={0.2}>
                                <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl border-4 border-white/80 group">
                                    <img
                                        src="/assets/newimages/Outside 1.jpg"
                                        alt="Mont Bleu Gardens and Pool"
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </SectionObserver>
                        </div>
                    </div>
                </div>
            </section>

            {/* Horizontal Scroll Pillars */}
            <ScrollSection>
                {/* Stay Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-end justify-center p-6 md:px-20 md:pb-16 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Oak 2.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Suites at Mont Bleu"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                        <div>
                            <span className="text-sanctuary-gold font-serif text-xl md:text-2xl tracking-widest block mb-1">01</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg leading-none">Stay</h3>
                        </div>
                        <div className="max-w-xl space-y-5">
                            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 drop-shadow">
                                Mont Bleu is our Guest Home - not a formal guesthouse, but a place designed to feel lived-in, warm, and unhurried. Choose from 1 of 5 unique suites.
                            </p>
                            <Button to="/stay" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">View Suites</Button>
                        </div>
                    </div>
                </div>

                {/* Relax Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-end justify-center p-6 md:px-20 md:pb-16 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Pool 1.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Swimming Pool"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                        <div>
                            <span className="text-sanctuary-gold font-serif text-xl md:text-2xl tracking-widest block mb-1">02</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg leading-none">Relax</h3>
                        </div>
                        <div className="max-w-xl space-y-5">
                            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 drop-shadow">
                                Relax in a quiet mountain sanctuary surrounded by mountains and epic Fynbos flora. Enjoy a swim in our sparkling pool, a sauna in our mountain sauna, a gas-fired hot-tub or a workout in our outdoor gym.
                            </p>
                            <Button to="/relax" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Explore Relaxation</Button>
                        </div>
                    </div>
                </div>

                {/* Views Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-end justify-center p-6 md:px-20 md:pb-16 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/influencer/Lily Pond  montain view from main deck.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Views from Mont Bleu"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                        <div>
                            <span className="text-sanctuary-gold font-serif text-xl md:text-2xl tracking-widest block mb-1">03</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg leading-none">Views</h3>
                        </div>
                        <div className="max-w-xl space-y-5">
                            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 drop-shadow">
                                Franschhoek is a valley renowned for its beautiful views, and Mont Bleu — being one of the highest properties in the valley — has some of the most amazing views, especially of sunset.
                            </p>
                            <Button to="/views" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Explore Views</Button>
                        </div>
                    </div>
                </div>

                {/* Explore Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-end justify-center p-6 md:px-20 md:pb-16 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Deck.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Explore"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                        <div>
                            <span className="text-sanctuary-gold font-serif text-xl md:text-2xl tracking-widest block mb-1">04</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg leading-none">Explore</h3>
                        </div>
                        <div className="max-w-xl space-y-5">
                            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 drop-shadow">
                                Discover our walking trails, river paths, and reflective pilgrimage journey across the estate. Just 2km from Franschhoek village and beautiful winelands region.
                            </p>
                            <Button to="/explore" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-sanctuary-blue hover:text-white hover:border-sanctuary-blue">Start the Journey</Button>
                        </div>
                    </div>
                </div>

                {/* Connect & Experience Pillar */}
                <div className="w-full md:w-screen h-screen flex-shrink-0 flex items-end justify-center p-6 md:px-20 md:pb-16 relative overflow-hidden group border-b md:border-b-0 border-white/10 last:border-0">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/newimages/Experience 2.jpg"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            alt="Connect & Experience"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                        <div>
                            <span className="text-sanctuary-gold font-serif text-xl md:text-2xl tracking-widest block mb-1">05</span>
                            <h3 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg leading-none">Connect &amp; Experience</h3>
                        </div>
                        <div className="max-w-xl space-y-5">
                            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95 drop-shadow">
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
