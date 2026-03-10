import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseFollower: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-sanctuary-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-sanctuary-blue rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.5 : 0.2,
                    borderColor: isHovering ? 'var(--color-sanctuary-gold)' : 'var(--color-sanctuary-blue)'
                }}
            />
        </>
    );
};

export default MouseFollower;
