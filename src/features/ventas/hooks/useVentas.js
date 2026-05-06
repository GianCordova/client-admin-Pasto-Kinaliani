import { useVentasStore } from "../../users/store/adminStore";

export const useVentas = () => {

    const ventas = useVentasStore((state) => state.ventas);
    const getVentas = useVentasStore((state) => state.getVentas);
    const getVentaById = useVentasStore((state) => state.getVentaById);

    return {
        ventas,
        getVentas,
        getVentaById
    };
};