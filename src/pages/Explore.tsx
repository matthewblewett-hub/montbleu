import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionObserver from '../components/ui/SectionObserver';
import Accordion from '../components/ui/Accordion';

const Explore: React.FC = () => {
    const [activeLocation, setActiveLocation] = useState(0);

    const locations = [
        {
            title: "The Farm",
            image: "/assets/newimages/GH 1.jpg",
            desc: (
                <div className="space-y-4">
                    <p>Mont Bleu is set within the living landscape of Le Sanctuaire Farm, a mountain estate slowly and thoughtfully being restored as an exclusive eco retreat. Le Sanctuaire Farm is perched high on the Wemmershoek mountains offering some of the finest interaction with pristine Fynbos, the pride of the Cape Floral Kingdom.</p>
                    <p>The lifestyle farm is dedicated to restoring the natural ecosystem of this precious part of creation. Small-scale fruit, olive, honey and wild buchu is farmed on the property. The highlight is the ever-changing array of blossoms that are on display throughout the year.</p>
                </div>
            )
        },
        {
            title: "Walking Trails",
            image: "/assets/newimages/Trails.jpg",
            desc: (
                <div className="space-y-4">
                    <p>The farm celebrates the natural beauty of the Franschhoek Valley and the remarkable Cape Fynbos Floral Kingdom that surrounds and shapes the property.</p>
                    <p>Guests are encouraged to explore the land at their own pace - through walking trails, river paths, and quiet encounters with water, stone, and indigenous vegetation. We now offer short daily walking trails on the property on a booking basis.</p>
                </div>
            )
        },
        {
            title: "Pilgrim's Journey",
            image: "/assets/gallery/ecea571c-05e9-46c9-9b62-cb3f919c3cca.jpg",
            desc: (
                <div className="space-y-4">
                    <p>For those who enjoy walking, nature, and spiritual reflection, we invite you to experience Mont Bleu Way - a curated pilgrimage journey across the estate.</p>
                    <p>Mont Bleu Way is a guided walking route marked by 15 stations of reflection. Each station invites pause through scripture, symbolism, and silence. QR codes at each station provide guided meditations and reflections.</p>
                </div>
            )
        },
        {
            title: "Franschhoek",
            image: "/assets/newimages/Tram photo.jpg",
            desc: (
                <div className="space-y-6 text-sm md:text-base pr-4">
                    <p>While Mont Bleu offers a sense of seclusion and quiet, the village of Franschhoek lies just 2 km away, placing some of South Africa’s finest food, wine, and cultural experiences within easy reach.</p>

                    <div>
                        <h4 className="font-serif text-sanctuary-blue mb-2 text-lg">Franschhoek Village</h4>
                        <p className="mb-2">Known as the culinary heart of the Cape Winelands, Franschhoek is home to an extraordinary concentration of award-winning restaurants.</p>
                        <ul className="list-disc md:list-none space-y-1 opacity-80">
                            <li>• Art galleries and sculpture gardens</li>
                            <li>• The Huguenot Memorial Museum</li>
                            <li>• The Franschhoek Wine Tram</li>
                            <li>• Saturday markets and seasonal festivals</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-sanctuary-blue mb-2 text-lg">Wine Estates</h4>
                        <p>The Franschhoek Valley and neighbouring regions are dotted with some of South Africa’s most beautiful wine estates, offering tastings, cellar tours, and estate dining.</p>
                    </div>
                </div>
            )
        }
    ];

    const trails = [
        { title: "Oak Tree Way", content: "A gentle stroll near the entrance to the farm leads into the river valley beneath a gallery of mature oak trees. A perfect walk on a warm day." },
        { title: "River Walk", content: "A relaxed riverside walk running from the olive grove up toward the orchard and chicken coop. Ideal for a short wander with the sound of flowing water." },
        { title: "Simonsberg Vista", content: "A short but invigorating climb up the ridge on the far side of the river rewards you with sweeping westward views and an epic vista." },
        { title: "Waterfall Pool Loop", content: "Our most popular walk. This circular route follows the river upstream to a series of cascading waterfalls before descending into the river basin." },
        { title: "Fynbos Trail", content: "A short trail winding through indigenous fynbos slopes, leading up to the Sunset Deck and expansive valley views." },
        { title: "The Ascent", content: "Continuing from the Sunset Deck, this trail climbs steadily toward The Cross, offering ever-widening views across the Franschhoek Valley below." }
    ];

    return (
        <div className="pt-20">
            {/* Interactive Map/Legend Section */}
            <section className="min-h-screen md:h-screen flex flex-col md:flex-row border-b border-sanctuary-blue/10">
                {/* Left: Legend List */}
                <div className="w-full md:w-1/3 p-8 md:p-16 flex flex-col justify-center bg-sanctuary-sand z-10">
                    <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-8 md:mb-12 block">Discover the Estate</span>
                    <div className="space-y-2 mb-8 md:mb-0">
                        {locations.map((loc, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveLocation(index)}
                                onClick={() => setActiveLocation(index)}
                                className="cursor-pointer group"
                            >
                                <h2 className={`text-3xl md:text-5xl font-serif transition-colors duration-300 ${activeLocation === index ? 'text-sanctuary-blue' : 'text-sanctuary-blue/20 hover:text-sanctuary-blue/40'}`}>
                                    {loc.title}
                                </h2>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 md:mt-12 flex-1 md:overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLocation}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-sanctuary-blue/60 font-light leading-relaxed pb-12 md:pb-0"
                            >
                                {locations[activeLocation].desc}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Visual */}
                <div className="w-full md:w-2/3 relative overflow-hidden bg-black/10 h-[50vh] md:h-auto">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeLocation}
                            src={locations[activeLocation].image}
                            alt={locations[activeLocation].title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-sanctuary-blue/10 mix-blend-multiply" />
                </div>
            </section>

            {/* Trails Layout */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row gap-16 lg:gap-24">
                    <div className="md:w-1/3">
                        <SectionObserver>
                            <h2 className="text-4xl md:text-6xl font-serif text-sanctuary-blue mb-8">The Trails</h2>
                            <p className="text-lg text-sanctuary-blue/70 font-light leading-relaxed mb-8">
                                Mont Bleu is criss-crossed with a network of short, well-kept walking trails. These paths invite you into quiet valleys, along rivers, up ridgelines, and through indigenous vegetation.
                            </p>
                            <p className="text-sm uppercase tracking-widest text-sanctuary-gold">Detailed descriptions</p>
                        </SectionObserver>
                    </div>
                    <div className="md:w-2/3">
                        <SectionObserver delay={0.2}>
                            <Accordion items={trails} />
                        </SectionObserver>
                    </div>
                </div>
            </section>

            {/* Pilgrim's Journey Teaser */}
            <section className="py-32 bg-sanctuary-blue text-sanctuary-sand text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <SectionObserver>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8">The Pilgrim’s Journey</h2>
                        <p className="text-xl font-light leading-relaxed opacity-80 mb-12">
                            15 stations of reflection. Each station invites pause through scripture, symbolism, and silence.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 opacity-50 text-xs uppercase tracking-widest">
                            {[
                                "The Sign", "The Gate", "The Twelve", "The Gardens", "Le Chêne",
                                "The Olives", "Simonsberg Vista", "The Waboom & the Orchard", "The Gulley", "Get Your Feet Wet",
                                "The Waterfall Pool", "Fynbos Rock", "The Labyrinth", "The Deck", "The Cross"
                            ].map((station, i) => (
                                <span key={i}>{station}</span>
                            ))}
                        </div>
                    </SectionObserver>
                </div>
            </section>
        </div>
    );
};

export default Explore;
