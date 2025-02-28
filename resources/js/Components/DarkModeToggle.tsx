import { motion } from 'motion/react';
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
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
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

    const moon_path =
        'M43.9905 58.2116C52.9439 57.1122 59.3109 48.9629 58.2116 40.0095C41.4472 48.763 34.1312 41.3619 40.0095 25.7884C31.0561 26.8878 24.6891 35.0371 25.7884 43.9905C26.8878 52.9439 35.0371 59.3109 43.9905 58.2116Z';
    const sun_path =
        'M11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15Z';

    return (
        <button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center rounded-md p-2 transition-colors ${darkMode ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300'} ${className}`}
            aria-label={
                darkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
        >
            <motion.svg
                width="98"
                height="98"
                viewBox="0 0 98 98"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="content-center"
            >
                <motion.path
                    initial={{ fillOpacity: 0, strokeOpacity: 0 }}
                    animate={
                        darkMode
                            ? {
                                  fillOpacity: 0.35,
                                  strokeOpacity: 1,
                                  rotate: 360,
                                  scale: 2,
                                  stroke: 'var(--color-blue-400)',
                                  fill: 'var(--color-blue-400)',
                                  d: moon_path,
                              }
                            : {
                                  fillOpacity: 0.35,
                                  strokeOpacity: 1,
                                  rotate: 0,
                                  stroke: 'var(--color-yellow-600)',
                                  fill: 'var(--color-yellow-600)',
                                  d: sun_path,
                              }
                    }
                    transition={{ duration: 0.5 }}
                    d={darkMode ? moon_path : sun_path}
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <motion.g className="stroke-6 stroke-yellow-600">
                    <path d="M11 1V3" />
                    <path d="M11 19V21" />
                    <path d="M3.93 3.93L5.34 5.34" />
                    <path d="M16.66 16.66L18.07 18.07" />
                    <path d="M1 11H3" />
                    <path d="M19 11H21" />
                    <path d="M5.34 16.66L3.93 18.07" />
                    <path d="M18.07 3.93L16.66 5.34" />
                </motion.g>
            </motion.svg>
        </button>
    );
}
