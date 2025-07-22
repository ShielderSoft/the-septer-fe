import React from 'react';

// This function takes a string and returns an array of strings and JSX elements
export const formatAIResponse = (text) => {
    // Define patterns for different entities we want to highlight
    const patterns = {
        bold: /\*\*(.*?)\*\*/g,
        ip: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\b/g,
        path: /([a-z]:\\|\\|\/)?([\w\-\.]+\/)+[\w\-\.]+/g,
        domain: /\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/gi,
    };

    const styleMap = {
        bold: 'font-bold text-light-text-primary dark:text-dark-text-primary',
        ip: 'font-mono bg-blue-100 dark:bg-dark-primary/20 text-blue-700 dark:text-dark-primary py-0.5 px-1.5 rounded-md',
        path: 'font-mono bg-gray-200 dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary py-0.5 px-1.5 rounded-md',
        domain: 'font-mono bg-green-100 dark:bg-light-accent/20 text-green-700 dark:text-light-accent py-0.5 px-1.5 rounded-md',
    };

    // Combine all patterns into one for efficient matching
    const combinedRegex = new RegExp(
        `(${Object.values(patterns).map(p => p.source).join(')|(')})`, 'g'
    );

    const parts = text.split(combinedRegex);

    return parts.map((part, index) => {
        if (!part) return null;

        for (const key in patterns) {
            // Important: Use a regex that strictly matches the full part
            const strictMatch = new RegExp(`^${patterns[key].source}$`);
            if (part.match(strictMatch)) {
                // For bold text, we remove the asterisks
                const content = key === 'bold' ? part.replace(/\*\*/g, '') : part;
                return <span key={index} className={styleMap[key]}>{content}</span>;
            }
        }
        return part;
    });
};
