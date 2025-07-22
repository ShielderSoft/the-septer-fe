import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, Zap, Bot } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

// New SVG Logo Component
const SepterLogo = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" className="stroke-light-primary dark:stroke-dark-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 18C30 20.2091 27.3137 22 24 22C20.6863 22 18 20.2091 18 18" className="stroke-light-text-secondary dark:stroke-dark-text-secondary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 30C18 27.7909 20.6863 26 24 26C27.3137 26 30 27.7909 30 30" className="stroke-light-text-secondary dark:stroke-dark-text-secondary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-light-surface/50 dark:bg-dark-surface/30 p-8 rounded-2xl border border-gray-200 dark:border-dark-text-secondary/20 backdrop-blur-lg transition-all duration-300 hover:border-light-primary/50 dark:hover:border-dark-primary/50 hover:scale-105 hover:shadow-xl">
        <div className="flex items-center gap-4 mb-4">
            <div className="text-light-primary dark:text-dark-primary">{icon}</div>
            <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{title}</h3>
        </div>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">{children}</p>
    </div>
);

const AnimatedTerminal = () => {
    // This component's internal logic remains the same
    const [lines, setLines] = useState([]);
    const codeLines = [
        'user@septer:~$ upload access.log',
        'Uploading [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%',
        'File "access.log" processed successfully.',
        'user@septer:~$ analyze --vulnerability sql_injection',
        'Engaging Gemini AI Core...',
        'Cross-referencing CVE database...',
        'Synthesizing report...',
        'CRITICAL: SQL Injection vulnerability found in /login endpoint.',
        'Line 42: "SELECT * FROM users WHERE id=\'1\' OR \'1\'=\'1\'"',
        'Recommendation: Use parameterized queries.',
        'user@septer:~$ _'
    ];

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < codeLines.length) {
                setLines(prev => [...prev, codeLines[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto bg-light-surface/80 dark:bg-dark-surface/50 rounded-xl border border-gray-300 dark:border-dark-text-secondary/20 shadow-2xl backdrop-blur-md">
            <div className="h-10 bg-gray-200 dark:bg-dark-bg/50 flex items-center px-4 rounded-t-xl">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-6 font-mono text-sm h-72 overflow-hidden">
                {lines.map((line, index) => (
                    <p key={index} className={`whitespace-nowrap ${line?.includes('CRITICAL') ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};


const LandingPage = () => {
    const { navigateToLogin } = useAuth();

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg font-sans">
            {/* The fixed container for the background blobs */}
            <div className="background-animation-container">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* All content is now relative to this container */}
            <div className="relative z-10">
                <header className="container mx-auto px-6 py-6 flex justify-end items-center">
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={navigateToLogin} className="bg-light-text-primary text-light-bg dark:bg-dark-surface dark:text-dark-text-primary font-bold py-2 px-6 rounded-lg backdrop-blur-sm border border-transparent dark:border-dark-text-secondary/20 hover:bg-opacity-90 dark:hover:bg-opacity-100 transition-all">
                            Login
                        </button>
                    </div>
                </header>

                <main className="container mx-auto px-6 text-center">
                    <section className="py-20 md:py-24">
                        {/* New Branding Section */}
                        <div className="flex justify-center items-center gap-4 mb-8">
                            <SepterLogo />
                            <h1 className="text-7xl font-extrabold text-light-text-primary dark:text-dark-text-primary">
                                Septer
                            </h1>
                        </div>

                         <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-cyan-400 dark:to-dark-accent">
                            Uncover Threats Before They Strike.
                        </h2>
                        <p className="max-w-3xl mx-auto mt-6 text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary">
                            Septer is an AI-powered log analysis platform that transforms raw logs into actionable security intelligence. Upload, ask, and remediate vulnerabilities in minutes, not days.
                        </p>
                        <button onClick={navigateToLogin} className="mt-10 px-10 py-4 bg-light-primary dark:bg-dark-primary text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/20 dark:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-cyan-400/30">
                            Start Hunting
                        </button>
                    </section>
                    
                    <section className="py-16">
                         <h2 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-12">How It Works</h2>
                         <AnimatedTerminal />
                    </section>

                    <section className="py-16">
                        <h2 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-12">The Future of Security Analysis</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard icon={<Bot size={32}/>} title="AI-Powered Analysis">
                                Leverage the power of Gemini to find complex vulnerabilities, anomalies, and misconfigurations that other tools miss.
                            </FeatureCard>
                            <FeatureCard icon={<Zap size={32}/>} title="Rapid Threat Hunting">
                                Go from raw log files to a full vulnerability report with actionable fixes in a fraction of the time.
                            </FeatureCard>
                             <FeatureCard icon={<ShieldCheck size={32}/>} title="Actionable Remediation">
                                Receive clear, context-aware remediation steps and code examples to fix security flaws quickly and effectively.
                            </FeatureCard>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;
