import { __ } from '@/Providers/TranslationProvider';
import { ReactNode } from 'react';

interface TranslatedTextProps {
    translationKey: string;
    fallback?: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    children?: ReactNode;
}

/**
 * A component that renders translated text and automatically re-renders when the language changes
 */
export default function TranslatedText({
    translationKey,
    fallback,
    className = '',
    as: Component = 'span',
    children,
}: TranslatedTextProps) {
    // The __ function will automatically trigger re-renders when language changes
    const translatedText = __(translationKey, fallback);

    return (
        <Component className={className}>
            {translatedText}
            {children}
        </Component>
    );
}
