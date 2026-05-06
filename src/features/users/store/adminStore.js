import { create } from "zustand";
import {
    getEmpleados as getEmpleadosRequest,
    saveEmpleado as saveEmpleadoRequest,
    updateEmpleado as updateEmpleadoRequest,
    activateEmpleado as activateRequest,
    deactivateEmpleado as deactivateRequest
} from "../../../shared/api"; // Ajusta la ruta

export const useAdminStore = create((set, get) => ({
    empleados: [],
    loading: false,
    error: null,

    getEmpleados: async () => {
        try {
            set({ loading: true, error: null });
            const res = await getEmpleadosRequest();
            set({
                empleados: res.data.empleados,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener empleados",
            });
        }
    },

    saveEmpleado: async (data) => {
        try {
            set({ loading: true });
            const res = await saveEmpleadoRequest(data);
            set({
                empleados: [res.data.empleado, ...get().empleados],
                loading: false,
            });
            return res.data;
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message });
            throw err;
        }
    },

    updateEmpleado: async (id, data) => {
        try {
            set({ loading: true });
            const res = await updateEmpleadoRequest(id, data);
            set({
                empleados: get().empleados.map((e) =>
                    e._id === id ? res.data.empleado : e
                ),
                loading: false,
            });
            return res.data;
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message });
            throw err;
        }
    },

    activateEmpleado: async (id) => {
        try {
            set({ loading: true });
            const res = await activateRequest(id);
            // Usamos res.data.empleado si el backend devuelve el objeto completo
            set((state) => ({
                empleados: state.empleados.map((e) =>
                    e._id === id ? { ...e, status: true } : e
                ),
                loading: false,
            }));
            return res.data;
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message });
        }
    },

    deactivateEmpleado: async (id) => {
        try {
            set({ loading: true });
            const res = await deactivateRequest(id);
            set((state) => ({
                empleados: state.empleados.map((e) =>
                    e._id === id ? { ...e, status: false } : e
                ),
                loading: false,
            }));
            return res.data;
        } catch (err) {
            set({ loading: false, error: err.response?.data?.message });
        }
    },
}));