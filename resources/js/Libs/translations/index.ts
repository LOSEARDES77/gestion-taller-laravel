import axios from 'axios';
import { LanguageOption } from '../../types';

// Type definitions
interface Translations {
    [key: string]: {
        [language: string]: string;
    };
}
export const languages: LanguageOption[] = [
    { value: 'en', label: '🇺🇸 EN' },
    { value: 'es', label: '🇪🇸 ES' },
    { value: 'fr', label: '🇫🇷 FR' },
    { value: 'de', label: '🇩🇪 DE' },
    { value: 'pt', label: '🇵🇹 PT' },
    { value: 'it', label: '🇮🇹 IT' },
    { value: 'nl', label: '🇳🇱 NL' },
    { value: 'pl', label: '🇵🇱 PL' },
    { value: 'ru', label: '🇷🇺 RU' },
    { value: 'tr', label: '🇹🇷 TR' },
    { value: 'cz', label: '🇨🇿 CZ' },
];
// Supported languages
export const supportedLanguages = languages.map((lang) => lang.value);

// Store translations once loaded
let translations: Translations = {};
let currentLanguage: string = localStorage.getItem('language') || 'en'; // Get from localStorage or use default
let isInitialized: boolean = false;
let initializationPromise: Promise<void> | null = null;

// Event listeners for language changes
type LanguageChangeListener = (newLanguage: string) => void;
const languageChangeListeners: LanguageChangeListener[] = [];

/**
 * Initialize the translation system
 * @param language The language code to use (e.g., 'en', 'es')
 */
export const initTranslations = async (
    language: string = currentLanguage,
): Promise<void> => {
    // If already initializing, return the existing promise
    if (initializationPromise) {
        return initializationPromise;
    }

    // Create a new initialization promise
    initializationPromise = new Promise<void>(async (resolve) => {
        try {
            // Set the current language
            currentLanguage = language;
            // Store in localStorage
            localStorage.setItem('language', language);

            // Fetch translations from the API
            const response = await axios.get('/api/translations');
            translations = response.data;
            isInitialized = true;
            resolve();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Even if there's an error, mark as initialized to avoid repeated errors
            isInitialized = true;
            resolve();
        }
    });

    return initializationPromise;
};

/**
 * Get the translation for a key in the current language
 * @param key The translation key
 * @param fallback Optional fallback text if translation is not found
 * @returns The translated text
 */
export const t = (key: string, fallback?: string): string => {
    // If translations haven't been initialized yet, return fallback or key
    if (!isInitialized) {
        console.warn(
            'Translations not initialized yet. Call initTranslations() first.',
        );
        return fallback || key;
    }

    // If the key exists and the language exists for that key
    if (translations[key] && translations[key][currentLanguage]) {
        return translations[key][currentLanguage];
    }

    // If we have a fallback, use it
    if (fallback) {
        return fallback;
    }

    // Otherwise, return the key itself
    return key;
};

/**
 * Set the current language
 * @param language The language code to use
 */
export const setLanguage = (language: string): void => {
    if (language !== currentLanguage) {
        currentLanguage = language;

        // Store in localStorage
        localStorage.setItem('language', language);

        // Notify all listeners about the language change
        languageChangeListeners.forEach((listener) => listener(language));
    }
};

/**
 * Register a listener for language changes
 * @param listener The function to call when language changes
 */
export const onLanguageChange = (listener: LanguageChangeListener): void => {
    languageChangeListeners.push(listener);
};

/**
 * Remove a language change listener
 * @param listener The listener to remove
 */
export const offLanguageChange = (listener: LanguageChangeListener): void => {
    const index = languageChangeListeners.indexOf(listener);
    if (index !== -1) {
        languageChangeListeners.splice(index, 1);
    }
};

/**
 * Get the current language
 * @returns The current language code
 */
export const getLanguage = (): string => {
    return currentLanguage;
};

/**
 * Check if translations have been initialized
 * @returns True if translations are initialized
 */
export const isTranslationsInitialized = (): boolean => {
    return isInitialized;
};

// Export a default object with all functions
export default {
    t,
    initTranslations,
    setLanguage,
    getLanguage,
    isTranslationsInitialized,
    onLanguageChange,
    offLanguageChange,
    languages,
};
