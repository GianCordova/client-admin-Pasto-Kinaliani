import { useReservationsStore } from "../../users/store/adminStore";

export const useSaveReservation = () => {

    const createReservation = useReservationsStore(
        (state) => state.createReservation
    );

    const updateReservation = useReservationsStore(
        (state) => state.updateReservation
    );

    const saveReservation = async (data, reservationId = null) => {
        try {
            const formData = new FormData();

            formData.append("id_usuario", data.id_usuario);
            formData.append("fecha", data.fecha);
            formData.append("hora", data.hora);
            formData.append("numero_personas", data.numero_personas);
            formData.append("numero_mesas", data.numero_mesas);
            formData.append("estado", data.estado);

            if (reservationId) {
                await updateReservation(reservationId, formData);
            } else {
                await createReservation(formData);
            }
        } catch (error) {
            console.error("❌ Error en saveReservation:", error);
            throw error;
        }
    };

    return { saveReservation };
};