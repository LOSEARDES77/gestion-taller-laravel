import LoadingScreen from '@/Components/common/LoadingScreen';
import {
    getLanguage,
    initTranslations,
    languages,
    offLanguageChange,
    onLanguageChange,
    setLanguage,
    t,
} from '@/Libs/translations';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

// Create context
interface TranslationContextType {
    translate: (key: string, fallback?: string) => string;
    currentLanguage: string;
    changeLanguage: (lang: string) => Promise<void>;
    isLoaded: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
    undefined,
);

// Provider component
interface TranslationProviderProps {
    children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
    // Add a state variable to force re-renders when translations change
    const [translationVersion, setTranslationVersion] = useState(0);

    // Handle language changes from external sources
    useEffect(() => {
        const handleLanguageChange = (newLanguage: string) => {
            setCurrentLanguage(newLanguage);
            setTranslationVersion((prev) => prev + 1);
        };

        // Register the listener
        onLanguageChange(handleLanguageChange);

        // Clean up
        return () => {
            offLanguageChange(handleLanguageChange);
        };
    }, []);

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                // Get language from localStorage or browser preference
                const browserLang = navigator.language.split('-')[0];
                const language =
                    localStorage.getItem('language') ??
                    (languages.map((lang) => lang.value).includes(browserLang)
                        ? browserLang
                        : 'en');

                // Initialize translations
                await initTranslations(language);
                setCurrentLanguage(language);
                localStorage.setItem('language', language);
                setIsLoaded(true);
            } catch (error) {
                console.error(
                    'TranslationProvider: Failed to load translations:',
                    error,
                );
                // Even if there's an error, we should show the app
                setIsLoaded(true);
            }
        };

        loadTranslations();
    }, []);

    const changeLanguage = useCallback(
        async (lang: string): Promise<void> => {
            // Set the language in the translations library
            setLanguage(lang);
            // Update our state
            setCurrentLanguage(lang);
            // Store in localStorage
            localStorage.setItem('language', lang);
            // Increment the version to force re-renders
            setTranslationVersion((prev) => prev + 1);
        },
        [translationVersion],
    );

    // Create a new translate function on each translationVersion change
    // This ensures components using this function will re-render
    const translate = useCallback(
        (key: string, fallback?: string): string => {
            return t(key, fallback);
        },
        [translationVersion, currentLanguage],
    );

    const value = {
        translate,
        currentLanguage,
        changeLanguage,
        isLoaded,
    };

    if (!isLoaded) {
        return <LoadingScreen message="Loading translations..." />;
    }

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
}

// Hook for using the translation context
export function useTranslation() {
    const context = useContext(TranslationContext) as TranslationContextType;
    if (context === undefined) {
        throw new Error(
            'useTranslation must be used within a TranslationProvider',
        );
    }
    return context;
}

// Shorthand translation function that will trigger re-renders
// when the language changes
export const __ = (key: string, fallback?: string) => {
    // We can't use hooks here, so we'll use the direct t function
    return t(key, fallback);
};
