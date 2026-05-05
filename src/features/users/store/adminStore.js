import { create } from "zustand";
import {
    getPedidos as getPedidosRequest,
    createPedido as createPedidoRequest,
    cancelPedido as cancelPedidoRequest,
    completadoPedido as completadoPedidoRequest,
} from "../../../shared/api";

import {
    getReservations as getReservationsRequest,
    createReservation as createReservationRequest,
    getReservationById as getReservationByIdRequest,
    updateReservation as updateReservationRequest,
    confirmReservation as confirmReservationRequest,
    cancelReservation as cancelReservationRequest,
} from "../../../shared/api";

export const usePedidosStore = create((set, get) => ({
    pedidos: [],
    loading: false,
    error: null,

    getPedidos: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getPedidosRequest();

            set({
                pedidos: res.data.pedidos,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener pedidos",
            });
        }
    },

    createPedido: async (data) => {
        try {
            set({ loading: true, error: null });

            const res = await createPedidoRequest(data);

            set({
                pedidos: [res.data.pedido, ...get().pedidos],
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al crear pedido",
            });
        }
    },

    cancelPedido: async (id) => {
        try {
            set({ loading: true });

            await cancelPedidoRequest(id);

            set({
                pedidos: get().pedidos.map((p) =>
                    p._id === id ? { ...p, status: "CANCELADO" } : p
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al cancelar pedido",
            });
        }
    },

    completadoPedido: async (id) => {
        try {
            set({ loading: true });

            await completadoPedidoRequest(id);

            set({
                pedidos: get().pedidos.map((p) =>
                    p._id === id ? { ...p, status: "COMPLETADO" } : p
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al completar pedido",
            });
        }
    },

    getPedidosByStatus: async (status) => {
        try {
            set({ loading: true, error: null });

            // Opcional: validar estado
            const estadosValidos = ["PENDIENTE", "COMPLETADO", "CANCELADO"];
            if (!estadosValidos.includes(status)) {
                set({ loading: false, error: `Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}` });
                return;
            }

            // Llamada a tu API filtrando por status
            const res = await getPedidosRequest(`/status/${status}`);
            // Asegúrate que tu API tenga esta ruta GET /pedidos/status/:status

            set({
                pedidos: res.data.pedidos,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener pedidos por estado",
            });
        }
    },
}));

export const useReservationsStore = create((set, get) => ({
    reservaciones: [],
    loading: false,
    error: null,

    // ================= OBTENER TODAS =================
    getReservations: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getReservationsRequest();

            set({
                reservaciones: res.data.data, // tu API devuelve data
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener reservaciones",
            });
        }
    },

    // ================= CREAR =================
    createReservation: async (data) => {
        try {
            set({ loading: true, error: null });

            const res = await createReservationRequest(data);

            set({
                reservaciones: [res.data.data, ...get().reservaciones],
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al crear reservación",
            });
        }
    },

    // ================= OBTENER POR ID =================
    getReservationById: async (id) => {
        try {
            set({ loading: true, error: null });

            const res = await getReservationByIdRequest(id);

            return res.data.data; // retorna la reservación específica
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener reservación",
            });
        }
    },

    // ================= ACTUALIZAR =================
    updateReservation: async (id, data) => {
        try {
            set({ loading: true, error: null });

            const res = await updateReservationRequest(id, data);

            set({
                reservaciones: get().reservaciones.map((r) =>
                    r._id === id ? res.data.data : r
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al actualizar reservación",
            });
        }
    },

    // ================= CONFIRMAR =================
    confirmReservation: async (id) => {
        try {
            set({ loading: true });

            const res = await confirmReservationRequest(id);

            set({
                reservaciones: get().reservaciones.map((r) =>
                    r._id === id ? res.data.data : r
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al confirmar reservación",
            });
        }
    },

    // ================= CANCELAR =================
    cancelReservation: async (id) => {
        try {
            set({ loading: true });

            const res = await cancelReservationRequest(id);

            set({
                reservaciones: get().reservaciones.map((r) =>
                    r._id === id ? res.data.data : r
                ),
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al cancelar reservación",
            });
        }
    },

    // ================= FILTRAR POR ESTADO =================
    getReservationsByStatus: async (status) => {
        try {
            set({ loading: true, error: null });

            const validStates = ["confirmada", "cancelada", "pendiente"];
            if (!validStates.includes(status.toLowerCase())) {
                set({ loading: false, error: `Estado inválido. Debe ser uno de: ${validStates.join(", ")}` });
                return;
            }

            const res = await getReservationsRequest(`/status/${status}`);
            set({
                reservaciones: res.data.data,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener reservaciones por estado",
            });
        }
    },
}));