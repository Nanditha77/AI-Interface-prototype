import React from 'react';
import { Bot, Settings, Moon, Sun, Download, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  showSettings, 
  toggleSettings,
  onDownloadChat,
  onClearChat 
}) => {
  return (
    <header className={`border-b backdrop-blur-sm sticky top-0 z-10 transition-colors ${
      darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Interface Prototype
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Technical Assessment Frontend
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearChat}
            className="p-2"
            title="Clear Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSettings}
            className={`p-2 ${showSettings ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="p-2"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onDownloadChat}
            className="p-2"
            title="Download Chat"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;