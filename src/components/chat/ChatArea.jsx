import React from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { PROMPT_TEMPLATES } from '../../utils/constants';

const ChatArea = ({ 
  messages, 
  isLoading, 
  onSendMessage, 
  onDeleteMessage, 
  onEditMessage,
  darkMode,
  settings 
}) => {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Messages Area */}
      <div className="flex-1 mb-6">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onDeleteMessage={onDeleteMessage}
          onEditMessage={onEditMessage}
          darkMode={darkMode}
        />
      </div>

      {/* Input Area */}
      <InputArea
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        darkMode={darkMode}
        settings={settings}
        templates={PROMPT_TEMPLATES}
      />
    </div>
  );
};

export default ChatArea;