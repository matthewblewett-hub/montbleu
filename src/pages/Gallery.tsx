import React, { useState } from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
    const images = [
        "/assets/gallery/1d7f6c86-649d-4a4d-9bd2-bfa13080d62a.jpg",
        "/assets/gallery/4b7a33db-63e2-4ade-8bc8-a1275608887f.jpg",
        "/assets/gallery/5c0fc828-6e45-4fd9-81a8-c2034ac3acff.jpg",
        "/assets/gallery/6030eb1f-5ad7-43b5-87c2-04f74630b92b.jpg",
        "/assets/gallery/947f3989-4317-4543-b0f3-915689dffeb3.jpg",
        "/assets/gallery/9a85d590-a14e-4fc0-8dac-b600722c51e5.jpg",
        "/assets/gallery/9cd19cdf-e1b8-450d-ab90-679f944ea46f.jpg",
        "/assets/gallery/9e614d89-129c-40b0-a60f-4f78b1ad2e9b.jpg",
        "/assets/gallery/ecea571c-05e9-46c9-9b62-cb3f919c3cca.jpg",
        "/assets/gallery/f48e4e08-9e30-4fb9-b222-f2bb77bfc0ba.jpg",
    ];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="pt-24 pb-20">
            <SectionObserver className="container mx-auto px-6 mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-serif text-sanctuary-blue mb-6">Gallery</h1>
                <p className="text-sanctuary-blue/60 font-light">Glimpses of life at Mont Bleu</p>
            </SectionObserver>

            <div className="container mx-auto px-6">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((src, index) => (
                        <SectionObserver key={index} delay={index * 0.05} className="break-inside-avoid">
                            <div
                                className="overflow-hidden cursor-zoom-in"
                                onClick={() => setSelectedImage(src)}
                            >
                                <img
                                    src={src}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-auto hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </SectionObserver>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white hover:text-sanctuary-gold transition-colors">
                            <X size={32} />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full screen"
                            className="max-h-full max-w-full object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
