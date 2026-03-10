import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

interface RoomShowcaseProps {
    name: string;
    description: string;
    images: string[];
    features: string[];
    index: number;
    onOpenDetails: () => void;
    bookingLink?: string;
    secondaryBookingLink?: string;
    innStyleDomain?: string;
    bookableId?: number;
}

const ParallaxImage = ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={ref}
            className="h-[50vh] md:h-[85vh] relative overflow-hidden cursor-pointer group rounded-sm"
            onClick={onClick}
        >
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
            </motion.div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white uppercase tracking-widest text-sm bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    View Details
                </span>
            </div>
        </div>
    );
};

const RoomShowcase: React.FC<RoomShowcaseProps> = ({ name, description, images, features, index, onOpenDetails, bookingLink, secondaryBookingLink, innStyleDomain, bookableId }) => {
    const calendarContainerId = `innstyle-calendar-container-${index}`;

    useEffect(() => {
        if (!innStyleDomain) return;

        const loadInnStyle = () => {
            if ((window as any).InnStyle) {
                const container = document.getElementById(calendarContainerId);
                if (container) container.innerHTML = '';

                // Initialize with specific bookable ID if provided
                const options: any = { target: calendarContainerId };
                if (bookableId) {
                    options.bookable = bookableId;
                }

                (window as any).InnStyle(innStyleDomain, options);
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
    }, [innStyleDomain, index, calendarContainerId, bookableId]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen border-t border-sanctuary-blue/10">
            {/* Sticky Content - Details */}
            <div className="md:w-1/2 p-6 md:p-16 lg:p-24 flex flex-col justify-center bg-sanctuary-sand md:sticky md:top-0 md:h-screen z-10">
                <span className="text-xs font-serif uppercase tracking-widest text-sanctuary-gold mb-6">Suite 0{index + 1}</span>
                <h2 className="text-5xl md:text-7xl font-serif text-sanctuary-blue mb-8">{name}</h2>
                <p className="text-lg text-sanctuary-blue/70 font-light leading-relaxed mb-12 max-w-md">
                    {description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-4 mb-12 font-sans text-xs uppercase tracking-widest text-sanctuary-blue/50">
                    {features.map((feature, i) => (
                        <span key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sanctuary-gold" />
                            {feature}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    <Button variant="outline" onClick={onOpenDetails}>View Details</Button>
                    {bookingLink && (
                        <Button variant="white" className="px-10 py-4 text-base" href={bookingLink} target="_blank" rel="noopener noreferrer">Book Now</Button>
                    )}
                    {secondaryBookingLink && (
                        <Button variant="primary" className="px-10 py-4 text-base" href={secondaryBookingLink} target="_blank" rel="noopener noreferrer">Book Direct</Button>
                    )}
                    {!bookingLink && !secondaryBookingLink && !innStyleDomain && (
                        <Button variant="white" className="px-10 py-4 text-base" to="/contact">Book Now</Button>
                    )}
                </div>

                {/* InnStyle Booking Engine Embed */}
                {innStyleDomain && (
                    <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded-sm border border-sanctuary-blue/10 shadow-sm min-h-[400px]">
                        <div id={calendarContainerId}></div>
                    </div>
                )}
            </div>

            {/* Scrollable Content - Images */}
            <div className="md:w-1/2 bg-white flex flex-col gap-4 p-4 md:p-0">
                {images.map((img, i) => (
                    <ParallaxImage
                        key={i}
                        src={img}
                        alt={`${name} view ${i + 1}`}
                        onClick={onOpenDetails}
                    />
                ))}
            </div>
        </div>
    );
};

export default RoomShowcase;
