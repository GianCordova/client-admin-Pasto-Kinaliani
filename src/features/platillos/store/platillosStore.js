import { create } from "zustand";
import {
    getPlatillos as getPlatillosRequest,
    createPlatillo as createPlatilloRequest,
    updatePlatillo as _updatePlatilloRequest,
    togglePlatilloStatus as _togglePlatilloStatusRequest,
} from "../../../shared/api";

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