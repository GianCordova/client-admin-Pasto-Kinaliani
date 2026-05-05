import { axiosAdmin } from "./api";

// ================= PEDIDOS =================
export const getPedidos = async () => {
    return await axiosAdmin.get("/pedidos");
};

export const createPedido = async (data) => {
    return await axiosAdmin.post("/pedidos", data);
};

export const getPedidoById = async (id) => {
    return await axiosAdmin.get(`/pedidos/${id}`);
};

export const cancelPedido = async (id) => {
    return await axiosAdmin.put(`/pedidos/cancelPedido/${id}`);
};

export const completadoPedido = async (id) => {
    return await axiosAdmin.put(`/pedidos/completPedido/${id}`);
};

export const getPedidosByStatus = async (status) => {
    return await axiosAdmin.get(`/pedidos/status/${status}`);
};

export const getPedidosPendientes = async () => {
    return await axiosAdmin.get("/pedidos/pendientes");
};

export const getPedidosBySucursal = async (sucursalId) => {
    return await axiosAdmin.get(`/pedidos/sucursal/${sucursalId}`);
};

// Obtener reservación por ID
export const getReservationById = async (id) => {
    return await axiosAdmin.get(`/reservaciones/${id}`);
};

// Crear una nueva reservación
export const createReservation = async (data) => {
    return await axiosAdmin.post("/reservaciones", data);
};

// Actualizar una reservación
export const updateReservation = async (id, data) => {
    return await axiosAdmin.put(`/reservaciones/${id}`, data);
};

// Confirmar una reservación
export const confirmReservation = async (id) => {
    return await axiosAdmin.put(`/reservaciones/${id}/confirmar`);
};

// Cancelar una reservación
export const cancelReservation = async (id) => {
    return await axiosAdmin.put(`/reservaciones/${id}/cancelar`);
};

// Filtrar reservaciones por estado
export const getReservationsByStatus = async (status) => {
    return await axiosAdmin.get(`/reservaciones/status/${status}`);
};