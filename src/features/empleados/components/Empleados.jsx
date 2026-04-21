import React, { useState } from 'react';
import { EmpleadosModal } from './EmpleadosModal';
import { EmpleadosModalDelete } from './EmpleadosModalDelete';

export const Empleados = () => {
    const [empleados, setEmpleados] = useState([
        { id: "EMP-001", name: "Juan", surname: "Pérez", role: "Mesero", branch: "La Reformita", status: true },
        { id: "EMP-002", name: "María", surname: "García", role: "Chef", branch: "Zona 10", status: true },
        { id: "EMP-003", name: "Carlos", surname: "López", role: "Bartender", branch: "San Cristóbal", status: false },
        { id: "EMP-004", name: "Ana", surname: "Martínez", role: "Gerente", branch: "Zona 10", status: true },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    
    // Estados para Modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);

    const handleOpenModal = (empleado = null) => {
        setSelectedEmpleado(empleado);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (empleado) => {
        setSelectedEmpleado(empleado);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setEmpleados(empleados.filter(e => e.id !== selectedEmpleado.id));
        console.log("Eliminado:", selectedEmpleado.id);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Empleados</h1>
                    <p className="text-gray-500 text-sm mt-1">Gestión de personal y asignación de sucursales.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-orange-500 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                >
                    <span className="text-xl">+</span> Nuevo Empleado
                </button>
            </div>

            {/* FILTROS (Igual que el tuyo) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, puesto o sucursal..."
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
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Colaborador</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Puesto / Sucursal</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {empleados.map((e) => (
                                <tr key={e.id} className="hover:bg-orange-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 font-bold group-hover:text-orange-600">
                                                {e.name} {e.surname}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">{e.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">{e.role}</span>
                                            <span className="text-xs text-gray-400">{e.branch}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            e.status ? "bg-green-100 text-green-600" : "bg-red-50 text-red-400"
                                        }`}>
                                            {e.status ? "En Turno" : "Fuera"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleOpenModal(e)} className="p-2 hover:bg-orange-100 text-orange-400 rounded-lg transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleOpenDeleteModal(e)} className="p-2 hover:bg-red-100 text-red-400 rounded-lg transition-colors">
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
            <EmpleadosModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                empleado={selectedEmpleado} 
            />
            <EmpleadosModalDelete 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={handleConfirmDelete} 
                empleado={selectedEmpleado} 
            />
        </div>
    );
};