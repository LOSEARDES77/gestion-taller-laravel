import LoadingScreen from '@/Components/common/LoadingScreen';
import {
    initTranslations,
    onLanguageChange,
    __ as translate,
} from '@/Libs/translations';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface TranslationContextType {
    translate: (key: string, fallback?: string) => string;
    isLoaded: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
    undefined,
);

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [, setLanguage] = useState(''); // Used to force rerenders

    useEffect(() => {
        initTranslations().then(() => setIsLoaded(true));

        return onLanguageChange((newLang) => {
            setLanguage(newLang); // Force rerender
        });
    }, []);

    const value = {
        translate: __,
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

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (!context) {
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
    return translate(key, fallback);
};
