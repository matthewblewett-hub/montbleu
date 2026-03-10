import React, { useEffect } from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion } from 'framer-motion';

const Booking: React.FC = () => {
    const calendarContainerId = 'innstyle-booking-calendar';
    const innStyleDomain = 'montbleuguesthouse';

    useEffect(() => {
        const loadInnStyle = () => {
            if ((window as any).InnStyle) {
                const container = document.getElementById(calendarContainerId);
                if (container) container.innerHTML = '';
                (window as any).InnStyle(innStyleDomain, { target: calendarContainerId });
            }
        };

        const scriptId = 'InnStyle-js';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://developer.innstyle.co.uk/calendar.min.js';
            script.async = true;
            script.onload = loadInnStyle;
            document.body.appendChild(script);
        } else {
            if ((window as any).InnStyle) {
                loadInnStyle();
            } else {
                script.addEventListener('load', loadInnStyle);
            }
        }
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-sanctuary-sand">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <SectionObserver>
                        <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6 block">Reservations</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-sanctuary-blue mb-8">Book Your Stay</h1>
                        <p className="text-xl font-light text-sanctuary-blue/70 mb-12">
                            Select your dates and choose from our unique suites. We look forward to welcoming you to Mont Bleu.
                        </p>
                    </SectionObserver>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white p-4 md:p-8 rounded-sm shadow-xl border border-sanctuary-blue/5 min-h-[600px]"
                    >
                        <div id={calendarContainerId}>
                            <div className="flex flex-col items-center justify-center py-20 text-sanctuary-blue/40">
                                <div className="w-12 h-12 border-2 border-sanctuary-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="font-serif italic">Loading booking engine...</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Booking;
