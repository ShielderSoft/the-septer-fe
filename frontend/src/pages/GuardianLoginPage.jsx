import React, { useState, useEffect } from 'react';
import { Mail, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/ui/InputField';
import PasswordField from '../components/ui/PasswordField';
import AppButton from '../components/ui/AppButton';

const GuardianLoginPage = () => {
    const { guardianLogin, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If user is already logged in with guardian access, redirect to dashboard
        if (user && user.role === 'Guardian' && user.guardianAccess) {
            window.history.pushState({}, '', '/g-dashboard');
            return;
        }
        
        // Ensure we're on the correct path
        if (window.location.pathname !== '/g-login') {
            window.history.pushState({}, '', '/g-login');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await guardianLogin({ email, password });
            // Don't use window.location.reload() - let React handle the state change
            window.history.pushState({}, '', '/g-dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/60 backdrop-blur-md border border-red-700/50 rounded-2xl shadow-2xl shadow-red-900/20">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
                        <Shield size={32} className="text-red-400"/> 
                        Guardian Portal
                    </h1>
                    <p className="text-red-400/80">Authorized Access Only</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField 
                        icon={<Mail size={18} />} 
                        type="email" 
                        placeholder="Guardian Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />
                    <PasswordField 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                    <AppButton 
                        type="submit" 
                        isLoading={loading} 
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    >
                        Authenticate
                    </AppButton>
                </form>
                {error && <p className="text-center text-red-400">{error}</p>}
            </div>
        </div>
    );
};

export default GuardianLoginPage;