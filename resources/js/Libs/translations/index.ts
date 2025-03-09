import { LanguageOption, Translations } from '@/types';
import axios from 'axios';

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

let translations: Translations = {};
let currentLanguage: string = localStorage.getItem('language') || 'en';
let isInitialized = false;

type LanguageChangeListener = (newLanguage: string) => void;
const listeners: LanguageChangeListener[] = [];

export const onLanguageChange = (
    listener: LanguageChangeListener,
): (() => void) => {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

export const initTranslations = async (): Promise<void> => {
    if (isInitialized) return;

    try {
        const response = await axios.get('/api/translations');
        translations = response.data;
        isInitialized = true;
    } catch (error) {
        console.error('Failed to load translations:', error);
        isInitialized = true;
    }
};

export const __ = (key: string, fallback?: string): string => {
    if (!isInitialized) {
        return fallback || key;
    }

    return translations[key]?.[currentLanguage] || fallback || key;
};

export const setLanguage = (language: string): void => {
    if (supportedLanguages.includes(language)) {
        currentLanguage = language;
        localStorage.setItem('language', language);
        listeners.forEach((listener) => listener(language));
    }
};

export const getLanguage = (): string => currentLanguage;
export const supportedLanguages = languages.map((lang) => lang.value);
