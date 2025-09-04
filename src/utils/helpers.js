export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const downloadText = (text, filename = 'chat-history.txt') => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const formatChatHistory = (messages) => {
  return messages
    .map(msg => `${msg.type.toUpperCase()}: ${msg.content}`)
    .join('\n\n');
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const simulateAIResponse = (prompt, model, settings) => {
  const responses = [
    `I understand you're asking about: "${prompt}". Using ${model} with temperature ${settings.temperature}, here's my analysis...`,
    `Based on your query about "${prompt}", I can provide the following insights using ${model}...`,
    `Great question! Let me break down "${prompt}" for you using ${model} at temperature ${settings.temperature}...`,
    `I'll help you with "${prompt}". Using ${model} with current settings, here's what I found...`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};