import { create } from "zustand";
import {
    getPedidos as getPedidosRequest,
    createPedido as createPedidoRequest,
    cancelPedido as cancelPedidoRequest,
    completadoPedido as completadoPedidoRequest,
    getPedidosByStatus as getPedidosByStatusRequest,
    getPedidosBySucursal as getPedidosBySucursalRequest,
    getPedidosByUsuario as getPedidosByUsuarioRequest
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

            set({
                loading: true,
                error: null
            });

            const estadosValidos = [
                "PENDIENTE",
                "COMPLETADO",
                "CANCELADO"
            ];

            if (
                status &&
                !estadosValidos.includes(status)
            ) {

                set({
                    loading: false,
                    error: "Estado inválido"
                });

                return;
            }

            let res;

        
            if (!status) {

                res = await getPedidosRequest();

            } else {
                res = await getPedidosByStatusRequest(status);
            }

            set({
                pedidos: res.data.pedidos,
                loading: false
            });

        } catch (err) {

            console.log(err);

            set({
                loading: false,
                error:
                    err.response?.data?.message ||
                    "Error al obtener pedidos por estado"
            });
        }
    },
    getPedidosBySucursal: async (sucursalId) => {

        try {

            set({
                loading: true,
                error: null
            });

            const res = await getPedidosBySucursalRequest(sucursalId);

            set({
                pedidos: res.data.pedidos,
                loading: false
            });

        } catch (err) {

            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener pedidos por sucursal"
            });
        }
    },
    
    getPedidosByUsuario: async (usuarioId) => {

        try {

            set({
                loading: true,
                error: null
            });

            const res = await getPedidosByUsuarioRequest(usuarioId);

            set({
                pedidos: res.data.pedidos,
                loading: false
            });

        } catch (err) {

            set({
                loading: false,
                error: err.response?.data?.message || "Error al obtener pedidos por usuario"
            });
        }
    }

}));