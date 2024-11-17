'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
}

export default function ProgressBar({ progress, className = '', color = 'var(--theme-primary)' }: ProgressBarProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-300 ease-in-out transform origin-left"
        style={{
          width: `${normalizedProgress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
