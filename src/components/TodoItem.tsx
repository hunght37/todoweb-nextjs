import { Todo } from '@/types';
import { FaTrash, FaEdit, FaCheck, FaFlag, FaClock } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TodoItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="group bg-white rounded-lg drive-shadow hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center p-4">
        <button
          onClick={onToggleComplete}
          className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
            ${todo.completed 
              ? 'bg-[var(--drive-green)] border-[var(--drive-green)]' 
              : 'border-[var(--drive-border)] hover:border-[var(--drive-green)]'
            }`}
        >
          {todo.completed && <FaCheck className="w-3 h-3 text-white" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`text-base font-medium truncate ${
                todo.completed ? 'text-gray-400 line-through' : 'text-[var(--drive-text)]'
              }`}
            >
              {todo.title}
            </h3>
            <FaFlag className={`w-3 h-3 ${getPriorityColor(todo.priority)}`} />
          </div>
          {todo.description && (
            <p
              className={`text-sm mb-2 line-clamp-2 ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {todo.description}
            </p>
          )}
          {todo.deadline && (
            <div className={`flex items-center text-xs gap-1 ${
              isOverdue(todo.deadline) && !todo.completed ? 'text-red-500' : 'text-gray-500'
            }`}>
              <FaClock className="w-3 h-3" />
              <span>{formatDeadline(todo.deadline)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-[var(--drive-blue)] hover:bg-[var(--drive-hover)] rounded-full"
            aria-label="Edit todo"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-[var(--drive-hover)] rounded-full"
            aria-label="Delete todo"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
