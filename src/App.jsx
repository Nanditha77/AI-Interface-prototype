import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import ChatArea from './components/chat/ChatArea';
import SettingsPanel from './components/settings/SettingsPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useChat } from './hooks/useChat';
import { useSettings } from './hooks/useSettings';
import { downloadText, formatChatHistory } from './utils/helpers';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [showSettings, setShowSettings] = useLocalStorage('showSettings', false);
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearChat, 
    deleteMessage, 
    editMessage 
  } = useChat();
  
  const { 
    settings, 
    updateSetting, 
    resetSettings, 
    exportSettings, 
    importSettings 
  } = useSettings();

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = (content) => {
    sendMessage(content, settings);
  };

  const handleDownloadChat = () => {
    const chatHistory = formatChatHistory(messages);
    downloadText(chatHistory, `chat-history-${new Date().toISOString().split('T')[0]}.txt`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        showSettings={showSettings}
        toggleSettings={toggleSettings}
        onDownloadChat={handleDownloadChat}
        onClearChat={clearChat}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Settings Sidebar */}
        <SettingsPanel
          settings={settings}
          onUpdateSetting={updateSetting}
          onResetSettings={resetSettings}
          onExportSettings={exportSettings}
          onImportSettings={importSettings}
          darkMode={darkMode}
          show={showSettings}
        />

        {/* Main Chat Area */}
        <div className="flex-1">
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onDeleteMessage={deleteMessage}
            onEditMessage={editMessage}
            darkMode={darkMode}
            settings={settings}
          />
        </div>
      </div>
    </div>
  );
}

export default App;