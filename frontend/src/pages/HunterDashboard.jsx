import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../api/apiClient';
import { Plus, Key, LogOut } from 'lucide-react';
import ChatHistoryPanel from '../components/hunter/ChatHistoryPanel';
import AiResponseMessage from '../components/hunter/AiResponseMessage';
import WelcomeView from '../components/hunter/WelcomeView';
import FuturisticLoader from '../components/common/FuturisticLoader';
import ApiKeyModal from '../components/common/ApiKeyModal';
import AppButton from '../components/ui/AppButton';
import ThemeToggle from '../components/ui/ThemeToggle';

const HunterDashboard = () => {
    const { user, token, logout } = useAuth();
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStage, setAnalysisStage] = useState(0);
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        setChats([]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChat?.messages]);

    const createNewChat = useCallback((file) => {
        const newChat = {
            id: `chat-${Date.now()}`,
            title: file.name,
            messages: [{ type: 'system', content: `Uploading and processing "${file.name}"...` }],
            logId: null,
            file,
        };
        setActiveChat(newChat);
    }, []);

    useEffect(() => {
        if (activeChat && activeChat.file && !activeChat.logId) {
            const uploadFile = async () => {
                const formData = new FormData();
                formData.append('file', activeChat.file);
                const logType = activeChat.file.name.split('.').pop() || 'txt';
                formData.append('log_type', ['txt', 'log', 'json', 'sarif'].includes(logType) ? logType : 'txt');
                
                try {
                    const data = await api.uploadLog(formData, token);
                    setActiveChat(prev => ({
                        ...prev,
                        logId: data.log_id,
                        messages: [{ type: 'system', content: `Log "${prev.title}" is ready. What threats are you hunting for?` }]
                    }));
                } catch(err) {
                    setActiveChat(prev => ({
                        ...prev,
                        messages: [{ type: 'error', content: `Upload failed: ${err.message}` }]
                    }));
                }
            };
            uploadFile();
        }
    }, [activeChat, token]);

    const handleAskQuestion = async () => {
        if (!question.trim() || !activeChat?.logId || isAnalyzing) return;
        
        if (!user.gemini_api_key) {
            setIsApiKeyModalOpen(true);
            return;
        }

        const newMessages = [...activeChat.messages, { type: 'user', content: question }];
        setActiveChat(prev => ({ ...prev, messages: newMessages }));
        setQuestion('');
        setIsAnalyzing(true);
        setAnalysisStage(0);

        const stageTimer = setInterval(() => {
            setAnalysisStage(prev => (prev < 4 ? prev + 1 : 4));
        }, 1200);

        try {
            const data = await api.askQuestion({ log_id: activeChat.logId, question }, token);
            setActiveChat(prev => ({
                ...prev,
                messages: [...newMessages, { type: 'ai', ...data }]
            }));
        } catch (err) {
            setActiveChat(prev => ({
                ...prev,
                messages: [...newMessages, { type: 'error', content: `Analysis failed: ${err.message}` }]
            }));
        } finally {
            clearInterval(stageTimer);
            setIsAnalyzing(false);
            setChats(prevChats => {
                const existing = prevChats.find(c => c.id === activeChat.id);
                if (existing) {
                    return prevChats.map(c => c.id === activeChat.id ? activeChat : c);
                }
                return [activeChat, ...prevChats];
            });
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-100 dark:bg-transparent dark:animated-gradient-background font-sans">
            <div className="dark:background-blob-three"></div>

            <aside className="absolute top-0 left-0 h-full w-80 bg-white/80 dark:bg-black/30 backdrop-blur-md border-r border-gray-200 dark:border-white/10 flex flex-col z-10">
                <div className="p-4 border-b border-gray-200 dark:border-white/10 shrink-0">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Septer</h1>
                </div>
                <ChatHistoryPanel chats={chats} onSelectChat={setActiveChat} />
                <div className="mt-auto p-4 border-t border-gray-200 dark:border-white/10 shrink-0">
                    <button onClick={() => setActiveChat(null)} className="w-full flex items-center justify-center gap-2 bg-cyan-600/10 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 font-semibold py-3 rounded-lg border border-cyan-600/20 dark:border-cyan-500/30 hover:bg-cyan-600/20 dark:hover:bg-cyan-500/30 transition-colors">
                        <Plus size={20} /> New Analysis
                    </button>
                </div>
            </aside>

            <div className="ml-80 h-full flex flex-col">
                <header className="flex justify-end items-center p-4 w-full z-20 shrink-0">
                    <div className="flex items-center gap-4 bg-white/80 dark:bg-black/20 p-2 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-sm">
                        <ThemeToggle />
                        <span className="text-gray-600 dark:text-gray-400 pl-2">{user.email}</span>
                        <button onClick={() => setIsApiKeyModalOpen(true)} className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition" title="Add API Key"><Key size={20}/></button>
                        <button onClick={logout} className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition" title="Logout"><LogOut size={20}/></button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center min-h-0">
                    {!activeChat ? (
                        <WelcomeView onFileUpload={createNewChat} />
                    ) : isAnalyzing ? (
                        <FuturisticLoader stage={analysisStage} />
                    ) : (
                        <div className="w-full h-full max-w-4xl mx-auto flex flex-col">
                            <div className="flex-1 p-4 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                                {activeChat.messages.map((item, index) => {
                                    if (item.type === 'system') return <div key={index} className="text-center w-full text-teal-600 dark:text-teal-400 text-sm font-semibold">{item.content}</div>;
                                    if (item.type === 'error') return <div key={index} className="text-center w-full text-red-500 dark:text-red-400 text-sm font-semibold">{item.content}</div>;
                                    if (item.type === 'user') return <div key={index} className="ml-auto bg-cyan-600 text-white dark:bg-cyan-600/80 rounded-lg p-3 max-w-lg">{item.content}</div>;
                                    if (item.type === 'ai') return <AiResponseMessage key={index} response={item} />;
                                    return null;
                                })}
                                <div ref={chatEndRef}></div>
                            </div>
                            
                            {activeChat.logId && (
                            <div className="w-full p-4 shrink-0">
                                <div className="flex items-center gap-4 bg-white/80 dark:bg-black/30 p-2 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-sm">
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={e => setQuestion(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && handleAskQuestion()}
                                        placeholder="Ask about vulnerabilities, e.g., 'check for SQL injection'..."
                                        className="flex-grow bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none p-2"
                                        disabled={isAnalyzing}
                                    />
                                    <AppButton onClick={handleAskQuestion} disabled={!question.trim() || isAnalyzing} isLoading={isAnalyzing} className="!w-auto !py-2 !px-5">
                                        Analyze
                                    </AppButton>
                                </div>
                            </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
        </div>
    );
};

export default HunterDashboard;