import { customSwalClasses, swalPos } from '@/Libs/SwalConfig';
import { __, useTranslation } from '@/Providers/TranslationProvider';
import { Cliente } from '@/types/index';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

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
    useTranslation();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [clientErrors, setClientErrors] = useState<Record<string, string>>(
        {},
    );
    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        clearErrors,
        setError,
    } = useForm<ClienteForm>({
        nombre: '',
        email: '',
        telefono: '',
        dni: '',
    });

    // Clear client errors when form data changes
    useEffect(() => {
        setClientErrors({});
        clearErrors();
    }, [data, clearErrors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic client-side validation before sending to server
        let hasErrors = false;
        const newClientErrors: Record<string, string> = {};

        // Validate name (minimum 3 characters)
        if (data.nombre.length < 3) {
            newClientErrors.nombre = __('client.validation.nombre.min');
            hasErrors = true;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email as string)) {
            newClientErrors.email = __('client.validation.email.format');
            hasErrors = true;
        }

        // Validate phone number (9 digits)
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(data.telefono as string)) {
            newClientErrors.telefono = __('client.validation.telefono.format');
            hasErrors = true;
        }

        // Basic DNI format validation (8 digits + 1 letter)
        const dniRegex = /^[0-9]{8}[a-zA-Z]$/;
        if (!dniRegex.test(data.dni as string)) {
            newClientErrors.dni = __('client.validation.dni.format');
            hasErrors = true;
        } else {
            const dniNumber = data.dni.substring(0, 8);
            const dniLetter = data.dni.substring(8, 9).toUpperCase();
            const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const expectedLetter = validLetters[parseInt(dniNumber) % 23];

            if (dniLetter !== expectedLetter) {
                newClientErrors.dni = __('client.validation.dni.letter');
                hasErrors = true;
            }
        }

        if (hasErrors) {
            // Set client-side errors using the proper Inertia method
            Object.entries(newClientErrors).forEach(([key, value]) => {
                setError(key, value);
            });

            // Also update our local state for client errors
            setClientErrors(newClientErrors);

            Swal.fire({
                title: __('error'),
                text: __('client.validation.errors'),
                icon: 'error',
                toast: true,
                position: swalPos,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: customSwalClasses,
            });

            return;
        }

        if (editingId) {
            put(route('api.clientes.update', editingId), {
                onSuccess: () => {
                    closeForm();
                    Swal.fire({
                        title: __('success'),
                        text: __('client.updated'),
                        icon: 'success',
                        toast: true,
                        position: swalPos,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: customSwalClasses,
                    });
                },
                onError: (errors) => {
                    // Server validation errors will be automatically set to the errors object
                    // Display a general error message
                    Swal.fire({
                        title: __('error'),
                        text: __('client.update.error'),
                        icon: 'error',
                        toast: true,
                        position: swalPos,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: customSwalClasses,
                    });
                },
            });
        } else {
            post(route('api.clientes.store'), {
                onSuccess: () => {
                    closeForm();
                    Swal.fire({
                        title: __('success'),
                        text: __('client.created'),
                        icon: 'success',
                        toast: true,
                        position: swalPos,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: customSwalClasses,
                    });
                },
                onError: (errors) => {
                    // Server validation errors will be automatically set to the errors object
                    // Display a general error message
                    Swal.fire({
                        title: __('error'),
                        text: __('client.create.error'),
                        icon: 'error',
                        toast: true,
                        position: swalPos,
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: customSwalClasses,
                    });
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: __('client.delete.title'),
            text: __('client.delete.confirm'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: __('client.delete.confirm.btn'),
            cancelButtonText: __('client.delete.cancel.btn'),
            customClass: customSwalClasses,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('api.clientes.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: __('success'),
                            text: __('client.deleted'),
                            icon: 'success',
                            toast: true,
                            position: swalPos,
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            customClass: customSwalClasses,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: __('error'),
                            text: __('client.delete.error'),
                            icon: 'error',
                            toast: true,
                            position: swalPos,
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            customClass: customSwalClasses,
                        });
                    },
                });
            }
        });
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
        setClientErrors({});
        clearErrors();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="mb-4 text-2xl font-bold dark:text-gray-100">
                {__('clients.management')}
            </h2>

            {showForm ? (
                <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder={__('name')}
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className={`rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                                errors.nombre ? 'border-red-500' : ''
                            }`}
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
                            placeholder={__('email')}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                                errors.email ? 'border-red-500' : ''
                            }`}
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
                            placeholder={__('phone')}
                            value={data.telefono}
                            onChange={(e) =>
                                setData('telefono', e.target.value)
                            }
                            className={`rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                                errors.telefono ? 'border-red-500' : ''
                            }`}
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
                            placeholder={__('dni')}
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className={`rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${
                                errors.dni ? 'border-red-500' : ''
                            }`}
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
                        {editingId ? __('update') : __('create')} {__('client')}
                    </button>
                    <button
                        onClick={() => closeForm()}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        {__('cancel')}
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-8 space-y-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    {__('create')} {__('client')}
                </button>
            )}

            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full table-auto bg-gray-100 dark:bg-gray-700">
                    <thead>
                        <tr className="dark:bg-gray-700">
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('name')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('email')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('phone')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('dni')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('actions')}
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
                                        {__('edit')}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cliente.id)}
                                        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        {__('delete')}
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
