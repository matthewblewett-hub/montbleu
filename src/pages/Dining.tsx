import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion } from 'framer-motion';

const Dining: React.FC = () => {
    return (
        <div className="pt-20 bg-sanctuary-sand">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/newimages/Dining 1.jpg"
                        alt="Dining at Mont Bleu"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif mb-4"
                    >
                        Dining & Food
                    </motion.h1>
                    <p className="text-lg md:text-xl font-light tracking-widest uppercase opacity-80">Nature's Harvest, Shared with Care</p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <SectionObserver>
                        <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-6 block font-medium">The Experience</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-sanctuary-blue mb-12">Honest, Local & Unhurried</h2>
                        <p className="text-xl font-light text-sanctuary-blue/80 leading-relaxed">
                            Food at Mont Bleu is an extension of the farm itself—unpretentious, seasonal, and deeply connected to the land. Whether it's our signature sourdough breakfast or a quiet bottle of wine from our honesty bar, every bite is meant to be savored slowly.
                        </p>
                    </SectionObserver>
                </div>
            </section>

            {/* Breakfast & Provisioning */}
            <section className="pb-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <SectionObserver>
                            <div className="aspect-[4/5] overflow-hidden rounded-sm">
                                <img src="/assets/newimages/Dining 2.jpg" alt="Mont Bleu Breakfast" className="w-full h-full object-cover" />
                            </div>
                        </SectionObserver>
                        <SectionObserver delay={0.2}>
                            <h3 className="text-3xl md:text-4xl font-serif text-sanctuary-blue mb-8">The Continental Breakfast</h3>
                            <div className="space-y-6 text-lg font-light text-sanctuary-blue/70">
                                <p>
                                    Our mornings begin with the scent of fresh coffee and the simplicity of high-quality local ingredients. 
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <span className="text-sanctuary-gold font-serif text-xl">01</span>
                                        <span>Artisanal Sourdough & Fresh Pastries from Franschhoek's finest bakeries.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-sanctuary-gold font-serif text-xl">02</span>
                                        <span>Local Farm Cheeses, seasonal fruits, and Greek yogurt.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-sanctuary-gold font-serif text-xl">03</span>
                                        <span>Le Sanctuaire Honey—harvested directly from our estate hives.</span>
                                    </li>
                                </ul>
                                <p className="pt-8 italic border-t border-sanctuary-blue/10">
                                    Breakfast is served in our mountain-view dining hall or al fresco on the deck, prepared with care by Tandy and the team.
                                </p>
                            </div>
                        </SectionObserver>
                    </div>
                </div>
            </section>

            {/* Honesty Bar & In-Room comforts */}
            <section className="py-32 bg-sanctuary-blue text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <SectionObserver>
                            <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-6 block font-medium">Afternoon & Evening</span>
                            <h2 className="text-4xl md:text-6xl font-serif mb-12">The Honesty Bar</h2>
                            <p className="text-xl font-light opacity-80 leading-relaxed mb-12">
                                We believe hospitality should feel like home. Our Honesty Bar is stocked with a curated selection of Franschhoek valley wines, artisanal spirits, and light refreshments. Help yourself to a glass of Chenin Blanc for the sunset deck, or find a snack to take on your mountain walk.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border border-white/20 p-8 rounded-sm backdrop-blur-sm">
                                    <h4 className="font-serif text-xl mb-4">In-Room Comforts</h4>
                                    <p className="text-sm font-light opacity-70">Every suite is equipped with a Nespresso machine, a selection of fine teas, and filtered mountain water.</p>
                                </div>
                                <div className="border border-white/20 p-8 rounded-sm backdrop-blur-sm">
                                    <h4 className="font-serif text-xl mb-4">Picnic Baskets</h4>
                                    <p className="text-sm font-light opacity-70">Planning a longer hike? Request a farm-inspired picnic basket to enjoy at one of our hidden mountain decks.</p>
                                </div>
                            </div>
                        </SectionObserver>
                    </div>
                </div>
            </section>

            {/* Local Dining */}
            <section className="py-32">
                <div className="container mx-auto px-6 text-center">
                    <SectionObserver>
                        <h2 className="text-4xl font-serif text-sanctuary-blue mb-12">The Culinary Capital</h2>
                        <p className="text-xl font-light text-sanctuary-blue/70 max-w-2xl mx-auto mb-16">
                            Mont Bleu is just 2km from Franschhoek village, home to South Africa's most acclaimed restaurants. We are happy to share our personal favorites and assist with reservations.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <img src="/assets/newimages/GH Deck.jpg" className="w-full md:w-[600px] h-96 object-cover rounded-sm" alt="Franschhoek Valley" />
                        </div>
                    </SectionObserver>
                </div>
            </section>
        </div>
    );
};

export default Dining;
