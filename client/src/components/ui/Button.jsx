import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ onClick, children, to, link, className }) => {
    return (
        <button onClick={onClick} className={`bg-accent text-white border border-highlight  hover:bg-highlight duration-300 transition-all ${className}`}>
            <Link to={to} className={link}>
                {children}
            </Link>
        </button>
    );
};

export default Button;
