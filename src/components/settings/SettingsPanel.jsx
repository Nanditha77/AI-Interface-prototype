import React from 'react';
import { Sliders, Palette, Database, Download, Upload, RotateCcw } from 'lucide-react';
import ModelSelector from './ModelSelector';
import ParameterControls from './ParameterControls';
import TemplateSelector from './TemplateSelector';
import Button from '../ui/Button';

const SettingsPanel = ({ 
  settings, 
  onUpdateSetting, 
  onResetSettings,
  onExportSettings,
  onImportSettings,
  darkMode,
  show = false 
}) => {
  if (!show) return null;

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const settings = e.target.result;
            onImportSettings(settings);
          } catch (error) {
            alert('Invalid settings file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const settingsJson = onExportSettings();
    const blob = new Blob([settingsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-interface-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`w-80 rounded-xl p-6 space-y-6 animate-slide-up ${
      darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
    } backdrop-blur-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-500" />
          Settings
        </h2>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleExport}
            title="Export Settings"
            className="p-1"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleImport}
            title="Import Settings"
            className="p-1"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onResetSettings}
            title="Reset to Defaults"
            className="p-1"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Model Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Palette className="w-4 h-4" />
          AI Model
        </h3>
        <ModelSelector
          value={settings.model}
          onChange={(value) => onUpdateSetting('model', value)}
        />
      </div>

      {/* Parameter Controls */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Sliders className="w-4 h-4" />
          Parameters
        </h3>
        <ParameterControls
          settings={settings}
          onUpdateSetting={onUpdateSetting}
        />
      </div>

      {/* Templates */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Database className="w-4 h-4" />
          Quick Templates
        </h3>
        <TemplateSelector />
      </div>

      {/* Settings Info */}
      <div className={`p-3 rounded-lg text-xs ${
        darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
      }`}>
        <p className="text-gray-600 dark:text-gray-400">
          Settings are automatically saved to your browser's local storage.
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;