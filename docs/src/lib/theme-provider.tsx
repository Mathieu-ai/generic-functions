'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { ERROR_MESSAGES, STORAGE_KEYS } from './constants';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  readonly theme: Theme;
  readonly toggleTheme: () => void;
  readonly setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider ({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = saved || systemPreference;

    setThemeState(initialTheme);
    applyTheme(initialTheme, false); // No transition on initial load

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme, true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme: Theme, enableTransition = true) => {
    // Disable transitions during theme change for better performance
    if (enableTransition) {
      setIsTransitioning(true);
      document.documentElement.classList.add('theme-transitioning');
    }

    // Use requestAnimationFrame to ensure DOM updates are batched
    requestAnimationFrame(() => {
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');

      if (enableTransition) {
        // Re-enable transitions after theme change
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transitioning');
          setIsTransitioning(false);
        }, 100);
      }
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme, true);
  };

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent rapid toggling
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme () {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(ERROR_MESSAGES.THEME_REQUIRED);
  }
  return context;
}
