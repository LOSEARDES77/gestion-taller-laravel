import { customSwalClasses, swalPos } from '@/Libs/SwalConfig';
import { getLanguage, languages, setLanguage } from '@/Libs/translations';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface LanguageSwitcherProps {
    className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
    const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
    const [isChanging, setIsChanging] = useState(false);

    const switchLanguage = async (lang: string) => {
        if (!lang) return;

        try {
            setIsChanging(true);
            setLanguage(lang);
            setCurrentLanguage(lang);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to change language',
                icon: 'error',
                toast: true,
                position: swalPos,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: customSwalClasses,
            });
        } finally {
            setIsChanging(false);
        }
    };

    return (
        <div className={`${className} bg-none`}>
            <select
                disabled={isChanging}
                value={currentLanguage}
                className={`block w-full rounded-md bg-gray-100 shadow-sm dark:bg-gray-700 dark:text-gray-300 sm:text-sm ${
                    isChanging ? 'cursor-not-allowed opacity-50' : ''
                }`}
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
