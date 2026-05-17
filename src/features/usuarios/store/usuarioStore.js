import { create } from "zustand";
import {
    getUsuarios as getUsuariosRequest,
} from "../../../shared/api";


export const useUsuarioStore = create((set, get) => ({
    usuarios: [],
    loading: false,
    error: null,

    getUsuarios: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getUsuariosRequest();

            set({
                usuarios: res.data.usuarios,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener usuarios",
            });
        }
    },
}));