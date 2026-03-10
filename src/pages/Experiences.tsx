import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion } from 'framer-motion';

const Experiences: React.FC = () => {
    const experiences = [
        {
            title: "Mountain Walks",
            desc: "Explore the gentle trails suitable for all fitness levels. Discover the river, the waterfall pool, and the fynbos-clad slopes.",
            image: "/assets/gallery/ecea571c-05e9-46c9-9b62-cb3f919c3cca.jpg",
            category: "Active"
        },
        {
            title: "The Hot Tub",
            desc: "A wood-fired hot tub situated for privacy and views. Best enjoyed at sunset with a glass of local MCC.",
            image: "/assets/gallery/4b7a33db-63e2-4ade-8bc8-a1275608887f.jpg",
            category: "Relaxation"
        },
        {
            title: "Simonsberg Decks",
            desc: "Various platforms positioned for the best vantage points. Ideal for yoga, meditation, or simply watching the eagles.",
            image: "/assets/gallery/6030eb1f-5ad7-43b5-87c2-04f74630b92b.jpg",
            category: "Views"
        },
        {
            title: "River Sauna",
            desc: "A secluded sauna on the riverbank. Heat up, then cool down with a plunge in the fresh mountain stream.",
            image: "/assets/gallery/947f3989-4317-4543-b0f3-915689dffeb3.jpg",
            category: "Wellness"
        },
        {
            title: "Meditation Labyrinth",
            desc: "The labyrinth invites a different kind of walking — slow, intentional, and inward. Inspired by ancient cathedral labyrinths and shaped from natural stone, it offers a space to quiet the mind and rediscover a sense of inner wholeness through movement and stillness.",
            image: "/assets/gallery/ecea571c-05e9-46c9-9b62-cb3f919c3cca.jpg", // Reuse pilgrim image or similar
            category: "Reflection"
        }
    ];

    return (
        <div className="pt-20">
            <section className="py-24 md:py-32 bg-sanctuary-sand">
                <div className="container mx-auto px-6 text-center">
                    <SectionObserver>
                        <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6 block">Curated Moments</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-sanctuary-blue mb-8">Experiences - On the Estate</h1>
                        <p className="max-w-2xl mx-auto text-xl font-light text-sanctuary-blue/70">
                            Mont Bleu is not only a place to stay, but a place to experience — with your body, your senses, and your attention. Each experience on the estate invites you to slow down, become present, and engage more fully with the landscape and with yourself.
                        </p>
                    </SectionObserver>
                </div>
            </section>

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

export default Experiences;
