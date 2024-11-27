import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-full transition-colors duration-200',
        isDark ? 'bg-gray-800 text-yellow-400' : 'bg-blue-100 text-blue-900'
      )}
    >
      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}