'use client';

import { useState } from 'react';
import { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';
import { FaTasks, FaFilter } from 'react-icons/fa';

type FilterStatus = 'all' | 'active' | 'completed';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const handleAddTodo = (title: string, description: string, priority: Todo['priority'], deadline?: string) => {
    const newTodo: Todo = {
      _id: Date.now().toString(),
      title,
      description,
      priority,
      deadline,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return (
    <div className="min-h-screen bg-[var(--drive-bg)]">
      {/* Header */}
      <header className="bg-[var(--drive-header)] drive-shadow sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <FaTasks className="w-6 h-6 text-[var(--drive-blue)] mr-3" />
            <h1 className="text-xl font-medium text-[var(--drive-text)]">Tasks</h1>
          </div>
          
          {/* Statistics */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Total: {stats.total}</span>
            <span className="text-[var(--drive-green)]">Completed: {stats.completed}</span>
            <span className="text-[var(--drive-blue)]">Active: {stats.active}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {editingTodo ? (
          <TodoForm
            onSubmit={(title, description, priority, deadline) =>
              handleUpdateTodo(editingTodo._id, { title, description, priority, deadline })
            }
            initialData={editingTodo}
            onCancel={() => setEditingTodo(null)}
          />
        ) : (
          <TodoForm onSubmit={handleAddTodo} />
        )}

        {/* Filter */}
        <div className="flex items-center space-x-2 mb-4">
          <FaFilter className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="drive-input py-1 px-2 text-sm"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleComplete={() => handleToggleComplete(todo._id)}
              onEdit={() => setEditingTodo(todo)}
              onDelete={() => handleDeleteTodo(todo._id)}
            />
          ))}
          {filteredTodos.length === 0 && (
            <div className="text-center py-12">
              <FaTasks className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {todos.length === 0
                  ? 'No tasks yet. Add one above!'
                  : 'No tasks match the current filter.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
