import React from 'react';
import { AI_MODELS } from '../../utils/constants';
import Select from '../ui/Select';

const ModelSelector = ({ value, onChange }) => {
  const selectedModel = AI_MODELS.find(model => model.value === value);

  return (
    <div className="space-y-3">
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={AI_MODELS}
        className="w-full"
      />
      
      {selectedModel && (
        <div className="text-xs text-gray-600 dark:text-gray-400 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <p className="font-medium mb-1">{selectedModel.label}</p>
          <p>{selectedModel.description}</p>
        </div>
      )}
      
      {/* Model comparison info */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded bg-gray-100 dark:bg-gray-700/30">
            <div className="font-medium">Speed</div>
            <div className="text-xs">
              {value === 'gpt-3.5' ? '⚡⚡⚡' : 
               value === 'gpt-4' ? '⚡⚡' : 
               value === 'claude' ? '⚡⚡' : '⚡'}
            </div>
          </div>
          <div className="p-2 rounded bg-gray-100 dark:bg-gray-700/30">
            <div className="font-medium">Quality</div>
            <div className="text-xs">
              {value === 'gpt-3.5' ? '⭐⭐⭐' : 
               value === 'gpt-4' ? '⭐⭐⭐⭐' : 
               value === 'claude' ? '⭐⭐⭐⭐' : '⭐⭐'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;