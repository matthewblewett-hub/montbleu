import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Send, Sparkles } from 'lucide-react';

interface FAQData {
    question: string;
    answer: string;
    category: string;
    keywords: string[];
}

const KNOWLEDGE_BASE: FAQData[] = [
    // THE PHILOSOPHY & VIBE
    {
        category: "Vibe",
        question: "Is the place pretty?",
        answer: "It's breathtaking. Mont Bleu is a mountain sanctuary where 'heaven and earth meet'. You'll experience panoramic mountain views, fynbos-clad slopes, and a peaceful atmosphere designed to help you slow down and reconnect with nature.",
        keywords: ["pretty", "beautiful", "nice", "look", "view", "vibe", "style", "scenery"]
    },
    {
        category: "Philosophy",
        question: "What is the concept of Le Sanctuaire?",
        answer: "Mont Bleu is a 'Guest Home', not a formal hotel. It's designed to feel lived-in, warm, and unhurried. It's a place for rest, reflection, and renewal, where guests help themselves and share spaces with care.",
        keywords: ["philosophy", "concept", "what is", "about", "guest home"]
    },

    // ROOM DETAILS
    {
        category: "Rooms",
        question: "Tell me about the Mountain Suite",
        answer: "The Mountain Suite is calm and spacious (45m²), featuring a private balcony with valley views, a King Size bed, and a walk-in rain shower.",
        keywords: ["mountain suite", "mountain room"]
    },
    {
        category: "Rooms",
        question: "Tell me about the Olive Suite",
        answer: "The Olive Suite (40m²) is on the ground floor with a private patio overlooking our olive grove. It features a freestanding bath and natural finishes for deep relaxation.",
        keywords: ["olive suite", "olive room"]
    },
    {
        category: "Rooms",
        question: "Tell me about the Protea Suite",
        answer: "The Protea Suite (50m²) offers panoramic fynbos views, an indoor fireplace, a freestanding bathtub with a view, and a signature outdoor shower.",
        keywords: ["protea suite", "protea room"]
    },
    {
        category: "Rooms",
        question: "Tell me about the Oak Room",
        answer: "The Oak Room is our most elevated space, filled with light from sunrise to sunset. It offers panoramic valley views from its private balcony.",
        keywords: ["oak room", "oak suite"]
    },
    {
        category: "Rooms",
        question: "Tell me about the Fynbos Room",
        answer: "The Fynbos Room (40m²) features a unique glass reading and relaxation space, an outdoor shower beneath the stars, and beautiful valley views.",
        keywords: ["fynbos room", "fynbos suite"]
    },

    // FACILITIES & EXPERIENCES
    {
        category: "Facilities",
        question: "What facilities do you have?",
        answer: "We offer a sparkling swimming pool, natural river pools, a gas-fired mountain hot tub, a private riverfront sauna, and a mezzanine library with mountain views.",
        keywords: ["facilities", "amenities", "what to do", "pool", "hot tub", "sauna"]
    },
    {
        category: "Experiences",
        question: "What is the Pilgrim's Journey?",
        answer: "The Pilgrim's Journey is a curated walking route with 15 stations of reflection across the estate, using scripture, symbolism, and silence. It includes QR codes for guided meditations.",
        keywords: ["pilgrim", "journey", "walk", "stations", "meditation", "spiritual"]
    },
    {
        category: "Facilities",
        question: "Is there a bar?",
        answer: "We offer an honesty bar with a curated wine selection. We also host a Saturday Sunset experience at our 'Uitkyk Bar'—the highest deck in the Franschhoek Valley!",
        keywords: ["bar", "drinks", "wine", "honesty", "uitkyk", "sunset"]
    },

    // PRACTICAL
    {
        category: "Booking",
        question: "How do I book?",
        answer: "You can book directly on our website or via Airbnb. A 50% deposit is required to secure your reservation.",
        keywords: ["book", "reservation", "deposit", "payment", "price", "cost"]
    },
    {
        category: "Timing",
        question: "Check-in and Check-out",
        answer: "Check-in is from 3:00 PM and check-out is by 10:00 AM. This is strictly enforced to ensure the home is ready for all guests.",
        keywords: ["check-in", "check-out", "arrival", "departure", "times"]
    },
    {
        category: "Location",
        question: "How far is the village?",
        answer: "We are just 2km from Franschhoek village centre. It's a lovely walk in the day, but we recommend an Uber at night as the final stretch is not lit.",
        keywords: ["village", "town", "distance", "location", "uber", "walk"]
    },
    {
        category: "Facilities",
        question: "Do you have WiFi?",
        answer: "Yes, we have high-speed fibre WiFi throughout the guest home. Please note that being in the mountains, it can very occasionally be unstable.",
        keywords: ["wifi", "internet", "connectivity", "work", "fiber"]
    }
];

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'bot' | 'user', content: string }[]>([
        { role: 'bot', content: "Welcome to Le Sanctuaire. I can help you with room details, walking trails, or the philosophy of our mountain sanctuary. How can I assist you?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = findBestResponse(userMessage);
            setMessages(prev => [...prev, { role: 'bot', content: response }]);
            setIsTyping(false);
        }, 800);
    };

    const findBestResponse = (text: string) => {
        const query = text.toLowerCase();

        // Search by keywords and semantic relevance
        let bestMatch = null;
        let maxMatches = 0;

        for (const item of KNOWLEDGE_BASE) {
            const matchCount = item.keywords.filter(kw => query.includes(kw)).length;
            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = item;
            }
        }

        if (bestMatch && maxMatches > 0) return bestMatch.answer;

        // Small talk / General
        if (query.includes('hello') || query.includes('hi ')) return "Hello! I'm the Sanctuary Assistant. I know quite a lot about Mont Bleu and the Le Sanctuaire estate. What would you like to know?";
        if (query.includes('pretty') || query.includes('beautiful') || query.includes('view')) {
            return "It is truly a beautiful place. The Franschhoek mountains wrap around the farm, offering panoramic views from every terrace. It’s designed to be a visual and soulful sanctuary.";
        }

        return "I'm still learning some of the finer details of the farm, but I can tell you all about our 5 unique suites, the walking trails, the river sauna, or our philosophy of rest. You can also email us at montbleu.bookings@gmail.com.";
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 40 }}
                        className="mb-4 w-[320px] md:w-[380px] h-[450px] md:h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-sanctuary-blue/5"
                    >
                        {/* Header - Compact */}
                        <div className="bg-sanctuary-blue p-4 pt-5 text-white flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-sanctuary-gold rounded-full flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-sm uppercase tracking-widest">Sanctuary Assistant</h3>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                                <X className="w-4 h-4 text-sanctuary-stone" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-grow p-5 overflow-y-auto bg-sanctuary-sand/10 space-y-4"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${msg.role === 'bot'
                                            ? 'bg-white text-sanctuary-blue shadow-sm rounded-tl-none border border-sanctuary-blue/5'
                                            : 'bg-sanctuary-gold text-white rounded-tr-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-sanctuary-gold rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-sanctuary-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-sanctuary-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-sanctuary-blue/5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Ask a question..."
                                    className="flex-grow bg-sanctuary-sand/20 border-none rounded-full py-2.5 px-4 text-xs md:text-sm focus:outline-none text-sanctuary-blue placeholder-sanctuary-blue/30"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-sanctuary-blue text-white p-2.5 rounded-full hover:bg-sanctuary-gold transition-colors shadow-md"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button Container */}
            <div className="relative flex items-center group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                
                {/* Optional expanding text label for extra noticeability */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: !isOpen ? 1 : 0, x: !isOpen ? 0 : 20 }}
                    className="mr-4 bg-white px-4 py-2 rounded-full shadow-lg border border-sanctuary-blue/5 text-sanctuary-blue text-sm font-serif tracking-widest uppercase hidden md:block"
                >
                    Need Help?
                </motion.div>

                {/* Animated Pulse Ring */}
                {!isOpen && (
                    <span className="absolute right-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-sanctuary-gold/40 animate-ping -z-10" />
                )}

                {/* Main Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 md:w-16 md:h-16 bg-sanctuary-blue rounded-full flex items-center justify-center shadow-xl relative z-10 
                               hover:bg-sanctuary-gold transition-colors duration-500 ease-out"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                                <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div key="chat" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                                <HelpCircle className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default ChatBot;
