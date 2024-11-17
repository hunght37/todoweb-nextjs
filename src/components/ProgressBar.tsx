'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 ${className}`}>
      <div
        className="h-2 bg-blue-600 rounded-full dark:bg-blue-500 transition-all duration-300"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
}
