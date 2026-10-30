import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SectionObserver from '../components/ui/SectionObserver';

const VIEW_PHOTOS = [
    {
        src: "/assets/newimages/View 1.jpg",
        title: "Franschhoek Valley from the High Slopes",
        caption: "Sweeping daytime views from the indigenous fynbos and pine ridges down across the green valley floor toward the Simonsberg and Franschhoek mountain peaks."
    },
    {
        src: "/assets/newimages/View 2.jpg",
        title: "Pink & Gold Above the Pines",
        caption: "Dramatic twilight skies glowing in rose and amber behind the silhouettes of towering mountain pines."
    },
    {
        src: "/assets/newimages/View 3.jpg",
        title: "Crimson Sunset Over Mont Bleu",
        caption: "Fiery evening skies illuminating the estate nestled among wild fynbos and pine trees high on the Wemmershoek slopes."
    },
    {
        src: "/assets/newimages/View 4.jpg",
        title: "The Living Fynbos Amphitheatre",
        caption: "Panoramic vistas over lush mountain fynbos and forest canopy out to the craggy peaks under cloud-dappled skies."
    },
    {
        src: "/assets/newimages/View 5.jpg",
        title: "Golden Pincushion Proteas in Bloom",
        caption: "Indigenous Leucospermum blossoms catching the warm mountain sunlight against the forest backdrop of the Cape Floral Kingdom."
    },
    {
        src: "/assets/newimages/View 6.jpg",
        title: "Proteas Framing the Valley",
        caption: "Vibrant pink proteas in the foreground with the entire Franschhoek Valley and distant mountain range unfolding beyond."
    },
    {
        src: "/assets/newimages/Deck 2.jpg",
        title: "Golden Hour on the Sunset Deck",
        caption: "Perched high on the Wemmershoek slopes, watching the sun set across the entire Franschhoek Valley."
    },
    {
        src: "/assets/influencer/Lily Pond  montain view from main deck.jpg",
        title: "Main Deck & Lily Pond Vista",
        caption: "Looking out over the tranquil lily pond toward the dramatic Franschhoek mountain range."
    },
    {
        src: "/assets/influencer/Pretty Back of Guesthouse with perffect mountain views.jpg",
        title: "Mountain Amphitheatre",
        caption: "Mont Bleu nestled beneath the towering peaks with sweeping valley views from the garden lawn."
    },
    {
        src: "/assets/influencer/Corner deck bar and litliy pond view.jpg",
        title: "The Deck Bar Vantage",
        caption: "Morning coffee or evening sundowners framed by the lily pond and distant mountain peaks."
    },
    {
        src: "/assets/influencer/Views front .jpg",
        title: "Framed Valley Panorama",
        caption: "Glimpsing the green valley floor, olive groves, and mountain ridges from the guesthouse."
    },
    {
        src: "/assets/newimages/Experience.jpg",
        title: "Sunset Over the Fynbos",
        caption: "As one of the highest properties in the valley, the evening light lingers across the indigenous fynbos slopes."
    },
    {
        src: "/assets/influencer/Outdoor gym and views.jpg",
        title: "Elevated Estate Perspectives",
        caption: "Uninterrupted mountain and valley views from across the upper orchard and outdoor gym."
    },
    {
        src: "/assets/influencer/Main Deck.jpg",
        title: "Forest & Mountain Canopy",
        caption: "Relaxing on the main deck surrounded by pine forests and mountain air."
    },
    {
        src: "/assets/influencer/Back of Guesthouse.jpg",
        title: "The Guesthouse Against the Peaks",
        caption: "Sunlight catching the guesthouse and pool deck high above Franschhoek."
    }
];

const Views: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<typeof VIEW_PHOTOS[0] | null>(null);

    return (
        <div className="pt-20 bg-sanctuary-sand min-h-screen">
            <Helmet>
                <title>Views &amp; Sunset Vistas | Mont Bleu Guesthouse Franschhoek</title>
                <meta
                    name="description"
                    content="Franschhoek is a valley renowned for its beautiful views, and Mont Bleu — being one of the highest properties in the valley — offers breathtaking mountain and sunset vistas."
                />
                <link rel="canonical" href="https://www.montbleu.co.za/views" />
                <meta property="og:url" content="https://www.montbleu.co.za/views" />
                <meta property="og:title" content="Panoramic Mountain & Sunset Views | Mont Bleu Franschhoek" />
                <meta
                    property="og:description"
                    content="One of the highest properties in the Franschhoek valley, offering unforgettable panoramic and sunset views."
                />
                <meta property="og:image" content="https://www.montbleu.co.za/assets/newimages/Deck 2.jpg" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative h-[75vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/newimages/Deck 2.jpg"
                        alt="Sunset Views from Mont Bleu Franschhoek"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                </div>

                <div className="container mx-auto px-6 pb-16 md:pb-24 relative z-10 text-white max-w-5xl text-center">
                    <SectionObserver>
                        <span className="text-xs uppercase tracking-[0.4em] mb-4 block text-sanctuary-gold">
                            Elevated Above the Valley
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-lg">
                            The Views
                        </h1>
                        <p className="text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-white/95 drop-shadow">
                            Franschhoek is a valley renowned for its beautiful views, and Mont Bleu — being one of the highest properties in the valley — has some of the most amazing views, especially of sunset.
                        </p>
                    </SectionObserver>
                </div>
            </section>

            {/* Editorial Intro */}
            <section className="py-20 bg-white border-b border-sanctuary-blue/10">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <SectionObserver>
                        <p className="text-xl md:text-2xl font-serif italic text-sanctuary-blue leading-relaxed">
                            "From the first morning light catching the crags of the Franschhoek mountains to the golden glow of sunset spilling across the valley floor below, every corner of the estate frames a living panorama."
                        </p>
                    </SectionObserver>
                </div>
            </section>

            {/* Curated Views Gallery */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {VIEW_PHOTOS.map((photo, idx) => (
                            <SectionObserver key={photo.src} delay={idx * 0.05}>
                                <div
                                    onClick={() => setSelectedImage(photo)}
                                    className="group cursor-pointer bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="aspect-[4/4] overflow-hidden relative">
                                        <img
                                            src={photo.src}
                                            alt={photo.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-serif text-sanctuary-blue mb-2">
                                                {photo.title}
                                            </h3>
                                            <p className="text-sm font-light text-sanctuary-blue/70 leading-relaxed">
                                                {photo.caption}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SectionObserver>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
                            aria-label="Close preview"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-5xl w-full flex flex-col items-center"
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-h-[78vh] w-auto object-contain rounded-sm shadow-2xl mb-6"
                            />
                            <h3 className="text-2xl font-serif text-white mb-2 text-center">
                                {selectedImage.title}
                            </h3>
                            <p className="text-white/80 font-light text-center max-w-2xl">
                                {selectedImage.caption}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Views;
