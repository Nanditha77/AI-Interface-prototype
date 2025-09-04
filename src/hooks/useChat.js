import { useState, useCallback } from 'react';
import { generateId, simulateAIResponse } from '../utils/helpers';
import { MESSAGE_TYPES } from '../utils/constants';

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: generateId(),
      type: MESSAGE_TYPES.ASSISTANT,
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content, settings) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: generateId(),
      type: MESSAGE_TYPES.USER,
      content: content.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const aiResponse = {
        id: generateId(),
        type: MESSAGE_TYPES.ASSISTANT,
        content: simulateAIResponse(content, settings.model, settings),
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: generateId(),
        type: MESSAGE_TYPES.ASSISTANT,
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: Date.now()
      }
    ]);
  }, []);

  const deleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  const editMessage = useCallback((messageId, newContent) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: newContent, edited: true }
        : msg
    ));
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    deleteMessage,
    editMessage
  };
};