import { __, useTranslation } from '@/Providers/TranslationProvider';
import { Cliente, Vehiculo } from '@/types/index';
import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface VehiculoListProps {
    vehiculos: Vehiculo[];
    clientes: Cliente[];
}

type FormDataValue = string | number | boolean | File | Blob | null | undefined;

interface VehiculoForm extends Record<string, FormDataValue> {
    marca: string;
    modelo: string;
    color: string;
    placa: string;
    anio: string;
    kilometraje: string;
    cliente_id: string;
}

const VehiculoList: React.FC<VehiculoListProps> = ({ vehiculos, clientes }) => {
    useTranslation();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, put, processing, errors } =
        useForm<VehiculoForm>({
            marca: '',
            modelo: '',
            color: '',
            placa: '',
            anio: '',
            kilometraje: '',
            cliente_id: '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(route('api.vehiculos.update', editingId), {
                onSuccess: () => {
                    closeForm();
                    Swal.fire({
                        title: 'Success',
                        text: __('vehicle.updated'),
                        icon: 'success',
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error',
                        text: __('vehicle.update.error'),
                        icon: 'error',
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                },
            });
        } else {
            post(route('api.vehiculos.store'), {
                onSuccess: () => {
                    closeForm();
                    Swal.fire({
                        title: 'Success',
                        text: __('vehicle.created'),
                        icon: 'success',
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error',
                        text: __('vehicle.create.error'),
                        icon: 'error',
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: __('vehicle.delete.title'),
            text: __('vehicle.delete.confirm'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: __('vehicle.delete.confirm'),
            cancelButtonText: __('vehicle.delete.cancel'),
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('api.vehiculos.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Success',
                            text: __('vehicle.deleted'),
                            icon: 'success',
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Error',
                            text: __('vehicle.delete.error'),
                            icon: 'error',
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    },
                });
            }
        });
    };

    const handleEdit = (vehiculo: Vehiculo) => {
        setShowForm(true);
        setData({
            marca: vehiculo.marca,
            modelo: vehiculo.modelo,
            color: vehiculo.color,
            placa: vehiculo.placa,
            anio: vehiculo.anio.toString(),
            kilometraje: vehiculo.kilometraje.toString(),
            cliente_id: vehiculo.cliente_id.toString(),
        });
        setEditingId(vehiculo.id);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setData({
            marca: '',
            modelo: '',
            color: '',
            placa: '',
            anio: '',
            kilometraje: '',
            cliente_id: '',
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="mb-4 text-2xl font-bold dark:text-gray-100">
                {__('vehicles.management')}
            </h2>

            {showForm ? (
                <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder={__('brand')}
                            value={data.marca}
                            onChange={(e) => setData('marca', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.marca && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.marca}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder={__('model')}
                            value={data.modelo}
                            onChange={(e) => setData('modelo', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.modelo && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.modelo}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder={__('color')}
                            value={data.color}
                            onChange={(e) => setData('color', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.color && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.color}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder={__('plate')}
                            value={data.placa}
                            onChange={(e) => setData('placa', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.placa && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.placa}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder={__('year')}
                            value={data.anio}
                            onChange={(e) => setData('anio', e.target.value)}
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.anio && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.anio}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder={__('kilometers')}
                            value={data.kilometraje}
                            onChange={(e) =>
                                setData('kilometraje', e.target.value)
                            }
                            className="rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        />
                        {errors.kilometraje && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.kilometraje}
                            </div>
                        )}
                    </div>
                    <div>
                        <select
                            value={data.cliente_id}
                            onChange={(e) =>
                                setData('cliente_id', e.target.value)
                            }
                            className="w-100 rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            required
                        >
                            <option value="">{__('select_client')}</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre} - {cliente.dni}
                                </option>
                            ))}
                        </select>
                        {errors.cliente_id && (
                            <div className="text-red-500 dark:text-red-400">
                                {errors.cliente_id}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="mr-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        {editingId ? __('update') : __('create')}{' '}
                        {__('vehicle')}
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
                    {__('create')} {__('vehicle')}
                </button>
            )}

            <div className="overflow-x-auto rounded-md bg-gray-100 dark:bg-gray-700">
                <table className="min-w-full table-auto">
                    <thead className="">
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('brand')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('model')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('color')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('plate')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('year')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('kilometers')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('customer')}
                            </th>
                            <th className="px-4 py-2 dark:text-gray-200">
                                {__('actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.map((vehiculo) => (
                            <tr
                                key={vehiculo.id}
                                className="dark:border-gray-700 dark:bg-gray-800"
                            >
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.marca}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.modelo}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.color}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.placa}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.anio}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.kilometraje}
                                </td>
                                <td className="border px-4 py-2 dark:border-gray-700 dark:text-gray-300">
                                    {vehiculo.cliente
                                        ? vehiculo.cliente.nombre
                                        : 'N/A'}
                                </td>
                                <td className="flex w-full flex-row items-center justify-center border px-4 py-2 dark:border-gray-700">
                                    <button
                                        onClick={() => handleEdit(vehiculo)}
                                        className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                                    >
                                        {__('edit')}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(vehiculo.id)
                                        }
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

export default VehiculoList;
