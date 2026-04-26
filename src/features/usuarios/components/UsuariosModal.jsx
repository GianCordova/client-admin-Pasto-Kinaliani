import React from 'react';

export const UsuariosModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        {user ? 'Editar Usuario' : 'Nuevo Usuario'}
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" defaultValue={user?.name} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input type="email" defaultValue={user?.email} className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-200" />
                    </div>
                    {/* Más campos según necesites */}
                </div>
                <div className="p-6 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800">Cancelar</button>
                    <button className="bg-orange-400 px-4 py-2 rounded-lg text-white font-semibold hover:bg-orange-500">
                        {user ? 'Guardar Cambios' : 'Crear Usuario'}
                    </button>
                </div>
            </div>
        </div>
    );
};