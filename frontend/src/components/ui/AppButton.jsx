import React from 'react';

const AppButton = ({ children, onClick, className = '', type = 'button', isLoading = false, disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isLoading || disabled}
    className={`relative w-full inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-cyan-500 to-teal-400 group-hover:translate-x-0"></span>
    <span className="absolute inset-0 w-full h-full bg-gray-800 group-hover:bg-gray-900/80 transition duration-300"></span>
    <span className="relative flex items-center justify-center">
      {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : children}
    </span>
  </button>
);

export default AppButton;