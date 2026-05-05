// src/users/store/useReservationsStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Simulamos fetch API
const fakeApi = {
    getReservaciones: async () => {
        // Aquí normalmente harías fetch("/api/reservaciones")
        return [
            {
                id: "1",
                id_usuario: "USR001",
                fecha: "2026-04-14",
                hora: "18:00",
                numero_personas: 4,
                numero_mesas: 2,
                estado: "pendiente"
            },
            {
                id: "2",
                id_usuario: "USR002",
                fecha: "2026-04-15",
                hora: "20:00",
                numero_personas: 2,
                numero_mesas: 1,
                estado: "confirmada"
            }
        ];
    }
};

export const useReservationsStore = create(devtools((set, get) => ({
    reservaciones: [],

    // Obtener todas las reservaciones
    getReservaciones: async () => {
        const data = await fakeApi.getReservaciones();
        set({ reservaciones: data });
    },

    // Agregar o editar reservación
    saveReservacion: (res) => {
        set(state => {
            const exists = state.reservaciones.find(r => r.id === res.id);
            if (exists) {
                // Editar
                return {
                    reservaciones: state.reservaciones.map(r =>
                        r.id === res.id ? { ...r, ...res } : r
                    )
                };
            } else {
                // Agregar
                return { reservaciones: [...state.reservaciones, { ...res, id: Date.now().toString() }] };
            }
        });
    },

    // Cancelar reservación
    cancelarReservacion: (id) => {
        set(state => ({
            reservaciones: state.reservaciones.map(r =>
                r.id === id ? { ...r, estado: "cancelada" } : r
            )
        }));
    },

    // Confirmar reservación
    confirmarReservacion: (id) => {
        set(state => ({
            reservaciones: state.reservaciones.map(r =>
                r.id === id ? { ...r, estado: "confirmada" } : r
            )
        }));
    }
})));