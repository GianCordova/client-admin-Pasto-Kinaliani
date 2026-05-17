import { create } from "zustand";

import {
    getVentas as getVentasRequest,
    getVentaById as getVentaByIdRequest,
    getVentasBySucursal as getVentasBySucursalRequest
} from "../../../shared/api";

export const useVentasStore = create((set) => ({
    ventas: [],
    loading: false,
    error: null,

    getVentas: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getVentasRequest();

            set({
                ventas: res.data.data,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener ventas",
            });
        }
    },

    getVentaById: async (id) => {
        try {
            set({ loading: true, error: null });

            const res = await getVentaByIdRequest(id);

            set({ loading: false });

            return res.data.venta;
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener venta",
            });
        }
    },

    getVentasBySucursal: async (idSucursal) => {
        try {
            set({ loading: true, error: null });

            const res = await getVentasBySucursalRequest(idSucursal);

            set({
                ventas: res.data.ventas,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error:
                    err.response?.data?.message ||
                    "Error al obtener ventas por sucursal",
            });
        }
    },
}));