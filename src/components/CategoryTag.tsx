'use client';

import { useTask } from '../context/TaskContext';

interface CategoryTagProps {
  category: string;
  onRemove?: () => void;
}

export default function CategoryTag({ category, onRemove }: CategoryTagProps) {
  const { categories } = useTask();
  const categoryData = categories.find(c => c.name === category);
  const color = categoryData?.color || '#6B7280'; // Default gray color

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium dark:bg-opacity-20"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {category}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
