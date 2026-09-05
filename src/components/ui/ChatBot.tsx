import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Send, Sparkles } from 'lucide-react';

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

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        const newMessages: { role: 'bot' | 'user', content: string }[] = [
            ...messages,
            { role: 'user', content: userMessage }
        ];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: newMessages })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
        } catch (error: any) {
            console.error('Error fetching chat response:', error);
            setMessages(prev => [...prev, { role: 'bot', content: `DEBUG ERROR: ${error.message || 'Unknown error'}` }]);
        } finally {
            setIsTyping(false);
        }
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
                                    <h3 className="font-serif text-sm uppercase tracking-widest">Mont Bleu Assistant</h3>
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
