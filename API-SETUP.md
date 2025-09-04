# Mock API Setup  

## Mock API Implementation  

### In `src/utils/helpers.js`  

export const simulateAIResponse = (prompt, model, settings) => {
  const responses = [
    `I understand you're asking about: "${prompt}". Using ${model} with temperature ${settings.temperature}...`,
    `Based on your query "${prompt}", here's my analysis using ${model}...`,
    `Great question about "${prompt}"! Using ${model} at temperature ${settings.temperature}...`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
```

### In `src/hooks/useChat.js` 

const sendMessage = useCallback(async (content, settings) => {
  
  const userMessage = {
    id: generateId(),
    type: MESSAGE_TYPES.USER,
    content: content.trim(),
    timestamp: Date.now()
  };
  setMessages(prev => [...prev, userMessage]);
  
  setIsLoading(true);

  
  setTimeout(() => {
    const aiResponse = {
      id: generateId(),
      type: MESSAGE_TYPES.ASSISTANT,
      content: simulateAIResponse(content, settings.model, settings),
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  }, 1000 + Math.random() * 2000);
}, []);
```

### In `src/utils/constants.js` 

export const AI_MODELS = [
  { value: 'gpt-3.5', label: 'GPT-3.5', description: 'Fast and efficient' },
  { value: 'gpt-4', label: 'GPT-4', description: 'Better reasoning' },
  { value: 'claude', label: 'Claude', description: 'Helpful and honest' }
];

export const PROMPT_TEMPLATES = [
  { id: 'code-review', name: 'Code Review', prompt: 'Please review this code:' },
  { id: 'creative-writing', name: 'Creative Writing', prompt: 'Write a story about:' }
];
```
