import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';

const InputArea = ({ 
  onSendMessage, 
  isLoading, 
  darkMode, 
  settings,
  templates = []
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const applyTemplate = (template) => {
    setInputValue(template.prompt);
  };

  return (
    <div className={`rounded-xl p-4 ${
      darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
    } backdrop-blur-sm`}>
      {/* Quick Templates */}
      {templates.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {templates.slice(0, 3).map((template) => (
              <Button
                key={template.id}
                size="sm"
                variant="ghost"
                onClick={() => applyTemplate(template)}
                className="text-xs"
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            rows={3}
            maxLength={1000}
            showCount
            className="min-h-[80px]"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Attach file (Coming soon)"
            disabled
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            loading={isLoading}
            className="p-3"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Settings Info */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          Model: {settings.model} | Temp: {settings.temperature} | Max Tokens: {settings.maxTokens}
        </span>
        <span>
          {inputValue.length}/1000
        </span>
      </div>
    </div>
  );
};

export default InputArea;