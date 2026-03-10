import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const SectionObserver: React.FC<SectionProps> = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default SectionObserver;
