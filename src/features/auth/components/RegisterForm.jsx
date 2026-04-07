export const RegisterForm = ({ onSwitchLogin }) => {
    return (
        <form className="space-y-4 animate-fadeIn">
            {/* Fila 1: Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                    <input 
                        type="text" 
                        maxLength={50}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                        placeholder="Ej. Juan" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Apellido</label>
                    <input 
                        type="text" 
                        maxLength={50}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                        placeholder="Ej. Pérez" 
                        required 
                    />
                </div>
            </div>

            {/* Fila 2: DPI y Puesto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">DPI</label>
                    <input 
                        type="text" 
                        maxLength={20}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                        placeholder="CUI/DPI" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Puesto</label>
                    <input 
                        type="text" 
                        maxLength={100}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                        placeholder="Ej. Administrador" 
                        required 
                    />
                </div>
            </div>

            {/* Sueldo (Ocupa todo el ancho o puedes ponerlo a la par de otro si agregas más) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sueldo (Q)</label>
                <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" 
                    placeholder="0.00" 
                    required 
                />
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm mt-2">
                Registrarse
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
                ¿Ya tienes cuenta?{' '}
                <button 
                    type="button" 
                    onClick={onSwitchLogin} 
                    className="text-blue-600 hover:underline font-medium"
                >
                    Inicia sesión
                </button>
            </p>
        </form>
    );
}