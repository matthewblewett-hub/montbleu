import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';

const WinterPackage: React.FC = () => {
    const images = [
        "/assets/winter-special/Winter special 1.jpeg",
        "/assets/winter-special/Winter special 2.jpeg",
        "/assets/winter-special/Winter special 3.jpeg",
        "/assets/winter-special/Winter special 4.jpeg",
        "/assets/winter-special/Winter special 5.jpeg"
    ];

    return (
        <div className="pt-20 min-h-screen bg-sanctuary-sand">
            {/* Header */}
            <section className="py-24 text-center px-6">
                <SectionObserver>
                    <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-6 block font-medium">Seasonal Offer</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-sanctuary-blue mb-8">Winter Package</h1>
                    <div className="w-px h-12 bg-sanctuary-blue/20 mx-auto mb-8"></div>
                    <p className="text-xl font-light text-sanctuary-blue/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Experience the quiet beauty of a Franschhoek winter at Mont Bleu. Discover the details of our exclusive seasonal offer below.
                    </p>
                    <Button to="/book" variant="primary">Book Now</Button>
                </SectionObserver>
            </section>

            {/* Images Grid */}
            <section className="pb-32 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {images.map((src, index) => (
                            <SectionObserver key={index} delay={index * 0.1}>
                                <div className={`overflow-hidden shadow-xl rounded-sm ${index === 0 ? 'md:col-span-2' : ''}`}>
                                    <img 
                                        src={src} 
                                        alt={`Winter Special Details ${index + 1}`} 
                                        className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </SectionObserver>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Call to Action */}
            <section className="py-24 bg-sanctuary-blue text-white text-center px-6">
                <SectionObserver>
                    <h2 className="text-3xl md:text-5xl font-serif mb-8">Ready for your winter escape?</h2>
                    <Button to="/book" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-transparent hover:text-white hover:border-white">
                        Check Availability
                    </Button>
                </SectionObserver>
            </section>
        </div>
    );
};

export default WinterPackage;
