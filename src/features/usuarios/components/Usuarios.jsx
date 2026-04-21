import React, { useState } from 'react';
import { UsuariosModal } from './UsuariosModal';
import { UsuariosModalDelete } from './UsuariosModalDelete';

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([
        { id: "U-001", name: "Esteban", surname: "Quito", email: "esteban@mail.com", address: "Zona 1, Ciudad", phone: "55443322", isActive: true },
        { id: "U-002", name: "Giancarlo", surname: "Cordova", email: "giancarlo@mail.com", address: "Antigua Guatemala", phone: "99887766", isActive: false }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenModal = (user = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setUsuarios(usuarios.filter(u => u.id !== selectedUser.id));
        setIsDeleteModalOpen(false);
    };

    const filteredUsers = usuarios.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "todos" || 
                             (filterStatus === "activo" ? u.isActive : !u.isActive);
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            {/* HEADER - Unificado con Empleados */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Usuarios</h1>
                    <p className="text-gray-500 text-sm mt-1">Gestión centralizada de clientes y contactos.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-orange-500 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                >
                    <span className="text-xl">+</span> Nuevo Usuario
                </button>
            </div>

            {/* FILTROS - Unificado el input con el estilo de Empleados */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 relative">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o correo..."
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all text-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-4 top-3.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>
                    <select
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="activo">Activos</option>
                        <option value="inactivo">Inactivos</option>
                    </select>
                </div>
            </div>

            {/* TABLA - Con efectos hover y iconos iguales a Empleados */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Usuario</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Contacto</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {filteredUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-orange-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 font-bold group-hover:text-orange-600">{u.name} {u.surname}</span>
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">{u.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">{u.email}</span>
                                            <span className="text-xs text-gray-400">{u.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            u.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                                        }`}>
                                            {u.isActive ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleOpenModal(u)} className="p-2 hover:bg-orange-100 text-orange-400 rounded-lg transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleOpenDeleteModal(u)} className="p-2 hover:bg-red-100 text-red-400 rounded-lg transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALES */}
            <UsuariosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedUser} />
            <UsuariosModalDelete isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} user={selectedUser} />
        </div>
    );
};