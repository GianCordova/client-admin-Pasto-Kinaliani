import { useEffect } from "react";
import { useForm } from "react-hook-form";
// 1. IMPORTA EL STORE (Ajusta la ruta si es necesario)
import { useAdminStore } from "../../users/store/adminStore.js";
import { useSaveEmpleado } from "../hooks/useSaveEmpleados";

export const EmpleadosModal = ({ isOpen, onClose, empleado }) => {
    const isEdit = !!empleado;
    const { saveEmpleado } = useSaveEmpleado();

    // 2. AHORA SÍ DEFINIMOS EL STORE
    const { getEmpleados } = useAdminStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isOpen) {
            reset(empleado || { name: "", surname: "", dpi: "", puesto: "MESERO", sueldo: "" });
        }
    }, [isOpen, empleado, reset]);

    const onSubmit = async (data) => {
        try {
            // Ejecutamos la acción (Crear o Editar)
            await saveEmpleado(data, empleado?._id);

            // Refrescamos la lista
            await getEmpleados();

            // ELIMINAMOS EL showApproveToast DE AQUÍ
            // El usuario verá el cambio reflejado directamente en la tabla
            onClose();
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div className={`p-6 text-white ${isEdit ? 'bg-blue-600' : 'bg-orange-500'}`}>
                    <h3 className="text-xl font-bold">{isEdit ? 'Editar Empleado' : 'Nuevo Empleado'}</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                            <input
                                {...register("name", { required: "Campo obligatorio" })}
                                className="w-full p-2.5 border rounded-lg outline-none focus:border-orange-400"
                            />
                            {errors.name && <span className="text-red-500 text-[10px]">{errors.name.message}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase">Apellido</label>
                            <input
                                {...register("surname", { required: "Campo obligatorio" })}
                                className="w-full p-2.5 border rounded-lg outline-none focus:border-orange-400"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase">DPI</label>
                        <input
                            {...register("dpi", { required: "Requerido" })}
                            className="w-full p-2.5 border rounded-lg outline-none focus:border-orange-400"
                        />
                        {errors.dpi && <span className="text-red-500 text-[10px]">{errors.dpi.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase">Puesto</label>
                            <select {...register("puesto")} className="w-full p-2.5 border rounded-lg bg-white outline-none">
                                <option value="MESERO">Mesero</option>
                                <option value="CHEF">Chef</option>
                                <option value="SERVICIO DE LIMPIEZA">Limpieza</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase">Sueldo (Q)</label>
                            <input
                                type="number"
                                {...register("sueldo", { required: "Requerido" })}
                                className="w-full p-2.5 border rounded-lg outline-none focus:border-orange-400"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 text-gray-500 hover:bg-gray-100 rounded-xl">
                            Cancelar
                        </button>
                        <button type="submit" className={`flex-1 py-2.5 text-white font-bold rounded-xl ${isEdit ? 'bg-blue-600' : 'bg-orange-500'}`}>
                            {isEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};