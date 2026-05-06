import { useSucursalesStore } from "../../usuarios/store/adminStore";

export const useSaveSucursal = () => {
    const createSucursal = useSucursalesStore((state) => state.createSucursal);
    const updateSucursal = useSucursalesStore((state) => state.updateSucursal);

    const saveSucursal = async (data, sucursalId = null) => {
        const formData = new FormData();

        formData.append('nombre', data.nombre);
        formData.append('direccion', data.direccion);
        formData.append('telefono', data.telefono);
        formData.append('horario.apertura', data.horario.apertura);
        formData.append('horario.cierre', data.horario.cierre);

        if (data.photo?.length > 0) {
            formData.append('image', data.photo[0]);
        }

        if (sucursalId) {
            await updateSucursal(formData, sucursalId);
        } else {
            await createSucursal(formData);
        }
    };

    return {
        saveSucursal
    };
}