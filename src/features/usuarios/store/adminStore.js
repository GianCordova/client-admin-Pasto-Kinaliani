import { create } from "zustand";
import {
    getSucursales as getSucursalesRequest,
    createSucursal as createSucursalRequest,
    updateSucursal as _updateSucursalRequest,
    deleteSucursal as _deleteSucursalRequest,
} from "../../../shared/api";

export const useSucursalesStore = create((set, get) => ({
    sucursales: [],
    loading: false,
    error: null,

    getSucursales: async () => {
        try {
            set({ loading: true, error: null });

            const response = await getSucursalesRequest();

            set({
                sucursales: response.data.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener sucursales",
                loading: false,
            });
        }
    },

    createSucursal: async (formData) => {
        try {
            set({ loading: true, error: null });

            const response = await createSucursalRequest(formData);

            set({
                sucursales: [response.data.data, ...get().sucursales],
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear sucursal",
            });
        }
    },
}));