import React, { useState } from 'react';
import { MesasModal } from './mesasModal';
import { MesasModalDelete } from './mesasModalDelete';

/**
 * Componente para la administración de mesas en el restaurante.
 * Incluye datos temporales, estados de disponibilidad y diseño responsivo.
 */
export const Mesas = () => {
    // Datos temporales para simular la respuesta de una API
    const [mesas, setMesas] = useState([
        { id: "M-001", capacity: 4, branch: "La Reformita", employee: "Juan Pérez", availability: true },
        { id: "M-002", capacity: 2, branch: "Zona 10", employee: "María García", availability: false },
        { id: "M-003", capacity: 6, branch: "La Reformita", employee: "Sin asignar", availability: true },
        { id: "M-004", capacity: 4, branch: "San Cristóbal", employee: "Carlos López", availability: false },
        { id: "M-005", capacity: 8, branch: "Zona 10", employee: "Ana Martínez", availability: true },
        { id: "M-006", capacity: 2, branch: "La Reformita", employee: "Juan Pérez", availability: true },
    ]);

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMesa, setSelectedMesa] = useState(null);

    const handleOpenModal = (mesa = null) => {
        setSelectedMesa(mesa);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (mesa) => {
        setSelectedMesa(mesa);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        // API call or state change for delete goes here
        console.log("Deleted mesa:", selectedMesa?.id);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Mesas</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Administra las mesas, consulta su información y cambia su disponibilidad en tiempo real.
                    </p>
                </div>

                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nueva Mesa
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 relative">
                        <input
                            type="text"
                            placeholder="Buscar por sucursal o empleado..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>
                    <select
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-200"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="disponible">Disponible</option>
                        <option value="ocupada">Ocupada</option>
                    </select>
                </div>
            </div>

            {/* TABLA DE SUCURSALES */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Capacidad</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Direccion Sucursal</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Empleado</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Disponibilidad</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {mesas.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                        No hay sucursales registradas en el sistema.
                                    </td>
                                </tr>
                            ) : (
                                mesas.map((m) => (
                                    <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                                        {/* Nombre con ID pequeño */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{m.capacity}</div>
                                        </td>

                                        {/* Dirección con truncado inteligente */}
                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="text-sm text-gray-600 truncate" title={m.branch}>
                                                {m.branch}
                                            </div>
                                        </td>

                                        {/* Empleado asignado */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{m.employee}</div>
                                        </td>

                                        {/* Disponibilidad */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.availability
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}>
                                                {m.availability ? "Disponible" : "Ocupada"}
                                            </span>
                                        </td>

                                        {/* Acciones */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenModal(m)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleOpenDeleteModal(m)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER / PAGINACIÓN */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">
                        Total: <span className="text-gray-800">{mesas.length} mesas</span> registradas
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-200 rounded bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="p-2 border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <MesasModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mesa={selectedMesa}
            />
            <MesasModalDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                mesa={selectedMesa}
            />
        </div>
    );
};

export default Mesas;