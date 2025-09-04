import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_SETTINGS } from '../utils/constants';

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage('ai-interface-settings', DEFAULT_SETTINGS);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const exportSettings = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (settingsString) => {
    try {
      const parsedSettings = JSON.parse(settingsString);
      setSettings({
        ...DEFAULT_SETTINGS,
        ...parsedSettings
      });
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    exportSettings,
    importSettings
  };
};