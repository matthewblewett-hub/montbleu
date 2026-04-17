import React, { useState } from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import Modal from '../components/ui/Modal';
import { Waves, Flame, Droplets, Dumbbell } from 'lucide-react';

const Relax: React.FC = () => {
    const [selectedFeature, setSelectedFeature] = useState<any>(null);

    const features = [
        {
            title: "Swimming Pool",
            description: "Our sparkling swimming pool has epic and private views of the surrounding mountains. Spend the day on the loungers under the umbrella or tanning under the African sun.",
            image: "/assets/newimages/Pool 2.jpg",
            icon: Waves
        },
        {
            title: "River Sauna",
            description: "Our 2-person sauna is privately placed on a bank overlooking our mountain stream. Here you can enjoy the benefits of a sauna to the sound of the gurgling stream and with endless vistas of the beautiful Franschhoek valley beneath. Plus, as a sensory bonus, we have steps into a refreshing river pool to enjoy a natural cold river swim between sauna sessions – your skin will be completely revitalized.",
            image: "/assets/newimages/Sauna.jpg",
            icon: Droplets
        },
        {
            title: "Hot Tub",
            description: "Enjoy our gas-fired hot tub with views of the mountain hidden in our Orchard area. The perfect place for a couple to relax after a busy day in the valley.",
            image: "/assets/newimages/Hot Tub.jpg",
            icon: Flame
        },
        {
            title: "Outdoor Gym",
            description: "Our new outdoor gym facility includes free weights, a pull-up bar, and a stepper perched with stunning views to inspire you to keep up your training routines even while enjoying the valley.",
            image: "/assets/newimages/Outdoor Gym.jpg",
            icon: Dumbbell
        }
    ];

    return (
        <div className="pt-20 bg-sanctuary-sand min-h-screen">
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/newimages/Pool 1.jpg"
                        alt="Relaxation at Mont Bleu"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center text-white max-w-4xl">
                    <SectionObserver>
                        <span className="text-xs uppercase tracking-[0.4em] mb-6 block text-sanctuary-stone">The Sanctuary</span>
                        <h1 className="text-5xl md:text-7xl font-serif mb-8">Relax & Restore</h1>
                        <p className="text-lg md:text-xl font-light leading-relaxed opacity-90">
                            Relax in a quiet mountain sanctuary surrounded by mountains and epic Fynbos flora. Enjoy a swim in our sparkling pool, a sauna in our mountain sauna, a gas-fired hot-tub or a workout in our outdoor gym. Do as much or as little as you want.
                        </p>
                    </SectionObserver>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {features.map((feature, index) => (
                            <SectionObserver key={index} delay={index * 0.1}>
                                <div
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedFeature(feature)}
                                >
                                    <div className="aspect-[16/9] overflow-hidden rounded-sm mb-6 relative">
                                        <div className="absolute inset-0 bg-sanctuary-blue/0 group-hover:bg-sanctuary-blue/10 transition-colors duration-500 z-10" />
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <feature.icon strokeWidth={1} className="text-sanctuary-gold w-6 h-6" />
                                        <h3 className="text-2xl font-serif text-sanctuary-blue">{feature.title}</h3>
                                    </div>
                                    <p className="text-sanctuary-blue/70 font-light leading-relaxed line-clamp-2">
                                        {feature.description}
                                    </p>
                                </div>
                            </SectionObserver>
                        ))}
                    </div>
                </div>
            </section>

            <Modal isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)}>
                {selectedFeature && (
                    <div className="text-sanctuary-blue">
                        <h2 className="text-4xl font-serif mb-6">{selectedFeature.title}</h2>
                        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-8">
                            <img
                                src={selectedFeature.image}
                                alt={selectedFeature.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-lg font-light leading-relaxed opacity-80">
                            {selectedFeature.description}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Relax;
