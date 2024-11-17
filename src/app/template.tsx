'use client';

import { ThemeProvider } from '@/context/ThemeContext'
import { TaskProvider } from '@/context/TaskContext'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </ThemeProvider>
  );
}
