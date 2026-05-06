import { create } from "zustand";
import {
    getSucursales as getSucursalesRequest,
    createSucursal as createSucursalRequest,
    updateSucursal as _updateSucursalRequest,
    toggleSucursalStatus as _toggleSucursalStatusRequest,
    getPlatillos as getPlatillosRequest,
    createPlatillo as createPlatilloRequest,
    updatePlatillo as _updatePlatilloRequest,
    togglePlatilloStatus as _togglePlatilloStatusRequest,
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

    updateSucursal: async (formData, id) => {
        try {
            set({ loading: true, error: null });
            const response = await _updateSucursalRequest(id, formData);
            set({
                sucursales: get().sucursales.map((sucursal) =>
                    sucursal._id === id ? response.data.data : sucursal
                ),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al actualizar sucursal",
            });
        }
    },

    toggleSucursalStatus: async (id, isActive) => {
        try {
            set({ loading: true, error: null });
            const response = await _toggleSucursalStatusRequest(id, isActive);
            set({
                sucursales: get().sucursales.map((sucursal) =>
                    sucursal._id === id ? response.data.data : sucursal
                ),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al cambiar estado de la sucursal",
            });
        }
    },
}));

export const usePlatillosStore = create((set, get) => ({
    platillos: [],
    loading: false,
    error: null,

    getPlatillos: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getPlatillosRequest();
            set({
                platillos: response.data.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener platillos",
                loading: false,
            });
        }
    },

    createPlatillo: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createPlatilloRequest(formData);
            set({
                platillos: [response.data.data, ...get().platillos],
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear platillo",
            });
        }
    },

    updatePlatillo: async (formData, id) => {
        try {
            set({ loading: true, error: null });
            const response = await _updatePlatilloRequest(id, formData);
            set({
                platillos: get().platillos.map((platillo) =>
                    platillo._id === id ? response.data.data : platillo
                ),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al actualizar platillo",
            });
        }
    },

    togglePlatilloStatus: async (id, isActive) => {
        try {
            set({ loading: true, error: null });
            const response = await _togglePlatilloStatusRequest(id, isActive);
            set({
                platillos: get().platillos.map((platillo) =>
                    platillo._id === id ? response.data.data : platillo
                ),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al cambiar estado del platillo",
            });
        }
    },
}));
