'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

import { Button } from './ui/button';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme"
      className="hover:border"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all hover:transition-none dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all  hover:transition-none dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
