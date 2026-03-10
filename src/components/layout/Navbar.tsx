import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Stay', path: '/stay' },
        { name: 'Explore', path: '/explore' },
        { name: 'Connect', path: '/connect' },
        { name: 'Experiences', path: '/experiences' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
        { name: 'Book', path: '/book' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled && !isOpen ? 'py-4 bg-sanctuary-sand/80 backdrop-blur-md' : 'py-8'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between md:grid md:grid-cols-3 items-center">
                    {/* Left - Empty for balance or Language/Book */}
                    <div className="hidden md:block">
                        <Button
                            to="/book"
                            variant="white"
                            className="px-8 py-3 text-sm"
                        >
                            Book Now
                        </Button>
                    </div>

                    {/* Center - Logo */}
                    <div className="md:flex md:justify-center">
                        <Link to="/" className="relative z-50 group">
                            <span className={`font-serif text-lg md:text-3xl tracking-[0.2em] uppercase transition-colors duration-500 whitespace-nowrap ${(location.pathname === '/' && !scrolled && !isOpen) ? 'text-white' : 'text-sanctuary-blue'
                                }`}>
                                Mont Bleu
                            </span>
                        </Link>
                    </div>

                    {/* Right - Menu Toggle */}
                    <div className="flex justify-end">
                        <Button
                            onClick={toggleMenu}
                            variant="white"
                            className="px-8 py-3 text-sm z-50 relative"
                        >
                            {isOpen ? 'Close' : 'Menu'}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Valid Full Screen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-sanctuary-sand z-40 flex items-center justify-center"
                    >
                        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="hidden md:flex flex-col justify-end pb-20">
                                <p className="text-sanctuary-blue/60 max-w-sm mb-8 leading-relaxed font-light">
                                    A mountain sanctuary above Franschhoek - a place where heaven and earth meet.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-sm text-sanctuary-blue">Franschhoek, South Africa</p>
                                    <a href="mailto:booking@lesanctuaire.co.za" className="text-sm text-sanctuary-blue hover:text-sanctuary-gold transition-colors">booking@lesanctuaire.co.za</a>
                                </div>
                            </div>

                            <nav className="flex flex-col space-y-6 md:space-y-2 justify-center">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-4xl md:text-6xl font-serif text-sanctuary-blue hover:text-sanctuary-gold transition-colors hover:pl-4 duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
