import React from 'react';

export const UsuariosModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                {/* Header con ID Destacado */}
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Detalles de Usuario</h2>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-1">Expediente Digital</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                    </div>

                    {/* El ID más grande y visible */}
                    <div className="mt-4 bg-white border border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">ID Único de Sistema</span>
                        <span className="text-lg font-mono font-bold text-orange-600 tracking-wider uppercase">
                            {user?._id}
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Información Personal */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Nombre</p>
                            <p className="text-gray-700 font-semibold">{user?.name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Apellido</p>
                            <p className="text-gray-700 font-semibold">{user?.surname}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">📧</div>
                            <div className="flex-1 border-b border-gray-50 pb-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Correo Electrónico</p>
                                <p className="text-gray-700 font-medium">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">📞</div>
                            <div className="flex-1 border-b border-gray-50 pb-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Teléfono de Contacto</p>
                                <p className="text-gray-700 font-medium">{user?.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-2 rounded-lg text-green-600">📍</div>
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Dirección Registrada</p>
                                <p className="text-gray-700 text-sm leading-relaxed">{user?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white flex justify-end">
                    <button
                        onClick={onClose}
                        className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl text-white font-bold transition-all shadow-lg shadow-orange-100"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};