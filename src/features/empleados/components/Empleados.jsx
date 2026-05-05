import { useState, useEffect } from 'react';
import { useEffect as useToastEffect } from "react";

import { useEmpleadosStore } from "../../users/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError, showSuccess } from "../../../shared/utils/toast";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { EmpleadoModal } from './EmpleadosModal';
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";


export const Empleados = () => {
    // Inicialmente no hay empleados
    const [empleados, setEmpleados] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

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

    const saveEmpleado = (empleado) => {
        if (empleado.id) {
            setEmpleados(prev =>
                prev.map(e => e.id === empleado.id ? empleado : e)
            );
        } else {
            const newEmpleado = {
                ...empleado,
                id: `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3,'0')}`
            };
            setEmpleados(prev => [...prev, newEmpleado]);
        }
    };

    const handleConfirmDelete = () => {
        if (selectedEmpleado) {
            setEmpleados(prev => prev.filter(e => e.id !== selectedEmpleado.id));
            setIsDeleteModalOpen(false);
            setSelectedEmpleado(null);
        }
    };

    const filteredEmpleados = empleados.filter((e) => {
        const term = searchTerm.toLowerCase();
        return (
            e.name?.toLowerCase().includes(term) ||
            e.surname?.toLowerCase().includes(term) ||
            e.role?.toLowerCase().includes(term) ||
            e.branch?.toLowerCase().includes(term) ||
            e.id?.toLowerCase().includes(term)
        );
    });

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

            {/* FILTRO */}
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
                            {filteredEmpleados.length > 0 ? (
                                filteredEmpleados.map((e) => (
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
                                                    ✏️
                                                </button>
                                                <button onClick={() => handleOpenDeleteModal(e)} className="p-2 hover:bg-red-100 text-red-400 rounded-lg transition-colors">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                                        No se encontraron empleados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALES */}
            <EmpleadosModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                empleado={selectedEmpleado} 
                onSave={saveEmpleado} 
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