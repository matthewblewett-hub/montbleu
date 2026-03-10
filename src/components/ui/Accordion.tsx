import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-sanctuary-blue/10">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center py-6 text-left hover:text-sanctuary-gold transition-colors group"
            >
                <span className="text-xl md:text-2xl font-serif text-sanctuary-blue group-hover:text-sanctuary-gold transition-colors">{title}</span>
                <span className="text-sanctuary-blue/40 group-hover:text-sanctuary-gold transition-colors">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-sanctuary-blue/60 font-light leading-relaxed max-w-2xl">
                            {content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface AccordionProps {
    items: { title: string; content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <div className="w-full">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={activeIndex === index}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
