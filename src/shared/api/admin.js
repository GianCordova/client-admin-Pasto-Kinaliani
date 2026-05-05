import { axiosAdmin } from "./api";

// ================= EMPLOYEES =================
export const getEmployees = async () => {
    return await axiosAdmin.get("/empleados"); // GET all activos
};

export const getEmployeeById = async (id) => {
    return await axiosAdmin.get(`/empleados/${id}`);
};

export const createEmployee = async (data) => {
    return await axiosAdmin.post("/empleados", data);
};

export const updateEmployee = async (id, data) => {
    return await axiosAdmin.put(`/empleados/${id}`, data);
};

export const activateEmployee = async (id) => {
    return await axiosAdmin.put(`/empleados/${id}/activate`);
};

export const deactivateEmployee = async (id) => {
    return await axiosAdmin.put(`/empleados/${id}/deactivate`);
};