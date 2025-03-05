import { useTranslation } from '@/Providers/TranslationProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface LanguageSwitcherProps {
    className?: string;
}

export default function LanguageSwitcher({
    className = '',
}: LanguageSwitcherProps) {
    const { currentLanguage, changeLanguage } = useTranslation();
    const [isChanging, setIsChanging] = useState(false);

    const toggleLanguage = async () => {
        try {
            setIsChanging(true);

            // Toggle between English and Spanish
            const newLanguage = currentLanguage === 'en' ? 'es' : 'en';

            await changeLanguage(newLanguage);
            localStorage.setItem('language', newLanguage);

            // Show notification after language change
            Swal.fire({
                title:
                    newLanguage === 'en'
                        ? 'Language changed to English'
                        : 'Idioma cambiado a Español',
                icon: 'success',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error('LanguageSwitcher: Error changing language:', error);

            // Show error notification
            Swal.fire({
                title: 'Error changing language',
                icon: 'error',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setIsChanging(false);
        }
    };

    return (
        <button
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
        </button>
    );
}
