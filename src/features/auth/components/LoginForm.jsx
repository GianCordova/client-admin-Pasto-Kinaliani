import { useAuthStore } from "../store/authStore.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const LoginForm = ({ onSwitchForgot }) => {

    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const loading = useAuthStore(state => state.loading);
    const error = useAuthStore(state => state.error);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);

        if (res && res.success) {
            toast.success("Inicio de sesión exitoso");
            navigate("/dashboard");
        } else {
            toast.error("Credenciales incorrectas. Intente de nuevo.");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* ... inputs de email y contraseña igual ... */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Email o Usuario</label>
                <input className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    {...register("emailOrUsername", { required: "El email o usuario es requerido" })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    {...register("password", { required: "La contraseña es requerida" })}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            <p className="text-center text-sm mt-2">
                <button
                    type="button"
                    onClick={onSwitchForgot}
                    className="text-orange-600 hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </p>
        </form>
    );
};