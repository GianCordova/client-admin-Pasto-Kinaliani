import React, { useState, useEffect } from 'react';
import { MesasModal } from './MesasModal'; 
import { showConfirmToast } from '../../auth/components/ConfirmModal.jsx';
import { toast } from 'react-hot-toast';

export const Mesas = () => {
    const [mesas, setMesas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos"); // "todos", "disponible", "ocupada"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMesa, setSelectedMesa] = useState(null);

    const API_URL = "http://localhost:3002/gestionRestaurantes/v1/admin/mesas";

    const fetchMesas = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) {
                setMesas(data.mesas || []);
            }
        } catch (error) {
            console.error("Error al cargar mesas:", error);
            toast.error("No se pudieron cargar las mesas");
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    const handleOpenModal = (mesa = null) => {
        setSelectedMesa(mesa);
        setIsModalOpen(true);
    };

    const handleDeactivate = (mesa) => {
        showConfirmToast({
            title: "¿Desactivar Mesa?",
            message: `La mesa #${mesa.numero} pasará a estar no disponible.`,
            onConfirm: async () => {
                try {
                    const response = await fetch(`${API_URL}/deactivate/${mesa._id}`, {
                        method: 'PUT'
                    });
                    if (response.ok) {
                        toast.success("Estado actualizado");
                        fetchMesas();
                    }
                } catch (error) {
                    toast.error("Error al comunicar con el servidor");
                }
            }
        });
    };

    // --- LÓGICA DE FILTRADO MEJORADA ---
    const filteredMesas = mesas.filter(m => {
        // Filtro por texto (Número de mesa o nombre de sucursal)
        const matchesSearch = 
            m.sucursal?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.numero?.toString().includes(searchTerm);

        // Filtro por estado (Select)
        let matchesStatus = true;
        if (filterStatus === "disponible") {
            matchesStatus = m.isAvailable === true;
        } else if (filterStatus === "ocupada") {
            matchesStatus = m.isAvailable === false;
        }

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Gestión de Mesas</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Administra la capacidad y disponibilidad de mesas por sucursal.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nueva Mesa
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Buscar por número o sucursal..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all text-gray-600"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-4 top-3.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
                
                {/* SELECT DE ESTADO ACTUALIZADO */}
                <select 
                    className="p-3 border border-gray-200 rounded-xl outline-none focus:border-orange-400 text-gray-600 cursor-pointer bg-white"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="disponible">Disponibles (Libres)</option>
                    <option value="ocupada">Ocupadas</option>
                </select>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">N° Mesa</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Capacidad</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sucursal</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Gestión</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredMesas.length > 0 ? (
                                filteredMesas.map((mesa) => (
                                    <tr key={mesa._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">Mesa #{mesa.numero}</div>
                                            <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase">
                                                ID: {mesa._id.substring(0, 8)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {mesa.capacidad} Personas
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {mesa.sucursal?.nombre || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                mesa.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-red-50 text-red-400"
                                            }`}>
                                                {mesa.isAvailable ? "Libre" : "Ocupada"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => handleOpenModal(mesa)}
                                                    className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                    title="Editar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => handleDeactivate(mesa)}
                                                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    title="Desactivar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400">
                                        No se encontraron mesas que coincidan con los criterios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <MesasModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mesa={selectedMesa}
                onSuccess={fetchMesas}
            />
        </div>
    );
};