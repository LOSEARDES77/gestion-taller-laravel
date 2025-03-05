interface LoadingScreenProps {
    message?: string;
}

export default function LoadingScreen({
    message = 'Loading...',
}: LoadingScreenProps) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <div className="mb-4 flex justify-center">
                    <svg
                        className="h-12 w-12 animate-spin text-gray-800 dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {message}
                </p>
            </div>
        </div>
    );
}
