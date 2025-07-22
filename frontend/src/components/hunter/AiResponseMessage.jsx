import React, { useState, useMemo } from 'react';
import { Lightbulb, Cog, FileText, Wrench, ChevronDown, Check } from 'lucide-react';
import { formatAIResponse } from '../../utils/formatter';

const AccordionItem = ({ icon, title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-light-surface/50 dark:bg-dark-surface/40 border border-gray-200 dark:border-dark-text-secondary/20 rounded-xl overflow-hidden backdrop-blur-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="text-light-primary dark:text-dark-primary">{icon}</div>
                    <h3 className="font-bold text-lg text-light-text-primary dark:text-dark-text-primary">{title}</h3>
                </div>
                <ChevronDown size={20} className={`text-light-text-secondary dark:text-dark-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-4 pb-4 animate-fade-in">
                    <div className="border-t border-gray-200 dark:border-white/10 pt-4">{children}</div>
                </div>
            )}
        </div>
    );
}

const CodeBlock = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-light-bg dark:bg-dark-bg rounded-lg p-4 font-mono text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <button onClick={handleCopy} className="absolute top-3 right-3 p-1.5 bg-white/80 dark:bg-dark-surface rounded-md text-gray-500 dark:text-dark-text-secondary hover:text-black dark:hover:text-white transition-colors">
                {copied ? <Check size={16} /> : "Copy"}
            </button>
            <pre className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">{text}</pre>
        </div>
    );
};

const AiResponseMessage = ({ response }) => {
    // Memoize the formatted content to avoid re-parsing on every render
    const formattedInsights = useMemo(() => formatAIResponse(response.insights), [response.insights]);
    const formattedReasoning = useMemo(() => formatAIResponse(response.reasoning), [response.reasoning]);
    const formattedFixes = useMemo(() => formatAIResponse(response.fixes), [response.fixes]);

    return (
        <div className="max-w-4xl w-full space-y-4 animate-fade-in-up">
            <AccordionItem icon={<Lightbulb size={24} />} title="Insights">
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed whitespace-pre-wrap">{formattedInsights}</p>
            </AccordionItem>
            <AccordionItem icon={<Cog size={24} />} title="Reasoning">
                 <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed whitespace-pre-wrap">{formattedReasoning}</p>
            </AccordionItem>
            <AccordionItem icon={<FileText size={24} />} title="Supporting Logs">
                <CodeBlock text={response.supporting_logs} />
            </AccordionItem>
             <AccordionItem icon={<Wrench size={24} />} title="Recommended Fixes">
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed whitespace-pre-wrap">{formattedFixes}</p>
            </AccordionItem>
        </div>
    );
};

export default AiResponseMessage;