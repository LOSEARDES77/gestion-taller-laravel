import { useEffect, useState } from 'react';

interface DarkModeToggleProps {
    className?: string;
}

export default function DarkModeToggle({
    className = '',
}: DarkModeToggleProps) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if user has a preference stored
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Check for system preference if no stored preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = isDarkMode !== null ? isDarkMode : prefersDark;
        
        setDarkMode(shouldBeDark);

        // Apply the theme on initial load
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        // Save preference to localStorage
        localStorage.setItem('darkMode', newDarkMode.toString());

        // Apply or remove dark mode class
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center rounded-md p-2 transition-colors ${darkMode ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300'} ${className}`}
            aria-label={
                darkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
        >
            {darkMode ? (
                // Sun icon for light mode
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                // Moon icon for dark mode
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}
