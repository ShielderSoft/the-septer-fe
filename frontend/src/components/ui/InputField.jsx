import React from 'react';

const InputField = React.forwardRef(({ icon, ...props }, ref) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-light-text-secondary dark:text-dark-text-secondary">
      {icon}
    </div>
    <input
      ref={ref}
      className="w-full bg-light-bg dark:bg-dark-surface border border-gray-300 dark:border-dark-text-secondary/30 rounded-lg py-3 pl-12 pr-4 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-300"
      {...props}
    />
  </div>
));

export default InputField;