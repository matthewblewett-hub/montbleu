import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedConsent, updateConsent } from '../../utils/analytics';

const CookieBanner: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show banner only if no consent decision has been saved in localStorage yet
        const saved = getSavedConsent();
        if (saved === null) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        updateConsent(true);
        setVisible(false);
    };

    const handleDecline = () => {
        updateConsent(false);
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.aside
                    aria-label="Cookie consent banner"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-sanctuary-blue text-white p-6 rounded-2xl shadow-2xl border border-white/10 z-[100] font-sans"
                >
                    <div className="flex flex-col space-y-4">
                        <div>
                            <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-sanctuary-gold block mb-1">
                                Privacy & Cookie Notice
                            </span>
                            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light">
                                We use cookies to enhance your browsing experience and analyze site traffic. Please choose whether you accept analytics and marketing cookies.
                            </p>
                        </div>
                        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-white/10">
                            <button
                                type="button"
                                onClick={handleDecline}
                                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 rounded-full transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                type="button"
                                onClick={handleAccept}
                                className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-sanctuary-blue bg-white hover:bg-sanctuary-sand rounded-full transition-colors shadow-sm"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
