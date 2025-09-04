export const AI_MODELS = [
  { value: 'gpt-3.5', label: 'GPT-3.5', description: 'Fast and efficient for most tasks' },
  { value: 'gpt-4', label: 'GPT-4', description: 'More capable, better reasoning' },
  { value: 'claude', label: 'Claude', description: 'Helpful, harmless, and honest' },
  { value: 'custom', label: 'Custom', description: 'Your own model configuration' }
];

export const PROMPT_TEMPLATES = [
  {
    id: 'code-review',
    name: 'Code Review',
    prompt: 'Please review this code and suggest improvements:\n\n',
    category: 'Development'
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    prompt: 'Write a creative story about:\n\n',
    category: 'Creative'
  },
  {
    id: 'technical-explanation',
    name: 'Technical Explanation',
    prompt: 'Explain this technical concept in simple terms:\n\n',
    category: 'Education'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    prompt: 'Analyze this data and provide insights:\n\n',
    category: 'Analytics'
  },
  {
    id: 'debugging',
    name: 'Debugging Help',
    prompt: 'Help me debug this issue:\n\n',
    category: 'Development'
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming',
    prompt: 'Help me brainstorm ideas for:\n\n',
    category: 'Creative'
  }
];

export const DEFAULT_SETTINGS = {
  model: 'gpt-3.5',
  temperature: 0.7,
  maxTokens: 150,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0
};

export const PARAMETER_LIMITS = {
  temperature: { min: 0, max: 1, step: 0.1 },
  maxTokens: { min: 50, max: 2000, step: 50 },
  topP: { min: 0, max: 1, step: 0.1 },
  frequencyPenalty: { min: 0, max: 2, step: 0.1 },
  presencePenalty: { min: 0, max: 2, step: 0.1 }
};

export const MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};