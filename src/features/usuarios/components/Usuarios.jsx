import React, { useState, useEffect } from 'react';
import { UsuariosModal } from './UsuariosModal';
import { UsuariosFilter } from './UsuariosFilter';
import { useUsuarioStore } from "../store/usuarioStore";

export const Usuarios = () => {
    const { usuarios, getUsuarios, loading } = useUsuarioStore();
    const [displayUsers, setDisplayUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsuarios();
    }, []);

    useEffect(() => {
        setDisplayUsers(usuarios);
    }, [usuarios]);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-6 tracking-tight">Usuarios</h1>

            <UsuariosFilter
                data={usuarios}
                onFilter={(result) => setDisplayUsers(result)}
            />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-4">
                {loading ? (
                    <p className="p-10 text-center font-bold text-gray-400 animate-pulse">Cargando usuarios...</p>
                ) : (
                    <div className="w-full">
                        {/* Estructura híbrida: 
                          - Actúa como bloques/tarjetas en móvil (block).
                          - Actúa como tabla real desde tablets/escritorio (md:table).
                        */}
                        <table className="w-full block md:table divide-y divide-gray-200">
                            <thead className="hidden md:table-header-group bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Contacto</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 block md:table-row-group">
                                {displayUsers.length === 0 ? (
                                    <tr>
                                        <td className="p-10 text-center text-gray-400 italic block md:table-cell">
                                            No se encontraron usuarios disponibles.
                                        </td>
                                    </tr>
                                ) : (
                                    displayUsers.map((u) => (
                                        <tr
                                            key={u._id}
                                            className="hover:bg-orange-50/20 transition-colors block md:table-row p-4 md:p-0 border-b border-gray-100 md:border-none last:border-none"
                                        >
                                            {/* COLUMNA 1: USUARIO */}
                                            <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell">
                                                <div className="flex items-center gap-3">
                                                    {/* Avatar adaptativo para mejorar la UI móvil */}
                                                    <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs ${u.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                        {u.name?.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-gray-800 font-bold text-sm md:text-base truncate">
                                                            {u.name} {u.surname}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-gray-400 uppercase">
                                                            #{u._id.slice(-6)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* COLUMNA 2: CONTACTO */}
                                            <td className="px-0 md:px-6 py-1 md:py-4 block md:table-cell text-sm text-gray-600">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase mr-2">
                                                    Correo:
                                                </span>
                                                <span className="break-all font-medium md:font-normal">{u.email}</span>
                                            </td>

                                            {/* COLUMNA 3: ESTADO */}
                                            <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell md:text-center">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase mr-2">
                                                    Estado:
                                                </span>
                                                <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider ${u.isActive ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                                                    {u.isActive ? 'ACTIVO' : 'INACTIVO'}
                                                </span>
                                            </td>

                                            {/* COLUMNA 4: DETALLES */}
                                            <td className="px-0 md:px-6 py-3 md:py-4 block md:table-cell text-right">
                                                <button
                                                    onClick={() => handleOpenModal(u)}
                                                    className="w-full md:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white md:bg-transparent md:text-orange-500 md:hover:text-orange-700 md:p-0 py-2.5 px-4 rounded-xl text-sm font-bold transition-all active:scale-98"
                                                >
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <UsuariosModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
};