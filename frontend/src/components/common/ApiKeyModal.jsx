import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as api from '../../api/apiClient';
import InputField from '../ui/InputField';
import AppButton from '../ui/AppButton';

const ApiKeyModal = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);
    const { token, updateUser } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await api.addApiKey(apiKey, token);
            updateUser({ gemini_api_key: apiKey });
            onClose();
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-cyan-500/30 rounded-lg p-8 w-full max-w-lg space-y-4 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Key className="text-cyan-600 dark:text-cyan-400" />Add Your Gemini API Key</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    To analyze logs, Septer needs your Gemini API key. This is stored securely and only used to process your requests.
                </p>
                <InputField icon={<Key size={18} />} placeholder="Enter your Gemini API key" value={apiKey} onChange={e => setApiKey(e.target.value)} />
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Cancel</button>
                    <AppButton onClick={handleSubmit} isLoading={loading} disabled={!apiKey}>Save Key</AppButton>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;