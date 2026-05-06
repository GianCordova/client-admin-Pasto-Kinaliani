import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../../auth/components/Spinner";
import { usePlatillosStore } from "../../usuarios/store/adminStore";
import { useSavePlatillo } from "../hooks/useSavePlatillo"
import { showSuccess, showError } from "../../../shared/utils/toast";

export const PlatillosForm = ({ isOpen, onClose, platillo }) => {

    //Formulario
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const { savePlatillo } = useSavePlatillo();
    const loading = usePlatillosStore((state) => state.loading);

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (platillo) {
                reset({
                    nombre: platillo.nombre,
                    descripcion: platillo.descripcion,
                    precio: platillo.precio,
                    categoria: platillo.categoria,
                    isActive: platillo.isActive,
                });
                setPreview(`https://res.cloudinary.com/dzvyh0ywj/image/upload/${platillo.photo}`);
            } else {
                reset({
                    nombre: "",
                    descripcion: "",
                    precio: "",
                    categoria: "",
                    isActive: true,
                });
                setPreview(null);
            }
        }
    }, [isOpen, platillo, reset]);

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
            await savePlatillo(data, platillo?._id);
            showSuccess(
                platillo
                    ? "Platillo actualizado correctamente"
                    : "Platillo creado correctamente"
            );
            reset();
            setPreview(null);
            onClose();
        } catch (error) {
            showError("Error al guardar el platillo");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-In">

                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {platillo ? 'Editar Platillo' : 'Nuevo Platillo'}
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
                    <div className="space-y-4">

                        {/* PREVIEW & FILE INPUT */}
                        <div className="flex flex-col items-center justify-center gap-4 mb-4">
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
                            <div className="w-full max-w-xs">
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Fotografía (Opcional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("photo")}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Fila: Nombre del Platillo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Platillo</label>
                            <input
                                {...register('nombre', { required: 'El nombre es requerido' })}
                                type="text"
                                placeholder="Ej. Pizza Margarita"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                            />
                            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
                        </div>

                        {/* Campo: Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                {...register('descripcion', { required: 'La descripción es requerida' })}
                                rows="3"
                                placeholder="Detalles de los ingredientes..."
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Fila: Precio y Categoría */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (Q)</label>
                                <input
                                    {...register('precio', { required: 'El precio es requerido' })}
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                <input
                                    {...register('categoria', { required: 'La categoría es requerida' })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
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
                            className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {platillo ? 'Guardar Cambios' : 'Crear Platillo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlatillosForm;