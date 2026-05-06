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

import {
    getEmpleados as getEmpleadosRequest,
    saveEmpleado as saveEmpleadoRequest,
    updateEmpleado as updateEmpleadoRequest,
    activateEmpleado as activateRequest,
    deactivateEmpleado as deactivateRequest,
    getUsuarios as getUsuariosRequest
} from "../../../shared/api"; // Ajusta la ruta

import {
    getInventarios as getInventariosRequest,
    getInventarioById as getInventarioByIdRequest,
    createInventario as createInventarioRequest,
    updateInventario as updateInventarioRequest,
    activarInventario as activarInventarioRequest,
    desactivarInventario as desactivarInventarioRequest,
} from "../../../shared/api";

import {
    getVentas as getVentasRequest,
    getVentaById as getVentaByIdRequest,
    getVentasBySucursal as getVentasBySucursalRequest
} from "../../../shared/api";



/* =========================
        PEDIDOS STORE
========================= */
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

            const estadosValidos = ["PENDIENTE", "COMPLETADO", "CANCELADO"];

            if (!estadosValidos.includes(status)) {
                set({
                    loading: false,
                    error: `Estado inválido. Debe ser: ${estadosValidos.join(", ")}`,
                });
                return;
            }

            const res = await getPedidosRequest(`/status/${status}`);

            set({
                pedidos: res.data.pedidos,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error:
                    err.response?.data?.message ||
                    "Error al obtener pedidos por estado",
            });
        }
    },
}));

/* =========================
     RESERVACIONES STORE
========================= */
export const useReservationsStore = create((set, get) => ({
    reservaciones: [],
    loading: false,
    error: null,

    // ================= GET ALL =================
    getReservations: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getReservationsRequest();

            set({
                reservaciones: res.data.data,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error:
                    err.response?.data?.message ||
                    "Error al obtener reservaciones",
            });
        }
    },

    // ================= CREATE =================
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
                error:
                    err.response?.data?.message ||
                    "Error al crear reservación",
            });
        }
    },

    // ================= GET BY ID =================
    getReservationById: async (id) => {
        try {
            set({ loading: true, error: null });

            const res = await getReservationByIdRequest(id);

            set({ loading: false });

            return res.data.data;
        } catch (err) {
            set({
                loading: false,
                error:
                    err.response?.data?.message ||
                    "Error al obtener reservación",
            });
        }
    },

    // ================= UPDATE =================
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
                error:
                    err.response?.data?.message ||
                    "Error al actualizar reservación",
            });
        }
    },

    // ================= CONFIRM =================
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
                error:
                    err.response?.data?.message ||
                    "Error al confirmar reservación",
            });
        }
    },

    // ================= CANCEL =================
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
                error:
                    err.response?.data?.message ||
                    "Error al cancelar reservación",
            });
        }
    },

    // ================= FILTER BY STATUS =================
    getReservationsByStatus: async (status) => {
        try {
            set({ loading: true, error: null });

            const validStates = ["pendiente", "confirmada", "cancelada"];

            if (!validStates.includes(status)) {
                set({
                    loading: false,
                    error: `Estado inválido: ${validStates.join(", ")}`,
                });
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
                error:
                    err.response?.data?.message ||
                    "Error al filtrar reservaciones",
            });
        }
    },
}));

export const useAdminStore = create((set, get) => ({
    empleados: [],
    usuarios: [],
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



/* =========================
        INVENTARIO STORE
========================= */
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

/* =========================
        VENTAS STORE
========================= */
export const useVentasStore = create((set) => ({
    ventas: [],
    loading: false,
    error: null,

    getVentas: async () => {
        try {
            set({ loading: true, error: null });

            const res = await getVentasRequest();

            set({
                ventas: res.data.ventas,
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