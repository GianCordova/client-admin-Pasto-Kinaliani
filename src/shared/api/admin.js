import { axiosAdmin } from './api';

// =================Sucursales================
export const getSucursales = async () => {
    return await axiosAdmin.get('/sucursales');
}

export const createSucursal = async (sucursalData) => {
    return await axiosAdmin.post('/sucursales', sucursalData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const updateSucursal = async (id, sucursalData) => {
    return await axiosAdmin.put(`/sucursales/${id}`, sucursalData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const toggleSucursalStatus = async (id, isActive) => {
    const endpoint = isActive ? 'desactivar' : 'activar';
    return await axiosAdmin.put(`/sucursales/${id}/${endpoint}`);
}

// =================Platillos================
export const getPlatillos = async () => {
    return await axiosAdmin.get('/platillos');
}

export const createPlatillo = async (platilloData) => {
    return await axiosAdmin.post('/platillos', platilloData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const updatePlatillo = async (id, platilloData) => {
    return await axiosAdmin.put(`/platillos/${id}`, platilloData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const togglePlatilloStatus = async (id, isActive) => {
    const endpoint = isActive ? 'desactivar' : 'activar';
    return await axiosAdmin.put(`/platillos/${id}/${endpoint}`);
}


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

// ================= RESERVACIONES =================

export const getReservations = async () => {
    return await axiosAdmin.get("/reservaciones");
};

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

// ================= EMPLEADOS =================
export const getEmpleados = async () => {
    return await axiosAdmin.get("/empleados");
};

export const getEmpleadoById = async (id) => {
    return await axiosAdmin.get(`/empleados/${id}`);
};

export const saveEmpleado = async (data) => {
    // Usamos POST para crear
    return await axiosAdmin.post("/empleados", data);
};

export const updateEmpleado = async (id, data) => {
    // Usamos PUT para actualizar
    return await axiosAdmin.put(`/empleados/${id}`, data);
};

export const activateEmpleado = async (id) => {
    // Coincide con la función activateEmpleado del controlador
    return await axiosAdmin.put(`/empleados/activate/${id}`);
};

export const deactivateEmpleado = async (id) => {
    // Coincide con la función deactivateEmpleado del controlador
    return await axiosAdmin.put(`/empleados/deactivate/${id}`);
};

// ================= USUARIOS =================
export const getUsuarios = async () => {
    return await axiosAdmin.get("/usuarios");
};

export const getUserById = async (id) => {
    return await axiosAdmin.get(`/usuarios/${id}`);
};
