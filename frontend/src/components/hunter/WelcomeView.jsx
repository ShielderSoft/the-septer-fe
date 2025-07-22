import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import ThreatIntelCard from './ThreatIntelCard';
import AppButton from '../ui/AppButton';
import AnimatedGradientText from '../ui/AnimatedGradientText';

const WelcomeView = ({ onFileUpload }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up p-4">
            <div className="text-center mb-12">
                 <h1 className="text-5xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-teal-300">
                    Start Your Hunt
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Upload a log file to begin your security analysis.</p>
            </div>

            <div className="w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-700/50 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm text-center">
                <UploadCloud size={48} className="text-gray-500 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Drag & Drop or Select a File</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Supported formats: .log, .txt, .json, .sarif</p>
                <AppButton onClick={() => fileInputRef.current?.click()} className="!w-auto mx-auto">
                    Select File
                </AppButton>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".log,.txt,.json,.sarif" />
            </div>

            <div className="mt-16 w-full">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Latest Threat Intel</h3>
                 <div className="grid md:grid-cols-3 gap-6">
                    <ThreatIntelCard title="Log4Shell Persistence" category="Technique" severity="Critical" />
                    <ThreatIntelCard title="New PHP Deserialization Gadget" category="Vulnerability" severity="High" />
                    <ThreatIntelCard title="Follina (MSDT) Activity" category="Malware" severity="High" />
                 </div>
            </div>
        </div>
    );
};

export default WelcomeView;