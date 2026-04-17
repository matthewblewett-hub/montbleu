import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion } from 'framer-motion';

const ConnectExperience: React.FC = () => {
    const experiences = [
        {
            title: "Mountain Walks",
            desc: "Explore the gentle trails suitable for all fitness levels. Discover the river, the waterfall pool, and the fynbos-clad slopes.",
            image: "/assets/newimages/Trails.jpg",
            category: "Active"
        },
        {
            title: "Sunset Deck",
            desc: "Various platforms positioned for the best vantage points. Ideal for yoga, meditation, or simply watching the eagles.",
            image: "/assets/newimages/Deck.jpg",
            category: "Views"
        },
        {
            title: "Meditation Labyrinth",
            desc: "The labyrinth invites a different kind of walking — slow, intentional, and inward. Inspired by ancient cathedral labyrinths and shaped from natural stone, it offers a space to quiet the mind and rediscover a sense of inner wholeness through movement and stillness.",
            image: "/assets/newimages/Labyrinth.jpg",
            category: "Reflection"
        },
        {
            title: "Pilgrim’s Journey",
            desc: "15 stations of reflection across the estate. Each station invites pause through scripture, symbolism, and silence. QR codes provide guided meditations.",
            image: "/assets/gallery/ecea571c-05e9-46c9-9b62-cb3f919c3cca.jpg",
            category: "Spiritual"
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section with Philospohy Quote */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/newimages/Experience 2.jpg"
                        alt="Le Sanctuaire Philosophy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center text-white max-w-4xl">
                    <SectionObserver>
                        <p className="text-xs font-serif uppercase tracking-widest text-sanctuary-stone mb-8">The Philosophy</p>
                        <h1 className="text-4xl md:text-6xl font-serif leading-tight italic">
                            "A sanctuary is not an escape from the world, but a place where the world is seen more clearly."
                        </h1>
                    </SectionObserver>
                </div>
            </section>

            {/* Philosophy Text */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <SectionObserver className="space-y-8 text-lg font-light leading-relaxed text-sanctuary-blue/80">
                        <p>
                            Mont Bleu has been shaped as a journey - from valley to summit, from noise to stillness, from the grounded realities of earth toward the openness of heaven. The land itself participates in this movement. Stone, water, trees, paths, and silence are not decorative elements here; they are integral to the design and purpose of the place.
                        </p>
                        <p>
                            In a fragmented and distracted world, we all arrive carrying different longings for connection. Whether it is a reconnection with a loved one, an internal centering, or a pull toward the healing rhythms of nature, Mont Bleu is being restored as a living palette where connection can be rediscovered.
                        </p>
                        <p className="font-serif text-xl md:text-2xl text-sanctuary-blue italic pt-8 border-t border-sanctuary-blue/10">
                            Each path, structure, and detail is added with care, guided by a single intention: to create a place where connection - with self, with others, with nature, and with the divine - can be gently restored.
                        </p>
                    </SectionObserver>
                </div>
            </section>

            {/* Experiences Header */}
            <section className="py-16 bg-sanctuary-sand">
                <div className="container mx-auto px-6 text-center">
                    <SectionObserver>
                        <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6 block">Curated Moments</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-sanctuary-blue mb-8">Experience</h2>
                        <p className="max-w-2xl mx-auto text-xl font-light text-sanctuary-blue/70">
                            Beyond being a place to stay, Mont Bleu is a place to experience — with your body, your senses, and your attention.
                        </p>
                    </SectionObserver>
                </div>
            </section>

            {/* Experiences List */}
            <div className="bg-white">
                {experiences.map((exp, index) => (
                    <section key={index} className="py-24 border-b border-sanctuary-blue/5 last:border-0 group hover:bg-sanctuary-sand/30 transition-colors duration-700">
                        <div className="container mx-auto px-6">
                            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 lg:gap-32`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="md:w-1/2"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={exp.image}
                                            alt={exp.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </motion.div>

                                <div className="md:w-1/2">
                                    <SectionObserver>
                                        <span className="text-xs uppercase tracking-widest text-sanctuary-gold mb-4 block">{exp.category}</span>
                                        <h2 className="text-4xl md:text-5xl font-serif text-sanctuary-blue mb-6">{exp.title}</h2>
                                        <p className="text-lg font-light leading-relaxed text-sanctuary-blue/70 mb-8">
                                            {exp.desc}
                                        </p>
                                    </SectionObserver>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ConnectExperience;
