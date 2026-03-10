import { motion } from 'framer-motion';

const Maintenance = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
            >
                <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full border-sanctuary-blue/20 text-sanctuary-blue/60">
                    Temporary Update
                </span>

                <h1 className="mb-6 text-5xl font-light tracking-tight md:text-6xl text-sanctuary-blue font-serif">
                    Refreshing our <br />
                    <span className="italic">Booking Experience</span>
                </h1>

                <div className="w-16 h-px mx-auto mb-8 bg-sanctuary-blue/20" />

                <p className="mb-10 text-lg leading-relaxed text-sanctuary-blue/70">
                    We are currently performing essential updates to our booking engine to ensure
                    a seamless experience for your next stay at Mont Bleu.
                </p>

                <p className="mb-12 text-sm uppercase tracking-widest text-sanctuary-blue font-semibold">
                    We will be back online shortly.
                </p>

                <div className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-sanctuary-blue/50 italic">
                        For urgent enquiries or manual bookings, please contact us:
                    </p>
                    <a
                        href="mailto:contact@montbleu.co.za"
                        className="text-sanctuary-blue hover:text-sanctuary-blue/70 transition-colors underline underline-offset-8"
                    >
                        contact@montbleu.co.za
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Maintenance;
