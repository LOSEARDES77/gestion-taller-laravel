import { useTranslation } from '@/Providers/TranslationProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface LanguageSwitcherProps {
    className?: string;
}

interface LanguageOption {
    value: string;
    label: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
    const { currentLanguage, changeLanguage } = useTranslation();
    const [isChanging, setIsChanging] = useState(false);

    const languages: LanguageOption[] = [
        { value: 'en', label: '🇺🇸 EN' },
        { value: 'es', label: '🇪🇸 ES' },
        { value: 'fr', label: '🇫🇷 FR' },
        { value: 'de', label: '🇩🇪 DE' },
        { value: 'pt', label: '🇵🇹 PT' },
    ];

    const toggleLanguage = async () => {
        try {
            setIsChanging(true);
            // Toggle between English and Spanish
            const newLanguage = currentLanguage === 'en' ? 'es' : 'en';

            await changeLanguage(newLanguage);
            localStorage.setItem('language', newLanguage);
        } catch (error) {
            console.error('LanguageSwitcher: Error changing language:', error);

            Swal.fire({
                title: 'Error',
                text: 'Failed to change language',
                icon: 'error',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } finally {
            setIsChanging(false);
        }
    };

    const switchLanguage = (option: string) => {
        if (!option) return; // Skip if value is undefined

        try {
            setIsChanging(true);
            changeLanguage(option);
            localStorage.setItem('language', option);
        } catch (error) {
            console.error('LanguageSwitcher: Error changing language:', error);
        } finally {
            setIsChanging(false);
        }
    };
    {
        /* <button
            onClick={toggleLanguage}
            disabled={isChanging}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors dark:text-gray-300 ${
                isChanging
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            } ${className}`}
            title={`Switch to ${currentLanguage === 'en' ? 'Spanish' : 'English'}`}
        >
            <span className="mr-2">
                {currentLanguage === 'en' ? '🇺🇸' : '🇪🇸'}
            </span>
            <span>{currentLanguage === 'en' ? 'EN' : 'ES'}</span>
        </button> */
    }
    return (
        <div className={`${className} bg-none`}>
            <select
                disabled={isChanging}
                value={currentLanguage}
                className={`block w-full rounded-md bg-gray-100 shadow-sm dark:bg-gray-700 dark:text-gray-300 sm:text-sm ${isChanging ? 'cursor-not-allowed opacity-50' : ''}`}
                onChange={(e) => switchLanguage(e.target.value)}
            >
                {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
