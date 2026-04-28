import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    login as loginRequest
} from "../../../shared/api"
import toast from "react-hot-toast";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "ADMIN_ROLE";

                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: true,
                        error: "No tienes permiso para acceder como administrador"
                    })
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },
            login: async ({ emailOrUsername, password }) => {

                set({ loading: true })
                try {

                    const { data } = await loginRequest({ emailOrUsername, password })

                    // Solo administradores pueden iniciar sesion en client-admin

                    const role = data?.userDetails?.role;
                    if (role !== "ADMIN_ROLE") {
                        const message = "No tienes permiso para acceder como administrador";
                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            expiresAt: null,
                            isAuthenticated: false,
                            loading: false,
                            error: message,
                        });

                        toast.error(message);
                        return { success: false, error: message };
                    }

                    set({
                        user: data.userDetails,
                        token: data.accessToken || data.token,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresIn || data.expiresAt,
                        isAuthenticated: true,
                        loading: false,
                    })

                    return { success: true, user: data.userDetails };
                } catch (error) {
                    const errorMsg = error.response?.data?.message || "Error de conexion";
                    set({
                        loading: false,
                        error: errorMsg,
                    })
                    toast.error(errorMsg);
                    return { success: false, error: errorMsg };
                }
            },
        }),
        { name: "auth-store" }
    )
);