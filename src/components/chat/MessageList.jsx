import React, { useRef, useEffect } from 'react';
import { Loader, Bot } from 'lucide-react';
import Message from './Message';

const MessageList = ({ 
  messages, 
  isLoading, 
  onDeleteMessage, 
  onEditMessage, 
  darkMode 
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className={`rounded-xl p-6 h-full overflow-y-auto custom-scrollbar ${
      darkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/30 border border-gray-200'
    } backdrop-blur-sm`}>
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <Bot className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Ask me anything! I can help with coding, writing, analysis, and much more.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                onEdit={onEditMessage}
                onDelete={onDeleteMessage}
                darkMode={darkMode}
              />
            ))}
            
            {isLoading && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className={`flex-1 p-4 rounded-2xl max-w-3xl ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>AI is thinking...</span>
                    <div className="flex gap-1 ml-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;