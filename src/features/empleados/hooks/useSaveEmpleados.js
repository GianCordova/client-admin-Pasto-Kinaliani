import { useEmpleadosStore } from "../../users/store/adminStore"; // o donde esté tu store de empleados

export const useSaveEmployee = () => {
    // Recuperación de funciones del store
    const createEmployee = useEmpleadosStore((state) => state.createEmployee);
    const updateEmployee = useEmpleadosStore((state) => state.updateEmployee);

    const saveEmployee = async (data, employeeId = null) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("dpi", data.dpi);
        formData.append("puesto", data.puesto);
        formData.append("sueldo", data.sueldo);
        formData.append("status", data.status ?? true); // opcional, por defecto true

        if (employeeId) {
            await updateEmployee(employeeId, formData);
        } else {
            await createEmployee(formData);
        }
    };

    return { saveEmployee };
};