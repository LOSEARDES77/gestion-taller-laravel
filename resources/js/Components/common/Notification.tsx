import { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
    onClose?: () => void;
}

export default function Notification({
    message,
    type = 'info',
    duration = 3000,
    onClose,
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
                onClose();
            }
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    if (!isVisible) {
        return null;
    }

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    }[type];

    return (
        <div className="animate-fade-in fixed bottom-4 right-4 z-50 flex max-w-md items-center rounded-lg p-4 text-white shadow-lg">
            <div className={`${bgColor} rounded-lg p-4`}>
                <div className="flex items-center">
                    {type === 'success' && (
                        <svg
                            className="mr-2 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    )}
                    {type === 'error' && (
                        <svg
                            className="mr-2 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    )}
                    {type === 'info' && (
                        <svg
                            className="mr-2 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    )}
                    {type === 'warning' && (
                        <svg
                            className="mr-2 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                        </svg>
                    )}
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
}

// Notification manager to handle multiple notifications
interface NotificationItem {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const addNotification = (
        message: string,
        type: 'success' | 'error' | 'info' | 'warning' = 'info',
    ) => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { id, message, type }]);
        return id;
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id),
        );
    };

    const NotificationsContainer = () => (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );

    return {
        addNotification,
        removeNotification,
        NotificationsContainer,
    };
}
