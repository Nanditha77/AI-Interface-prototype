import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../../utils/constants';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

const TemplateSelector = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState(PROMPT_TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    prompt: '',
    category: 'Custom'
  });

  const categories = [...new Set(templates.map(t => t.category))];

  const handleApplyTemplate = (template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
    // For now, we'll copy to clipboard or trigger some action
    navigator.clipboard.writeText(template.prompt);
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.prompt.trim()) return;

    const template = {
      id: Date.now().toString(),
      ...newTemplate
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({ name: '', prompt: '', category: 'Custom' });
    setShowAddForm(false);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate({ ...template });
  };

  const handleUpdateTemplate = () => {
    setTemplates(prev => 
      prev.map(t => t.id === editingTemplate.id ? editingTemplate : t)
    );
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const templatesByCategory = categories.reduce((acc, category) => {
    acc[category] = templates.filter(t => t.category === category);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Add Template Button */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Custom Template
      </Button>

      {/* Add Template Form */}
      {showAddForm && (
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3 bg-gray-50 dark:bg-gray-800/50">
          <Input
            placeholder="Template name"
            value={newTemplate.name}
            onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
          />
          <Textarea
            placeholder="Enter your prompt template..."
            rows={3}
            value={newTemplate.prompt}
            onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSaveTemplate}>
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAddForm(false)}>
              <X className="w-3 h-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Templates by Category */}
      {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {category}
          </h4>
          <div className="space-y-1">
            {categoryTemplates.map((template) => (
              <div key={template.id}>
                {editingTemplate?.id === template.id ? (
                  <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg space-y-2 bg-gray-50 dark:bg-gray-800/50">
                    <Input
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Textarea
                      rows={2}
                      value={editingTemplate.prompt}
                      onChange={(e) => setEditingTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={handleUpdateTemplate}>
                        <Save className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingTemplate(null)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="group flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <button
                      onClick={() => handleApplyTemplate(template)}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {template.prompt.substring(0, 50)}...
                      </div>
                    </button>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditTemplate(template)}
                        className="p-1 h-6 w-6"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      {template.category === 'Custom' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 h-6 w-6 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Template Stats */}
      <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <span>{templates.length} templates</span>
          <span>{templates.filter(t => t.category === 'Custom').length} custom</span>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;