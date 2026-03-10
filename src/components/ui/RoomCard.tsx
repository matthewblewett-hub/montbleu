import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface RoomCardProps {
    name: string;
    description: string;
    image: string;
    features?: string[];
    delay?: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, description, image, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay }}
            className="group bg-white"
        >
            <div className="overflow-hidden aspect-[16/9] mb-6">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="px-4 pb-8">
                <h3 className="text-3xl font-serif text-sanctuary-blue mb-4">{name}</h3>
                <p className="text-sanctuary-blue/70 mb-6 font-light leading-relaxed">
                    {description}
                </p>
                <Button variant="outline" className="w-full md:w-auto">View Details</Button>
            </div>
        </motion.div>
    );
};

export default RoomCard;
