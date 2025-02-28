import { Cliente } from '@/types';
import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface ClienteListProps {
    clientes: Cliente[];
}

type FormDataValue = string | number | boolean | File | Blob | null | undefined;

interface ClienteForm extends Record<string, FormDataValue> {
    nombre: string;
    email: string;
    telefono: string;
    dni: string;
}

const ClienteList: React.FC<ClienteListProps> = ({ clientes }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, put, processing, errors } =
        useForm<ClienteForm>({
            nombre: '',
            email: '',
            telefono: '',
            dni: '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(route('api.clientes.update', editingId), {
                onSuccess: () => {
                    closeForm();
                },
            });
        } else {
            post(route('api.clientes.store'), {
                onSuccess: () => {
                    closeForm();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
            router.delete(route('api.clientes.destroy', id));
        }
    };

    const handleEdit = (cliente: Cliente) => {
        setShowForm(true);
        setData({
            nombre: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono,
            dni: cliente.dni,
        });
        setEditingId(cliente.id);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setData({
            nombre: '',
            email: '',
            telefono: '',
            dni: '',
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="mb-4 text-2xl font-bold dark:text-gray-100">
                Gestión de Clientes
            </h2>

            {showForm ? (
                <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.nombre && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.nombre}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.email && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder="Teléfono"
                            value={data.telefono}
                            onChange={(e) =>
                                setData('telefono', e.target.value)
                            }
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.telefono && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.telefono}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="DNI"
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.dni && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.dni}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        {editingId ? 'Actualizar' : 'Crear'} Cliente
                    </button>
                    <button
                        onClick={() => closeForm()}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Cancelar
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-8 space-y-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Crear Cliente
                </button>
            )}

            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full table-auto bg-gray-100 dark:bg-gray-700">
                    <thead>
                        <tr className="dark:bg-gray-700">
                            <th className="px-4 py-2 dark:text-gray-200">
                                Nombre
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                Email
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                Teléfono
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                DNI
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr
                                key={cliente.id}
                                className="dark:border-gray-700 dark:bg-gray-800"
                            >
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {cliente.nombre}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {cliente.email}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {cliente.telefono}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {cliente.dni}
                                </td>
                                <td className="flex w-full flex-row items-center justify-center border px-4 py-2 dark:border-gray-700">
                                    <button
                                        onClick={() => handleEdit(cliente)}
                                        className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cliente.id)}
                                        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClienteList;
