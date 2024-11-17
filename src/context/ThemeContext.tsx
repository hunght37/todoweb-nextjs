'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeColor = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
};

export type Theme = {
  name: string;
  colors: {
    light: ThemeColor;
    dark: ThemeColor;
  };
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  availableThemes: Theme[];
}

const defaultThemes: Theme[] = [
  {
    name: 'Default',
    colors: {
      light: {
        primary: '#1a73e8',
        secondary: '#188038',
        background: '#f6f9fc',
        text: '#3c4043',
        accent: '#ea4335',
      },
      dark: {
        primary: '#8ab4f8',
        secondary: '#81c995',
        background: '#202124',
        text: '#e8eaed',
        accent: '#f28b82',
      },
    },
  },
  {
    name: 'Ocean',
    colors: {
      light: {
        primary: '#006d77',
        secondary: '#83c5be',
        background: '#edf6f9',
        text: '#2c3e50',
        accent: '#e29578',
      },
      dark: {
        primary: '#83c5be',
        secondary: '#006d77',
        background: '#1a1a2e',
        text: '#e8eaed',
        accent: '#e29578',
      },
    },
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultThemes[0]);
  const [isDark, setIsDark] = useState(false);

  // Load theme and dark mode preference
  useEffect(() => {
    try {
      const savedThemeName = localStorage.getItem('themeName') || defaultThemes[0].name;
      const savedIsDark = localStorage.getItem('isDark') === 'true';
      
      const selectedTheme = defaultThemes.find(t => t.name === savedThemeName) || defaultThemes[0];
      setTheme(selectedTheme);
      setIsDark(savedIsDark);
      
      // Apply dark mode class
      document.documentElement.classList.toggle('dark', savedIsDark);
      
      // Apply theme colors
      const colors = savedIsDark ? selectedTheme.colors.dark : selectedTheme.colors.light;
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--theme-${key}`, value);
      });
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to default theme
      setTheme(defaultThemes[0]);
      setIsDark(false);
    }
  }, []);

  // Update theme colors whenever theme or dark mode changes
  useEffect(() => {
    const colors = isDark ? theme.colors.dark : theme.colors.light;
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--theme-${key}`, value);
    });
  }, [theme, isDark]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('themeName', newTheme.name);
  };

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('isDark', newIsDark.toString());
  };

  const value = {
    theme,
    isDark,
    setTheme: handleSetTheme,
    toggleDarkMode,
    availableThemes: defaultThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
