import React from 'react';

const AnimatedGradientText = ({ children, className }) => (
  <span className={`inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-500 bg-clip-text text-transparent animate-gradient-x ${className}`}>
    {children}
  </span>
);

export default AnimatedGradientText;