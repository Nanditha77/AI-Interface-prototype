import React from 'react';
import { Info } from 'lucide-react';
import { PARAMETER_LIMITS } from '../../utils/constants';
import Slider from '../ui/Slider';
import Input from '../ui/Input';

const ParameterControls = ({ settings, onUpdateSetting }) => {
  const parameterInfo = {
    temperature: {
      description: "Controls randomness. Lower values make responses more focused and deterministic.",
      example: "0.1 = precise, 0.9 = creative"
    },
    maxTokens: {
      description: "Maximum number of tokens in the response.",
      example: "150 = short, 500 = medium, 1000+ = long"
    },
    topP: {
      description: "Controls diversity via nucleus sampling. Alternative to temperature.",
      example: "0.1 = focused, 0.9 = diverse"
    },
    frequencyPenalty: {
      description: "Reduces repetition of tokens based on their frequency.",
      example: "0 = no penalty, 2 = strong penalty"
    },
    presencePenalty: {
      description: "Reduces repetition by penalizing tokens that have appeared.",
      example: "0 = no penalty, 2 = strong penalty"
    }
  };

  const ParameterTooltip = ({ parameter }) => {
    const info = parameterInfo[parameter];
    return (
      <div className="group relative inline-block">
        <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
        <div className="invisible group-hover:visible absolute z-10 w-64 p-3 mt-2 text-xs bg-black dark:bg-gray-800 text-white rounded-lg shadow-lg -translate-x-1/2 left-1/2">
          <p className="font-medium mb-1">{info.description}</p>
          <p className="text-gray-300 dark:text-gray-400">{info.example}</p>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black dark:bg-gray-800 rotate-45"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Temperature */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">Temperature</span>
          <ParameterTooltip parameter="temperature" />
        </div>
        <Slider
          value={settings.temperature}
          min={PARAMETER_LIMITS.temperature.min}
          max={PARAMETER_LIMITS.temperature.max}
          step={PARAMETER_LIMITS.temperature.step}
          onChange={(value) => onUpdateSetting('temperature', value)}
          showValue={true}
        />
      </div>

      {/* Max Tokens */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">Max Tokens</span>
          <ParameterTooltip parameter="maxTokens" />
        </div>
        <Input
          type="number"
          min={PARAMETER_LIMITS.maxTokens.min}
          max={PARAMETER_LIMITS.maxTokens.max}
          step={PARAMETER_LIMITS.maxTokens.step}
          value={settings.maxTokens}
          onChange={(e) => onUpdateSetting('maxTokens', parseInt(e.target.value))}
        />
      </div>

      {/* Advanced Parameters Collapsible */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 list-none">
          <div className="flex items-center gap-2">
            <span>Advanced Parameters</span>
            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        
        <div className="mt-4 space-y-4 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
          {/* Top P */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Top P</span>
              <ParameterTooltip parameter="topP" />
            </div>
            <Slider
              value={settings.topP || 1}
              min={PARAMETER_LIMITS.topP.min}
              max={PARAMETER_LIMITS.topP.max}
              step={PARAMETER_LIMITS.topP.step}
              onChange={(value) => onUpdateSetting('topP', value)}
              showValue={true}
            />
          </div>

          {/* Frequency Penalty */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Frequency Penalty</span>
              <ParameterTooltip parameter="frequencyPenalty" />
            </div>
            <Slider
              value={settings.frequencyPenalty || 0}
              min={PARAMETER_LIMITS.frequencyPenalty.min}
              max={PARAMETER_LIMITS.frequencyPenalty.max}
              step={PARAMETER_LIMITS.frequencyPenalty.step}
              onChange={(value) => onUpdateSetting('frequencyPenalty', value)}
              showValue={true}
            />
          </div>

          {/* Presence Penalty */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Presence Penalty</span>
              <ParameterTooltip parameter="presencePenalty" />
            </div>
            <Slider
              value={settings.presencePenalty || 0}
              min={PARAMETER_LIMITS.presencePenalty.min}
              max={PARAMETER_LIMITS.presencePenalty.max}
              step={PARAMETER_LIMITS.presencePenalty.step}
              onChange={(value) => onUpdateSetting('presencePenalty', value)}
              showValue={true}
            />
          </div>
        </div>
      </details>

      {/* Parameter Presets */}
      <div>
        <div className="text-sm font-medium mb-3">Quick Presets</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onUpdateSetting('temperature', 0.1);
              onUpdateSetting('topP', 0.1);
            }}
            className="p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            🎯 Precise
          </button>
          <button
            onClick={() => {
              onUpdateSetting('temperature', 0.7);
              onUpdateSetting('topP', 1);
            }}
            className="p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            ⚖️ Balanced
          </button>
          <button
            onClick={() => {
              onUpdateSetting('temperature', 0.9);
              onUpdateSetting('topP', 0.9);
            }}
            className="p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            🎨 Creative
          </button>
          <button
            onClick={() => {
              onUpdateSetting('temperature', 1.0);
              onUpdateSetting('frequencyPenalty', 1.0);
              onUpdateSetting('presencePenalty', 1.0);
            }}
            className="p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            🔀 Random
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;