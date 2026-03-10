import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-sanctuary-blue text-white py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-2xl font-serif mb-6">Mont Bleu</h3>
                    <p className="text-sanctuary-stone text-sm leading-relaxed max-w-xs">
                        A mountain sanctuary above Franschhoek - a place where heaven and earth meet.
                        Space for rest, reflection, and renewal.
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-serif mb-2 text-sanctuary-gold">Navigation</h4>
                    <Link to="/stay" className="text-sm hover:text-sanctuary-gold transition-colors">Stay</Link>
                    <Link to="/explore" className="text-sm hover:text-sanctuary-gold transition-colors">Explore</Link>
                    <Link to="/connect" className="text-sm hover:text-sanctuary-gold transition-colors">Connect</Link>
                    <Link to="/book" className="text-sm hover:text-sanctuary-gold transition-colors text-sanctuary-gold font-medium">Book Now</Link>
                </div>

                <div>
                    <h4 className="text-lg font-serif mb-4 text-sanctuary-gold">Contact</h4>
                    <p className="text-sm text-sanctuary-stone mb-2">Franschhoek, South Africa</p>
                    <p className="text-sm text-sanctuary-stone hover:text-white cursor-pointer transition-colors">
                        booking@lesanctuaire.co.za
                    </p>
                </div>
            </div>
            <div className="mt-20 text-center text-xs text-sanctuary-stone opacity-50 border-t border-white/10 pt-8">
                © {new Date().getFullYear()} Mont Bleu. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
