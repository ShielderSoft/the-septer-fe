import React, { useMemo } from 'react';
import { Terminal, Shield, Cpu, Search, Bot } from 'lucide-react';
import AnimatedGradientText from '../ui/AnimatedGradientText';

const FuturisticLoader = ({ stage }) => {
  const stages = useMemo(() => [
    { text: "ANALYZING LOG STRUCTURE", icon: <Terminal size={32} /> },
    { text: "DECRYPTING & NORMALIZING DATA", icon: <Shield size={32} /> },
    { text: "ENGAGING SEPTER AI CORE", icon: <Cpu size={32} /> },
    { text: "CROSS-REFERENCING THREAT INTEL", icon: <Search size={32} /> },
    { text: "SYNTHESIZING VULNERABILITY REPORT", icon: <Bot size={32} /> },
  ], []);

  const currentStage = stages[stage] || stages[0];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-light-surface/50 dark:bg-dark-surface/40 border border-gray-200 dark:border-dark-text-secondary/20 rounded-2xl backdrop-blur-sm shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-cyan-400 dark:to-dark-accent">
            {currentStage.text}
        </h2>
      </div>
      <div className="relative h-48 flex items-center justify-center">
        {/* Central Core */}
        <div className="absolute w-24 h-24 bg-light-primary/10 dark:bg-dark-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute w-48 h-48 border-2 border-light-primary/20 dark:border-dark-primary/30 rounded-full animate-spin-slow"></div>
        <div className="absolute w-64 h-64 border-2 border-light-primary/10 dark:border-dark-accent/20 rounded-full animate-spin-slower"></div>
        
        {/* Icon */}
        <div className="relative text-light-primary dark:text-dark-primary animate-pulse-deep">
          {currentStage.icon}
        </div>
      </div>
      <div className="mt-8">
        <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2.5">
          <div className="bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent h-2.5 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${((stage + 1) / stages.length) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticLoader;