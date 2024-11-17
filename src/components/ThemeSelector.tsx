'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-4">Theme Settings</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableThemes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t)}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme.name === t.name
                ? 'border-[var(--theme-primary)]'
                : 'border-transparent hover:border-[var(--theme-secondary)]'
            }`}
          >
            <div className="flex flex-col gap-2">
              <span className="text-lg font-medium text-[var(--theme-text)]">{t.name}</span>
              <div className="grid grid-cols-5 gap-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: t.colors.light.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: t.colors.light.secondary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: t.colors.light.background }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: t.colors.light.text }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: t.colors.light.accent }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
