import { useInventarioStore } from "../../users/store/adminStore";

export const useSaveInventario = () => {

    const createInventario = useInventarioStore((state) => state.createInventario);
    const updateInventario = useInventarioStore((state) => state.updateInventario);

    const saveInventario = async (data, inventarioId = null) => {

        const payload = {
            nombre: data.nombre,
            sucursal: data.sucursal,
            cantidad: Number(data.cantidad),
            stockMinimo: Number(data.stockMinimo),
            status: data.status || "ACTIVO"
        };

        if (inventarioId) {
            await updateInventario(inventarioId, payload);
        } else {
            await createInventario(payload);
        }
    };

    return { saveInventario };
};