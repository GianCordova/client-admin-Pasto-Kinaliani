import { create } from "zustand";
import {
    getInventarios as getInventariosRequest,
    getInventarioById as getInventarioByIdRequest,
    createInventario as createInventarioRequest,
    updateInventario as updateInventarioRequest,
    activarInventario as activarInventarioRequest,
    desactivarInventario as desactivarInventarioRequest,
} from "../../../shared/api";

export const useInventarioStore = create((set, get) => ({
    inventarios: [],
    loading: false,
    error: null,

    getInventarios: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getInventariosRequest();

            set({
                inventarios: res.data.inventarios,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener inventario",
            });
        }
    },

    getInventarioById: async (id) => {
        try {
            set({ loading: true, error: null });

            const res = await getInventarioByIdRequest(id);

            set({
                loading: false,
            });

            return res.data.inventario;
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener inventario",
            });
        }
    },

    createInventario: async (data) => {
        try {
            set({ loading: true, error: null });

            const res = await createInventarioRequest(data);

            set({
                inventarios: [res.data.inventario, ...get().inventarios],
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al crear inventario",
            });
        }
    },

    updateInventario: async (id, data) => {
        try {
            set({ loading: true, error: null });

            const res = await updateInventarioRequest(id, data);

            set({
                inventarios: get().inventarios.map((inv) =>
                    inv._id === id ? res.data.inventario : inv
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al actualizar inventario",
            });
        }
    },

    activarInventario: async (id) => {
        try {
            set({ loading: true });

            await activarInventarioRequest(id);

            set({
                inventarios: get().inventarios.map((inv) =>
                    inv._id === id ? { ...inv, estado: "disponible" } : inv
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al activar inventario",
            });
        }
    },

    desactivarInventario: async (id) => {
        try {
            set({ loading: true });

            await desactivarInventarioRequest(id);

            set({
                inventarios: get().inventarios.map((inv) =>
                    inv._id === id ? { ...inv, estado: "agotado" } : inv
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al desactivar inventario",
            });
        }
    },
}));