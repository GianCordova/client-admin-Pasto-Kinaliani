import { useAdminStore } from "../../users/store/adminStore";

export const useSaveEmpleado = () => {
    const createEmpleado = useAdminStore((state) => state.saveEmpleado);
    const updateEmpleado = useAdminStore((state) => state.updateEmpleado);

    const saveEmpleado = async (data, empleadoId = null) => {
        try {
            const empleadoData = {
                name: data.name,
                surname: data.surname,
                dpi: data.dpi,
                puesto: data.puesto,
                sueldo: Number(data.sueldo), 
                status: data.status ?? true
            };

            if (empleadoId) {
                return await updateEmpleado(empleadoId, empleadoData);
            } else {
                return await createEmpleado(empleadoData);
            }
        } catch (error) {
            console.error("Error al procesar el empleado:", error);
            throw error;
        }
    }

    return { saveEmpleado };
}