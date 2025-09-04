import Message from './Message';

export default {
  title: 'Chat/Message',
  component: Message,
  parameters: {
    layout: 'padded',
  },
};

export const UserMessage = {
  args: {
    message: {
      id: '1',
      type: 'user',
      content: 'Hello, how can you help me today?',
      timestamp: Date.now(),
    },
    darkMode: false,
  },
};

export const AssistantMessage = {
  args: {
    message: {
      id: '2',
      type: 'assistant', 
      content: 'I can help you with coding, writing, analysis, and more!',
      timestamp: Date.now(),
    },
    darkMode: false,
  },
};

export const DarkMode = {
  args: {
    message: {
      id: '3',
      type: 'assistant',
      content: 'This is how I look in dark mode.',
      timestamp: Date.now(),
    },
    darkMode: true,
  },
};