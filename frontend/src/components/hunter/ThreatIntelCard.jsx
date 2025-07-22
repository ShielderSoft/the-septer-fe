import React from 'react';

const ThreatIntelCard = ({ title, category, severity }) => {
    const severityClasses = {
        'Critical': 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400',
        'High': 'border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400',
        'Medium': 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
        'Low': 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400',
    };
    
    return (
        <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-light-primary dark:hover:border-dark-primary ${severityClasses[severity]}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{category}</span>
                <span className="text-xs font-bold">{severity}</span>
            </div>
            <h4 className="font-bold text-light-text-primary dark:text-dark-text-primary">{title}</h4>
        </div>
    );
};

export default ThreatIntelCard;