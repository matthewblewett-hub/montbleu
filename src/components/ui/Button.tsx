import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'white';
    className?: string;
    target?: string;
    rel?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    to,
    href,
    onClick,
    variant = 'primary',
    className = '',
    target,
    rel
}) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 border font-medium rounded-full";

    const variants = {
        primary: "border-sanctuary-blue bg-sanctuary-blue text-white hover:bg-transparent hover:text-sanctuary-blue",
        secondary: "border-white bg-white text-sanctuary-blue hover:bg-transparent hover:text-white",
        outline: "border-sanctuary-blue text-sanctuary-blue hover:bg-sanctuary-blue hover:text-white",
        white: "border-white bg-white text-black hover:bg-black hover:text-white hover:border-black"
    };

    const content = <span className="relative z-10">{children}</span>;

    if (href) {
        return (
            <a
                href={href}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                target={target}
                rel={rel}
            >
                {content}
            </a>
        );
    }

    if (to) {
        return (
            <Link
                to={to}
                className={`${baseStyles} ${variants[variant]} ${className}`}
            >
                {content}
            </Link>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {content}
        </motion.button>
    );
};

export default Button;
