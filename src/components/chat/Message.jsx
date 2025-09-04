import React, { useState } from 'react';
import { Bot, User, Copy, Check, Edit, Trash2 } from 'lucide-react';
import { MESSAGE_TYPES } from '../../utils/constants';
import { copyToClipboard, formatTimestamp } from '../../utils/helpers';
import Button from '../ui/Button';

const Message = ({ message, onEdit, onDelete, darkMode }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(message.id, editContent);
    }
    setIsEditing(false);
  };

  const isUser = message.type === MESSAGE_TYPES.USER;
  const isAssistant = message.type === MESSAGE_TYPES.ASSISTANT;

  return (
    <div className={`flex gap-4 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
          : 'bg-gradient-to-br from-purple-500 to-purple-600'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-4 rounded-2xl relative ${
          isUser
            ? darkMode 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-500 text-white'
            : darkMode 
              ? 'bg-gray-700 text-gray-100' 
              : 'bg-gray-100 text-gray-900'
        }`}>
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={`w-full p-2 rounded border resize-none ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleEdit}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
              {message.edited && (
                <span className="text-xs opacity-70 block mt-1">(edited)</span>
              )}
            </>
          )}
          
          {/* Action Buttons */}
          {!isEditing && (
            <div className={`absolute ${isUser ? 'left-2' : 'right-2'} top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="p-1 h-6 w-6"
                title="Copy message"
              >
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
              
              {isUser && onEdit && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="p-1 h-6 w-6"
                  title="Edit message"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              )}
              
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(message.id)}
                  className="p-1 h-6 w-6 text-red-400 hover:text-red-600"
                  title="Delete message"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;