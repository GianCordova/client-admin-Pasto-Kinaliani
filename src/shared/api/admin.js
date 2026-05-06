import { axiosAdmin } from "./api";

// ================= EMPLEADOS =================
export const getEmpleados = async () => {
    return await axiosAdmin.get("/empleados");
};

export const getEmpleadoById = async (id) => {
    return await axiosAdmin.get(`/empleados/${id}`);
};

export const saveEmpleado = async (data) => {
    // Usamos POST para crear
    return await axiosAdmin.post("/empleados", data);
};

export const updateEmpleado = async (id, data) => {
    // Usamos PUT para actualizar
    return await axiosAdmin.put(`/empleados/${id}`, data);
};

export const activateEmpleado = async (id) => {
    // Coincide con la función activateEmpleado del controlador
    return await axiosAdmin.put(`/empleados/activate/${id}`);
};

export const deactivateEmpleado = async (id) => {
    // Coincide con la función deactivateEmpleado del controlador
    return await axiosAdmin.put(`/empleados/deactivate/${id}`);
};