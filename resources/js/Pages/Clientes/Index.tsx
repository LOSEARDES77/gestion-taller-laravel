import ClienteList from '@/Components/db-views/ClienteList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { __, useTranslation } from '@/Providers/TranslationProvider';
import { Cliente, PageProps } from '@/types';
import React from 'react';

interface Props extends Record<string, unknown> {
    clientes: Cliente[];
}

const Index: React.FC<PageProps<Props>> = ({ auth, clientes }) => {
    useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {__('clients.title')}
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:border dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ClienteList clientes={clientes} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
