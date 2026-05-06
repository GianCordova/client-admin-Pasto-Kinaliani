import React, { useState, useEffect } from 'react';
import { UsuariosModal } from './UsuariosModal';
import { UsuariosFilter } from './UsuariosFilter'; // Asegúrate de importarlo
import { useAdminStore } from "../../users/store/adminStore.js";

export const Usuarios = () => {
    const { usuarios, getUsuarios, loading } = useAdminStore();

    // 1. Estado para la lista que se muestra en pantalla
    const [displayUsers, setDisplayUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsuarios();
    }, []);

    // 2. Importante: Cuando los usuarios carguen del store, 
    // inicializamos la lista de visualización
    useEffect(() => {
        setDisplayUsers(usuarios);
    }, [usuarios]);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Usuarios</h1>

            {/* 3. El Filtro actualiza el estado displayUsers */}
            <UsuariosFilter
                data={usuarios}
                onFilter={(result) => setDisplayUsers(result)}
            />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {loading ? (
                    <p className="p-10 text-center">Cargando...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Usuario</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Contacto</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase">Estado</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase">Detalles</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* 4. USAR displayUsers AQUÍ */}
                                {displayUsers.map((u) => (
                                    <tr key={u._id} className="hover:bg-orange-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-800 font-bold">{u.name} {u.surname}</span>
                                                <span className="text-[10px] font-mono text-gray-400 uppercase">{u._id.slice(-6)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${u.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                {u.isActive ? 'ACTIVO' : 'INACTIVO'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleOpenModal(u)} className="text-orange-500 hover:text-orange-700">Detalles</button>
                                        </td>
                                    </tr>
                                ))}
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