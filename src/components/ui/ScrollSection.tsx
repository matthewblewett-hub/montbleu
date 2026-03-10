import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children, className = '' }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className={`relative md:h-[400vh] bg-sanctuary-blue ${className}`}>
            <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
                <motion.div style={!isMobile ? { x } : {}} className="flex flex-col md:flex-row w-full md:w-auto">
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

export default ScrollSection;
