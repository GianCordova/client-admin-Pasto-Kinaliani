import { create } from "zustand";
import {
    getMesas as getMesasRequest,
    createMesa as createMesaRequest,
    updateMesa as _updateMesaRequest,
    deactivateMesa as _deactivateMesaRequest,
} from "../../../shared/api";

export const useMesasStore = create((set, get) => ({
    mesas: [],
    loading: false,
    error: null,

    getMesas: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getMesasRequest();
            set({
                mesas: response.data.mesas || response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener mesas",
                loading: false,
            });
        }
    },

    createMesa: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createMesaRequest(formData);
            const newMesa = response.data.mesa || response.data.data || response.data;
            set({
                mesas: [newMesa, ...get().mesas],
                loading: false,
            });
            return newMesa;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear mesa",
            });
            throw error;
        }
    },

    updateMesa: async (formData, id) => {
        try {
            set({ loading: true, error: null });
            const response = await _updateMesaRequest(id, formData);
            const updatedMesa = response.data.mesa || response.data.data || response.data;
            set({
                mesas: get().mesas.map((mesa) =>
                    mesa._id === id ? updatedMesa : mesa
                ),
                loading: false,
            });
            return updatedMesa;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al actualizar mesa",
            });
            throw error;
        }
    },

    deactivateMesa: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await _deactivateMesaRequest(id);
            const deactivatedMesa = response.data.mesa || response.data.data || response.data;
            set({
                mesas: get().mesas.map((mesa) =>
                    mesa._id === id ? deactivatedMesa : mesa
                ),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al cambiar estado de la mesa",
            });
            throw error;
        }
    },
}));
