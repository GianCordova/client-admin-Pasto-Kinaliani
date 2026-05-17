import { usePlatillosStore } from "../store/platillosStore";

export const useSavePlatillo = () => {
    const createPlatillo = usePlatillosStore((state) => state.createPlatillo);
    const updatePlatillo = usePlatillosStore((state) => state.updatePlatillo);

    const savePlatillo = async (data, platilloId = null) => {
        const formData = new FormData();

        formData.append('nombre', data.nombre);
        formData.append('descripcion', data.descripcion);
        formData.append('precio', data.precio);
        formData.append('categoria', data.categoria);

        if (data.photo?.length > 0) {
            formData.append('image', data.photo[0]);
        }

        if (platilloId) {
            await updatePlatillo(formData, platilloId);
        } else {
            await createPlatillo(formData);
        }
    };

    return {
        savePlatillo
    };
}
