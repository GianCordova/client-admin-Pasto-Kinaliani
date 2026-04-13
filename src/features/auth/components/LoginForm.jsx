export const LoginForm = ({ onSwitchRegister, onSwitchForgot }) => {
    return (
        <form className="space-y-5">
            {/* ... inputs de email y contraseña igual ... */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Email o Usuario</label>
                <input className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                <input type="password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                Iniciar Sesión
            </button>

            <div className="flex justify-between text-sm mt-2">
                <button type="button" onClick={onSwitchForgot} className="text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                </button>

                <button type="button" onClick={onSwitchRegister} className="text-blue-600 hover:underline">
                    Registrarse
                </button>
            </div>
        </form>
    );
};