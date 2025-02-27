import VehiculoList from '@/Components/VehiculoList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Cliente, PageProps, Vehiculo } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

interface Props extends Record<string, any> {
    vehiculos: Vehiculo[];
    clientes: Cliente[];
}

const Index: React.FC<PageProps<Props>> = ({ auth, vehiculos, clientes }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Vehículos
                </h2>
            }
        >
            <Head title="Vehículos" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <VehiculoList
                                vehiculos={vehiculos}
                                clientes={clientes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
