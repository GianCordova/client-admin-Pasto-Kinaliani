export const ForgotPassForm = ({ onSwitchLogin }) => {
    return (
        <form className="space-y-6 animate-fadeIn">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Correo Electrónico
                </label>
                <input 
                    type="email" 
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                    placeholder="tucorreo@ejemplo.com"
                    required 
                />
                <p className="mt-2 text-xs text-gray-500">
                    Te enviaremos un enlace para que puedas restablecer tu contraseña.
                </p>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                Enviar enlace de recuperación
            </button>

            <div className="text-center">
                <button 
                    type="button" 
                    onClick={onSwitchLogin} 
                    className="text-sm text-blue-600 hover:underline font-medium"
                >
                    Volver al inicio de sesión
                </button>
            </div>
        </form>
    );
};