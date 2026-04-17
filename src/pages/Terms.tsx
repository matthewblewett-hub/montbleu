import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
    return (
        <div className="pt-20 min-h-screen bg-sanctuary-sand">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <SectionObserver>
                        <div className="text-center mb-16">
                            <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6 block">Le Sanctuaire Policy</span>
                            <h1 className="text-5xl md:text-7xl font-serif text-sanctuary-blue mb-8">Booking Terms & Conditions</h1>
                            <div className="w-24 h-px bg-sanctuary-gold mx-auto mb-8"></div>
                            <p className="text-lg font-light text-sanctuary-blue/70 italic">
                                By confirming a reservation at Mont Bleu Guesthouse, you agree to the following terms designed to ensure a peaceful and safe experience for all guests on our Franschhoek farm.
                            </p>
                        </div>
                    </SectionObserver>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 md:p-16 rounded-sm shadow-sm border border-sanctuary-blue/5 text-sanctuary-blue/80 leading-relaxed font-light"
                    >
                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-serif text-sanctuary-blue mb-6 border-b border-sanctuary-gold/20 pb-2">1. Reservations & Payments</h2>
                                <ul className="list-disc pl-5 space-y-4">
                                    <li><strong>Deposit:</strong> A minimum deposit of 50% of the total stay is required to secure your booking. Provisional bookings without a deposit will be released after 48 hours.</li>
                                    <li><strong>Payment Methods:</strong> We accept Visa and MasterCard. Regrettably, we do not accept cheques.</li>
                                    <li><strong>VAT:</strong> All rates are inclusive of 15% VAT.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-sanctuary-blue mb-6 border-b border-sanctuary-gold/20 pb-2">2. Arrival & Departure</h2>
                                <ul className="list-disc pl-5 space-y-4">
                                    <li><strong>Check-in:</strong> From 15:00. Please notify us if you expect to arrive after 19:00 (Summer) or 18:00 (Winter) so we can arrange access.</li>
                                    <li><strong>Check-out:</strong> Strictly by 10:00 AM. This time is strictly enforced to allow for room preparation.</li>
                                    <li><strong>Identification:</strong> A valid South African ID or Passport is required at check-in for all guests.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-sanctuary-blue mb-6 border-b border-sanctuary-gold/20 pb-2">3. House Rules & Quiet Hours</h2>
                                <ul className="list-disc pl-5 space-y-4">
                                    <li><strong>Quiet Hours:</strong> 21:00 to 07:00. We ask all guests to respect the deep sense of peace and tranquility on the farm.</li>
                                    <li><strong>Smoking:</strong> Strictly non-smoking indoors. Smoking is permitted in designated outdoor areas only.</li>
                                    <li><strong>Occupancy:</strong> Maximum 2 guests per room. No persons, other than those quoted at the time of booking, are permitted to share the accommodation. No unregistered visitors are allowed on the property.</li>
                                    <li><strong>Events:</strong> No parties, events, or commercial photography are permitted without prior written consent from management.</li>
                                    <li><strong>Pets:</strong> Regrettably, no pets are allowed on the premises.</li>
                                    <li><strong>Children:</strong> We operate as an "Adults Preferred" guesthouse; no children under the age of 12 are permitted.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-sanctuary-blue mb-6 border-b border-sanctuary-gold/20 pb-2">4. Cancellation Policy</h2>
                                <p className="mb-4">The following percentage of the total booking amount will be forfeited based on the timing of the cancellation:</p>
                                <ul className="list-disc pl-5 space-y-4">
                                    <li><strong>22 - 28 days prior to arrival:</strong> 25% forfeit</li>
                                    <li><strong>15 - 21 days prior to arrival:</strong> 50% forfeit</li>
                                    <li><strong>08 - 14 days prior to arrival:</strong> 75% forfeit</li>
                                    <li><strong>Less than 7 days prior / No Show:</strong> 100% forfeit</li>
                                    <li><strong>Admin Fee:</strong> All processed refunds are subject to a 5% handling and administration fee.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-sanctuary-blue mb-6 border-b border-sanctuary-gold/20 pb-2">5. Liability & Responsibility</h2>
                                <p>
                                    Whilst Le Sanctuaire (Pty) Ltd and its employees will take all reasonable care, they cannot be held responsible for, and shall be exempt from any liability, loss, damage or injury to any person and/or their luggage and personal property while on the premises. Guests are encouraged to ensure they have adequate travel and personal insurance.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif text-sanctuary-blue mb-6 border-b border-sanctuary-gold/20 pb-2">6. Security</h2>
                                <p>
                                    For the safety of our guests and the property, the premises are monitored 24/7 via CCTV cameras.
                                </p>
                            </section>

                            <div className="pt-8 border-t border-sanctuary-gold/20 text-sm italic text-sanctuary-blue/60 text-center">
                                Note: Rates and conditions are subject to change without prior notice. Once a deposit has been received, it is deemed that you have read and agreed to these terms and conditions in full.
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
