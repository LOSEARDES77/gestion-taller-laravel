import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { TranslationProvider } from './Providers/TranslationProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize dark mode on page load
const initDarkMode = () => {
    // Check if user has a preference stored
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Check for system preference if no stored preference
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
    ).matches;
    const shouldBeDark = isDarkMode !== null ? isDarkMode : prefersDark;

    // Apply the theme on initial load
    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// Run dark mode initialization
initDarkMode();

// Start the Inertia app
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Add some CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fadeIn 0.3s ease-out forwards;
            }
        `;
        document.head.appendChild(style);

        // Wrap the app with TranslationProvider
        root.render(
            <TranslationProvider>
                <App {...props} />
            </TranslationProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
