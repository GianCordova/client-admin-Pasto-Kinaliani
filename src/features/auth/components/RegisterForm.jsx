export const RegisterForm = () => {
    return (
        <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. Juan" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Apellido</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. Pérez" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                    <input type="tel" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="1234-5678" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Usuario</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="jperez123" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo Electrónico</label>
                <input type="email" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="correo@kinal.edu.gt" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
                <input type="password" name="password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
            </div>

            <button className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm mt-2">
                Crear Cuenta
            </button>
        </form>
    );
}