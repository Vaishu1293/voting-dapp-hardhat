import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      className="ml-4 px-4 py-2 rounded-md text-sm bg-gray-700 hover:bg-gray-600"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;