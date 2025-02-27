import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <article className="prose dark:prose-invert mb-4">
                                <h4 className="mb-4 text-2xl font-semibold">
                                    Bienvenido {auth.user.name}!
                                </h4>
                                <p className="w-full">
                                    Esta pagina es un ejemplo del poder de
                                    Laravel para Manejar una base de datos
                                    simple. Puedes crear, ver, editar y eliminar
                                    clientes. Todo desde una simple interfaz.
                                    Este ejemplo usa una Base de datos de un
                                    taller en el que guardamos Clientes y
                                    Vehiculos. Y cada Vehiculo esta asignado a
                                    un Cliente.
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
