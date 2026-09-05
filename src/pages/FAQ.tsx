import React, { useState } from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        category: "Booking & Reservations",
        question: "How do I make a reservation?",
        answer: "Reservations can be made directly through our website or through booking platforms such as Airbnb. Direct bookings are often the best way to ensure availability and personalised service."
    },
    {
        category: "Booking & Reservations",
        question: "Do you require a deposit to confirm a booking?",
        answer: "A deposit may be required to secure your reservation. The balance is usually payable prior to arrival or on check-in depending on the booking terms."
    },
    {
        category: "Booking & Reservations",
        question: "What is your cancellation policy?",
        answer: "Cancellation terms depend on the rate and booking platform used. Typically, cancellations made within a certain period prior to arrival may incur a fee. Please refer to our Booking Terms page for more details."
    },
    {
        category: "Booking & Reservations",
        question: "Is it cheaper to book directly?",
        answer: "In many cases booking directly through our website offers the best value and flexibility."
    },
    {
        category: "Arrival & Departure",
        question: "What time is check-in?",
        answer: "Check-in is typically from 3:00 pm onwards."
    },
    {
        category: "Arrival & Departure",
        question: "What time is check-out?",
        answer: "Check-out is normally by 10:00 am."
    },
    {
        category: "Arrival & Departure",
        question: "Can I request early check-in or late check-out?",
        answer: "Early check-in or late check-out may be possible depending on availability. Please contact us in advance to arrange."
    },
    {
        category: "The Property",
        question: "Where is Mont Bleu Guesthouse located?",
        answer: "Mont Bleu Guesthouse is located in Franschhoek, one of South Africa’s most beautiful wine valleys, offering mountain views and easy access to vineyards, restaurants, and outdoor activities."
    },
    {
        category: "The Property",
        question: "Is Mont Bleu within walking distance of Franschhoek village?",
        answer: "Mont Bleu is located approximately 2 km from the centre of Franschhoek village. It is a beautiful walk during the daytime, though we recommend using Uber or a taxi in the evening as the final section of the road is not lit."
    },
    {
        category: "The Property",
        question: "Is Mont Bleu a hotel or a guesthouse?",
        answer: "Mont Bleu operates as a boutique guest home rather than a formal hotel. Guests enjoy shared living spaces, relaxed continental breakfast, and a home-like atmosphere within the mountain sanctuary of Le Sanctuaire."
    },
    {
        category: "The Property",
        question: "What makes Mont Bleu unique?",
        answer: "Mont Bleu forms part of Le Sanctuaire, a mountain retreat designed to provide guests with a peaceful space to relax, explore nature, and experience the beauty of the Franschhoek valley."
    },
    {
        category: "The Property",
        question: "What views can guests expect?",
        answer: "Mont Bleu sits high above the Franschhoek valley with panoramic mountain and vineyard views, particularly from the pool area, sunset deck, and viewing terrace."
    },
    {
        category: "The Property",
        question: "Are there walking trails on the property?",
        answer: "Yes. Guests can enjoy guided walks and nature trails across the property, including fynbos walks, scenic viewpoints, and mountain paths."
    },
    {
        category: "Rooms & Facilities",
        question: "What facilities are available at Mont Bleu?",
        answer: "Guests can enjoy comfortable rooms, outdoor relaxation areas, beautiful views of the surrounding mountains and valley, and access to shared spaces designed for relaxation."
    },
    {
        category: "Rooms & Facilities",
        question: "Do you have a swimming pool?",
        answer: "Yes, Mont Bleu has a pool area for guests to relax and enjoy during their stay."
    },
    {
        category: "Rooms & Facilities",
        question: "Is there WiFi available?",
        answer: "Yes, complimentary WiFi is available throughout the guesthouse. Although it should be noted that because we are higher up the mountain the service is sometimes unstable."
    },
    {
        category: "Rooms & Facilities",
        question: "Is breakfast included?",
        answer: "Breakfast options may be available depending on the room type and booking package. All breakfasts are continental and unfortunately our kitchen facilities do not allow for dietary preferences."
    },
    {
        category: "Rooms & Facilities",
        question: "Is there air-conditioning in the rooms?",
        answer: "Yes each room offers individually controlled cooling/heating inverter airconditioners. Protea room even has its own fireplace."
    },
    {
        category: "Activities",
        question: "What can guests do in Franschhoek?",
        answer: "Franschhoek offers world-class wineries, award-winning restaurants, mountain hikes, cycling routes, and the famous Franschhoek Wine Tram."
    },
    {
        category: "Activities",
        question: "Are there activities on the property?",
        answer: "Guests may participate in guided nature walks, swimming in our sparkling pool or natural river pools, a refreshing sauna or gas-fired hot tub experience, training in outdoor gym and fitness facility, and exploring the gardens and mountain environment."
    },
    {
        category: "Practical Questions",
        question: "Is parking available?",
        answer: "Yes, parking is available for guests staying at the property."
    },
    {
        category: "Practical Questions",
        question: "Is the property child-friendly?",
        answer: "Our guesthouse is primarily for guests aged 12 years and older. Infants under 2 years may be accommodated in the Fynbos and Oak Rooms by prior arrangement. The Mountain, Olive, and Protea Rooms are strictly for guests 12 years and older. Please note that the swimming pool and some trails are unfenced."
    },
    {
        category: "Practical Questions",
        question: "Are pets allowed?",
        answer: "Pets are not permitted."
    },
    {
        category: "Practical Questions",
        question: "Is Mont Bleu suitable for remote work?",
        answer: "Yes. The property offers Wi-Fi throughout the guesthouse and several peaceful spaces such as the library, viewing deck, and lounge where guests can work or read."
    },
    {
        category: "Practical Questions",
        question: "Is drinking water safe?",
        answer: "Our water comes straight from the mountain stream that runs through the property and is further filtered and treated and safe for consumption. We also provide bottled water for purchase."
    },
    {
        category: "Practical Questions",
        question: "Is there a Bar on the Property?",
        answer: "We are not licensed but offer an honesty bar system and you are welcome to bring your own alcohol. We host a Saturday evening Sunset bar experience at our outdoor Uitkyk bar where you can enjoy drinks while the sun sets from Franschhoek’s highest deck."
    }
];

const FAQItemComponent: React.FC<{ item: FAQItem; isOpen: boolean; toggle: () => void }> = ({ item, isOpen, toggle }) => {
    return (
        <div className="border-b border-sanctuary-blue/10 last:border-0">
            <button
                onClick={toggle}
                className="w-full py-6 flex justify-between items-center text-left group transition-all"
            >
                <span className={`text-lg transition-colors duration-300 ${isOpen ? 'text-sanctuary-gold' : 'text-sanctuary-blue group-hover:text-sanctuary-gold'}`}>
                    {item.question}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-sanctuary-gold shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-sanctuary-blue/30 group-hover:text-sanctuary-gold shrink-0 transition-all" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pr-12 text-sanctuary-blue/70 font-light leading-relaxed">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFaqs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = Array.from(new Set(faqData.map(item => item.category)));

    return (
        <div className="pt-20 min-h-screen bg-sanctuary-sand">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <SectionObserver>
                        <div className="text-center mb-16">
                            <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6 block">Common Queries</span>
                            <h1 className="text-5xl md:text-7xl font-serif text-sanctuary-blue mb-8">Frequently Asked Questions</h1>
                            <div className="w-24 h-px bg-sanctuary-gold mx-auto mb-12"></div>

                            <div className="relative max-w-xl mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sanctuary-blue/30" />
                                <input
                                    type="text"
                                    placeholder="Ask a question..."
                                    className="w-full bg-white border border-sanctuary-blue/10 rounded-full py-4 pl-12 pr-6 text-sanctuary-blue focus:outline-none focus:border-sanctuary-gold/50 shadow-sm transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </SectionObserver>

                    {searchTerm === '' ? (
                        <div className="space-y-16">
                            {categories.map((category) => (
                                <div key={category}>
                                    <h2 className="text-xs uppercase tracking-[0.3em] text-sanctuary-gold font-medium mb-8 border-b border-sanctuary-gold/20 pb-4">
                                        {category}
                                    </h2>
                                    <div className="bg-white px-8 rounded-sm shadow-sm border border-sanctuary-blue/5">
                                        {faqData
                                            .filter(item => item.category === category)
                                            .map((item) => {
                                                const globalIndex = faqData.indexOf(item);
                                                return (
                                                    <FAQItemComponent
                                                        key={globalIndex}
                                                        item={item}
                                                        isOpen={openIndex === globalIndex}
                                                        toggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white px-8 rounded-sm shadow-sm border border-sanctuary-blue/5">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((item) => {
                                    const globalIdx = faqData.indexOf(item);
                                    return (
                                        <FAQItemComponent
                                            key={globalIdx}
                                            item={item}
                                            isOpen={openIndex === globalIdx}
                                            toggle={() => setOpenIndex(openIndex === globalIdx ? null : globalIdx)}
                                        />
                                    );
                                })
                            ) : (
                                <div className="py-20 text-center text-sanctuary-blue/40 font-serif italic">
                                    No matches found for your search.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default FAQ;
