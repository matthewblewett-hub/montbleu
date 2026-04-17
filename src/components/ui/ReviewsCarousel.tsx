import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionObserver from './SectionObserver';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
    {
        name: "David",
        date: "January 2026",
        text: "Mont Bleu/ Le Sanctuaire is an absolute dream for anyone looking to relax. The views over Franschhoek are breathtaking and can be enjoyed from every room, the decks, and while strolling through the gardens, all surrounded by beautiful mountains - yet still close to all major restaurants and wine estates. The hosts and team are wonderful and make you feel at home from the very first minute. We will definitely be back!"
    },
    {
        name: "Nicola",
        date: "February 2026",
        text: "This was by far the most amazing air bnb stay we have ever had! It absolutely blew us away when we arrived - the photos didn’t do it justice... Highlights for me were washing my hair in the outdoor shower, having a cold dip in the stream after using the sauna and the honesty bar... Honestly do not hesitate if you’re considering booking."
    },
    {
        name: "Ankit",
        date: "February 2026",
        text: "Peaceful and calm stay with beautiful views and even more amazing staff who were helpful and ensured everything was even better than the expectation. Will definitely want to come back here for an even longer duration."
    },
    {
        name: "Grete",
        date: "February 2026",
        text: "Amazing stay with an amazing host! Super friendly, helpful, and accommodating. Everything was perfect and we couldn’t have asked for more. The staff were also very friendly, and the place is beautiful. I would definitely come back!"
    }
];

const ReviewsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextReview();
        }, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section className="py-24 md:py-32 bg-sanctuary-sand overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <SectionObserver>
                    <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6 block">Guest Experiences</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-sanctuary-blue mb-16">Stories from the Sanctuary</h2>
                    
                    <div className="relative min-h-[300px] flex px-4 md:px-12 items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-4"
                            >
                                <div className="flex gap-1 mb-8 text-sanctuary-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                                    ))}
                                </div>
                                <p className="text-xl md:text-3xl font-serif leading-relaxed text-sanctuary-blue italic mb-8 max-w-4xl">
                                    "{reviews[currentIndex].text}"
                                </p>
                                <div className="flex flex-col items-center">
                                    <span className="font-semibold text-sanctuary-blue uppercase tracking-widest text-sm">{reviews[currentIndex].name}</span>
                                    <span className="text-sm font-light text-sanctuary-blue/60 mt-1">{reviews[currentIndex].date}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-16 text-sanctuary-blue/40">
                        <button onClick={prevReview} className="hover:text-sanctuary-gold transition-colors duration-300 p-2">
                            <ChevronLeft size={32} strokeWidth={1} />
                        </button>
                        
                        <div className="flex gap-3">
                            {reviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-sanctuary-gold' : 'bg-transparent border border-sanctuary-blue/20'}`}
                                    aria-label={`Go to review ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button onClick={nextReview} className="hover:text-sanctuary-gold transition-colors duration-300 p-2">
                            <ChevronRight size={32} strokeWidth={1} />
                        </button>
                    </div>

                </SectionObserver>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
