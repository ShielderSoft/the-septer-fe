import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../api/apiClient';
import InputField from '../components/ui/InputField';
import PasswordField from '../components/ui/PasswordField';
import AppButton from '../components/ui/AppButton';
import ThemeToggle from '../components/ui/ThemeToggle';

const LoginPage = () => {
  const { login, navigateToLanding } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      if (isLoginView) {
        await login({ email, password });
      } else {
        await api.signup({ email, password, role: 'Hunter' });
        setSuccess('Registration successful! Please log in.');
        setIsLoginView(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animated-gradient-background font-sans">
      <div className="background-blob-three"></div>
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-light-surface/80 dark:bg-dark-surface/50 backdrop-blur-xl border border-gray-200 dark:border-dark-text-secondary/20 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary cursor-pointer" onClick={navigateToLanding}>Septer</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">Log Analysis, Reimagined.</p>
        </div>

        <div className="flex bg-light-bg dark:bg-dark-bg p-1 rounded-md">
          <button onClick={() => setIsLoginView(true)} className={`w-1/2 py-2 rounded-md transition text-light-text-primary dark:text-dark-text-primary font-semibold ${isLoginView ? 'bg-light-surface dark:bg-dark-primary/50 shadow' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>Login</button>
          <button onClick={() => setIsLoginView(false)} className={`w-1/2 py-2 rounded-md transition text-light-text-primary dark:text-dark-text-primary font-semibold ${!isLoginView ? 'bg-light-surface dark:bg-dark-primary/50 shadow' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField icon={<Mail size={20} />} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          <PasswordField placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {!isLoginView && <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Password must be 8+ chars with uppercase, lowercase, digit, and special character.</p>}
          <AppButton type="submit" isLoading={loading}>{isLoginView ? 'Login' : 'Create Account'}</AppButton>
        </form>

        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default LoginPage;