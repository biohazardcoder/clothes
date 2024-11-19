import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ onClick, children, to, link, className }) => {
    return (
        <Link to={to} >
            <button onClick={onClick} className={`bg-accent  text-white border border-highlight  hover:bg-highlight duration-300 transition-all ${className}`}>
                {children}
            </button>
        </Link>
    );
};

export default Button;
