import { axiosAdmin } from './api';

// =================Sucursales================
export const getSucursales = async () => {
    return await axiosAdmin.get('/sucursales');
}

export const createSucursal = async (sucursalData) => {
    return await axiosAdmin.post('/sucursales', sucursalData);
}

export const updateSucursal = async (id, sucursalData) => {
    return await axiosAdmin.put(`/sucursales/${id}`, sucursalData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const deleteSucursal = async (id) => {
    return await axiosAdmin.delete(`/sucursales/${id}`);
}