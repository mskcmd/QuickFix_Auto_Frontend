import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Header from '../../Components/Mechanic/Heder';

interface Notification {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    time: string;
}

const notifications: Notification[] = [
    { id: 1, type: 'success', message: 'Your profile has been updated successfully!', time: '2 minutes ago' },
    { id: 2, type: 'error', message: 'Failed to upload image. Please try again.', time: '10 minutes ago' },
    { id: 3, type: 'info', message: 'New feature available: Dark mode', time: '1 hour ago' },
    { id: 4, type: 'warning', message: 'Your password will expire soon.', time: '1 day ago' },
];

const NotificationPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-hidden">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {notifications.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { type, message, time } = notification;

    const iconColor = {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-blue-500',
        warning: 'text-yellow-500',
    }[type];

    const Icon = {
        success: CheckCircleIcon,
        error: ExclamationCircleIcon,
        info: InformationCircleIcon,
        warning: XCircleIcon,
    }[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
        >
            <div className={`flex-shrink-0 ${iconColor}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{message}</p>
                <p className="mt-1 text-sm text-gray-500">{time}</p>
            </div>
        </motion.div>
    );
};

export default NotificationPage;
