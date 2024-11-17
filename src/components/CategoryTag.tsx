'use client';

interface CategoryTagProps {
  name: string;
  color: string;
  className?: string;
}

export default function CategoryTag({ name, color, className = '' }: CategoryTagProps) {
  return (
    <span
      className={`category-tag ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {name}
    </span>
  );
}
