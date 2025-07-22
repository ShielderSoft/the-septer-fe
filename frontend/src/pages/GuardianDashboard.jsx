import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../api/apiClient';
import { Users, Shield, Bot, LogOut } from 'lucide-react';

const GuardianDashboard = () => {
    const { user, token, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState({ total_questions: 0, questions_by_users: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure we're on the correct path
        if (window.location.pathname !== '/g-dashboard') {
            window.history.pushState({}, '', '/g-dashboard');
        }
        
        // If user doesn't have guardian access, don't render
        if (!user || user.role !== 'Guardian' || !user.guardianAccess) {
            return;
        }

        const fetchData = async () => {
            try {
                const data = await api.getGuardianDashboard(token);
                setDashboardData(data);
            } catch (err) {
                console.error(err);
                alert(`Failed to fetch dashboard data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, user]);

    const handleLogout = () => {
        logout();
    };

    // Don't render if user doesn't have guardian access
    if (!user || user.role !== 'Guardian' || !user.guardianAccess) {
        return null;
    }

    const StatCard = ({ icon, label, value, color }) => (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex items-center gap-4">
            <div className={`p-3 rounded-full bg-${color}-500/20 text-${color}-400`}>{icon}</div>
            <div>
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-gray-400">{label}</div>
            </div>
        </div>
    );
    
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading Dashboard...</div>
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
             <header className="flex justify-between items-center p-4 border-b border-red-800/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="text-2xl font-bold flex items-center gap-2">
                    <Shield size={24} className="text-red-400"/> Guardian Dashboard
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-gray-400">{user.email}</span>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition" title="Logout">
                        <LogOut size={20}/>
                    </button>
                </div>
            </header>
            <main className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                    <StatCard icon={<Bot size={28}/>} label="Total Questions Asked" value={dashboardData.total_questions} color="cyan"/>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Recent Questions by Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-600">
                                <tr>
                                    <th className="p-3">User Email</th>
                                    <th className="p-3">Question</th>
                                    <th className="p-3">Asked At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.questions_by_users.map((q, i) => (
                                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                                        <td className="p-3 text-cyan-300">{q.user_email}</td>
                                        <td className="p-3 text-gray-200 max-w-md truncate" title={q.question}>{q.question}</td>
                                        <td className="p-3 text-gray-400">{new Date(q.asked_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {dashboardData.questions_by_users.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="p-3 text-center text-gray-500">No questions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GuardianDashboard;