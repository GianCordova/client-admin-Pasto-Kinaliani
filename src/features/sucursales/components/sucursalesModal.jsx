import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Spinner } from '../../auth/components/Spinner';
import { useSucursalesStore } from '../../usuarios/store/adminStore';
import { useSaveSucursal } from '../hooks/useSaveSucursal';
import { showSuccess, showError } from '../../../shared/utils/toast';

export const SucursalesModal = ({ isOpen, onClose, sucursal }) => {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },

    } = useForm();

    const { saveSucursal } = useSaveSucursal();
    const loading = useSucursalesStore((state) => state.loading);

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (sucursal) {
                reset({
                    nombre: sucursal.nombre,
                    direccion: sucursal.direccion,
                    telefono: sucursal.telefono,
                    horario: sucursal.horario,
                })
                setPreview(sucursal.photo)
            } else {
                reset({
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    horario: {
                        apertura: '',
                        cierre: '',
                    },
                })
                setPreview(null);
            }
        }
    }, [isOpen, sucursal, reset]);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == "photo" && value.photo && value.photo.length > 0) {
                setPreview(URL.createObjectURL(value.photo[0]));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data) => {
        try {
            await saveSucursal(data, sucursal?._id);
            showSuccess(
                sucursal
                    ? "Sucursal actualizada correctamente"
                    : "Sucursal creada correctamente"
            );
            reset();
            setPreview(null);
            onClose();
        } catch (error) {
            showError("Error al guardar la sucursal");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-In">
                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {sucursal ? 'Editar Sucursal' : 'Nueva Sucursal'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">

                    {/* PREVIEW */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner">
                            <span className="text-gray-400 text-xs sm:text-sm">
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-xs sm:text-sm">
                                        Sin foto
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Sucursal</label>
                            <input
                                type="text"
                                {...register("nombre", {
                                    required: "El nombre es requerido",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres",
                                    },
                                })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Ej. Express Zona 10"
                            />
                            {errors.nombre && (
                                <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                            <input
                                type="text"
                                {...register("direccion", {
                                    required: "La dirección es requerida",
                                    minLength: {
                                        value: 3,
                                        message: "La dirección debe tener al menos 3 caracteres",
                                    },
                                })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Dirección completa"
                            />
                            {errors.direccion && (
                                <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                            <input
                                type="text"
                                {...register("telefono", {
                                    required: "El teléfono es requerido",
                                    minLength: {
                                        value: 3,
                                        message: "El teléfono debe tener al menos 3 caracteres",
                                    },
                                })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Ej. +502 2233-4455"
                            />
                            {errors.telefono && (
                                <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horario Apertura</label>
                                <input
                                    type="time"
                                    {...register("horario.apertura", {
                                        required: "La hora de apertura es requerida",
                                    })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                                {errors.horario?.apertura && (
                                    <p className="text-red-500 text-xs mt-1">{errors.horario.apertura.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horario Cierre</label>
                                <input
                                    type="time"
                                    {...register("horario.cierre", {
                                        required: "La hora de cierre es requerida",
                                    })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                                {errors.horario?.cierre && (
                                    <p className="text-red-500 text-xs mt-1">{errors.horario.cierre.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-orange-400 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {sucursal ? 'Guardar Cambios' : 'Crear Sucursal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SucursalesModal;
