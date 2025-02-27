import ClienteList from '@/Components/ClienteList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Cliente, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

interface Props extends Record<string, unknown> {
    clientes: Cliente[];
}

const Index: React.FC<PageProps<Props>> = ({ auth, clientes }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Clientes
                </h2>
            }
        >
            <Head title="Clientes" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:border dark:border-gray-700 dark:bg-gray-800">
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
