'use client';

import React, { useState } from 'react';
import { useTemplate } from '../context/TemplateContext';
import { Priority, TaskTemplate } from '../types/Task';
import { useTheme } from '../context/ThemeContext';

export default function TemplateManager() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplate();
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TaskTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categories: '',
    priority: 'medium' as Priority,
    estimatedTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const templateData = {
      name: formData.name,
      description: formData.description,
      categories: formData.categories.split(',').map(c => c.trim()),
      priority: formData.priority,
      estimatedTime: formData.estimatedTime ? parseInt(formData.estimatedTime) : undefined,
    };

    if (editingTemplate) {
      updateTemplate(editingTemplate.id, templateData);
    } else {
      addTemplate(templateData);
    }

    setIsModalOpen(false);
    setEditingTemplate(null);
    setFormData({
      name: '',
      description: '',
      categories: '',
      priority: 'medium',
      estimatedTime: '',
    });
  };

  const handleEdit = (template: TaskTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || '',
      categories: template.categories.join(', '),
      priority: template.priority,
      estimatedTime: template.estimatedTime?.toString() || '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--theme-text)]">Task Templates</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="drive-button drive-button-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Template
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="drive-shadow bg-white dark:bg-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-[var(--theme-text)]">{template.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(template)}
                  className="text-gray-500 hover:text-[var(--theme-primary)]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            {template.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.description}</p>
            )}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {template.categories.map((category) => (
                  <span
                    key={category}
                    className="text-xs px-2 py-1 rounded-full bg-[var(--theme-primary)] bg-opacity-10 text-[var(--theme-primary)]"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className={`capitalize ${
                  template.priority === 'high' ? 'text-red-500' :
                  template.priority === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {template.priority} Priority
                </span>
                {template.estimatedTime && (
                  <span>
                    {template.estimatedTime} min
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingTemplate ? 'Edit Template' : 'New Template'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTemplate(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="drive-input mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="drive-input mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Categories (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.categories}
                    onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                    className="drive-input mt-1"
                    placeholder="e.g., work, personal, urgent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="drive-input mt-1"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Estimated Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    className="drive-input mt-1"
                    placeholder="e.g., 30"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingTemplate(null);
                    }}
                    className="drive-button drive-button-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="drive-button drive-button-primary"
                  >
                    {editingTemplate ? 'Update Template' : 'Create Template'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
