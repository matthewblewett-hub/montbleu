import React from 'react';
import SectionObserver from '../components/ui/SectionObserver';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                    {/* Contact Info */}
                    <SectionObserver>
                        <span className="text-sm tracking-[0.2em] uppercase text-sanctuary-gold mb-4 block">Get in Touch</span>
                        <h1 className="text-5xl font-serif text-sanctuary-blue mb-8">Contact & Book</h1>
                        <p className="text-lg text-sanctuary-blue/80 font-light leading-relaxed mb-12">
                            We invite you to pause, breathe deeply, and reconnect. Whether for a weekend stay or a longer retreat, we look forward to welcoming you.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-serif text-sanctuary-blue mb-2">Location</h3>
                                <p className="text-sanctuary-blue/60 font-light">Franschhoek, South Africa</p>
                                <div className="mt-4 w-full h-[300px] rounded-lg overflow-hidden border border-sanctuary-blue/10">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5429.306467625413!2d19.129652093983665!3d-33.8917123511836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdbd480f86eb7d%3A0xe7c6cc641d640b04!2sMont%20Bleu%20Guest%20House!5e1!3m2!1sen!2sza!4v1771257222207!5m2!1sen!2sza"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Mont Bleu Location"
                                    ></iframe>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-serif text-sanctuary-blue mb-2">Email</h3>
                                <a href="mailto:booking@lesanctuaire.co.za" className="text-sanctuary-blue/60 font-light hover:text-sanctuary-blue transition-colors">booking@lesanctuaire.co.za</a>
                            </div>
                            <div className="pt-8">
                                <Button href="https://www.airbnb.co.za/users/profile/about?context=host" target="_blank" rel="noopener noreferrer">Book via Airbnb</Button>
                            </div>
                        </div>
                    </SectionObserver>

                    {/* FAQ / Additional Info */}
                    <SectionObserver delay={0.2} className="bg-white p-8 md:p-12 border border-sanctuary-stone/30">
                        <h2 className="text-2xl font-serif text-sanctuary-blue mb-8">Good to Know</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-serif text-sanctuary-blue mb-2">Check-in / Check-out</h4>
                                <p className="text-sm text-sanctuary-blue/60 font-light">Check-in from 14:00. Check-out by 10:00.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-serif text-sanctuary-blue mb-2">Self-Service</h4>
                                <p className="text-sm text-sanctuary-blue/60 font-light">Mont Bleu is a self-catering guest home. We provide essentials, but guests are encouraged to bring their own provisions.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-serif text-sanctuary-blue mb-2">Quiet Hours</h4>
                                <p className="text-sm text-sanctuary-blue/60 font-light">To maintain the sanctuary atmosphere for all guests and wildlife, we ask for quiet after 22:00.</p>
                            </div>
                        </div>
                    </SectionObserver>
                </div>
            </div>
        </div>
    );
};

export default Contact;
