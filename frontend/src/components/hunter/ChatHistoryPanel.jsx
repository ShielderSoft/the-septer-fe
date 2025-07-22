import React from 'react';
import { MessageSquare } from 'lucide-react';

const ChatHistoryPanel = ({ chats, onSelectChat }) => {
    return (
        <div className="flex-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="space-y-2">
                {chats.map(chat => (
                    <button 
                        key={chat.id} 
                        onClick={() => onSelectChat(chat)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <MessageSquare size={18} />
                        <span className="truncate flex-1 font-medium">{chat.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatHistoryPanel;