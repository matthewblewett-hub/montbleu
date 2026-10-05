import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';

const WinterPackage: React.FC = () => {
    return (
        <div className="pt-20 min-h-screen bg-sanctuary-sand flex flex-col justify-between">
            <Helmet>
                <title>Winter Packages | Mont Bleu Guesthouse Franschhoek</title>
                <meta name="description" content="Winter Packages for 2027 coming soon at Mont Bleu Guesthouse in Franschhoek." />
                <meta name="robots" content="noindex, follow" />
                <link rel="canonical" href="https://www.montbleu.co.za/winter-package" />
                <meta property="og:url" content="https://www.montbleu.co.za/winter-package" />
                <meta property="og:title" content="Winter Packages | Mont Bleu Guesthouse Franschhoek" />
                <meta property="og:description" content="Winter Packages for 2027 coming soon at Mont Bleu Guesthouse in Franschhoek." />
            </Helmet>

            {/* Header / Main Placeholder Section */}
            <section className="py-28 md:py-36 text-center px-6 my-auto">
                <SectionObserver>
                    <span className="text-xs font-serif uppercase tracking-[0.3em] text-sanctuary-gold mb-6 block font-medium">
                        Seasonal Offers
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-sanctuary-blue mb-4">
                        Winter Packages
                    </h1>
                    <p className="text-lg md:text-xl font-serif italic text-sanctuary-gold mb-8">
                        Winter Packages for 2027 Coming Soon
                    </p>
                    <div className="w-px h-12 bg-sanctuary-blue/20 mx-auto mb-8"></div>
                    <p className="text-lg font-light text-sanctuary-blue/80 max-w-xl mx-auto mb-10 leading-relaxed">
                        Our 2026 seasonal winter offers have concluded. We are currently preparing exclusive new curated packages and seasonal rates for Winter 2027.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                        <Button to="/stay" variant="primary" className="w-full sm:w-auto">
                            Explore Our Suites
                        </Button>
                        <Button to="/contact" variant="secondary" className="w-full sm:w-auto">
                            Contact Us
                        </Button>
                    </div>
                </SectionObserver>
            </section>

            {/* Notice Footer Section */}
            <section className="py-16 bg-sanctuary-blue text-white text-center px-6">
                <SectionObserver>
                    <h2 className="text-2xl md:text-3xl font-serif mb-4">Planning a stay in Franschhoek?</h2>
                    <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm md:text-base font-light">
                        Our luxury suites, mountain hot tub, riverside sauna, and daily breakfasts are available year-round.
                    </p>
                    <Button to="/book" variant="secondary" className="border-white text-sanctuary-blue bg-white hover:bg-transparent hover:text-white hover:border-white">
                        Book Direct
                    </Button>
                </SectionObserver>
            </section>
        </div>
    );
};

export default WinterPackage;
