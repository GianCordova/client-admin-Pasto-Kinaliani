import React, { useState, useEffect } from 'react';
import { MesasModal } from './MesasModal';
import { showConfirmToast } from '../../auth/components/ConfirmModalFer';
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
        const matchesSearch =
            m.sucursal?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.numero?.toString().includes(searchTerm);

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
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Gestión de Mesas</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Administra la capacidad y disponibilidad de mesas por sucursal.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="w-full sm:w-auto bg-orange-400 px-5 py-2.5 rounded-xl text-white font-semibold shadow-md hover:bg-orange-500 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nueva Mesa
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Buscar por número o sucursal..."
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all text-gray-600 text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-4 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>

                <select
                    className="w-full sm:w-auto p-2.5 border border-gray-200 rounded-xl outline-none focus:border-orange-400 text-gray-600 cursor-pointer bg-white text-sm font-medium"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="disponible">Disponibles (Libres)</option>
                    <option value="ocupada">Ocupadas</option>
                </select>
            </div>

            {/* TABLA RESPONSIVE */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="w-full">
                    <table className="w-full block md:table text-left border-collapse">
                        <thead className="hidden md:table-header-group bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">N° Mesa</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Capacidad</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sucursal</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Gestión</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 block md:table-row-group">
                            {filteredMesas.length > 0 ? (
                                filteredMesas.map((mesa) => (
                                    <tr key={mesa._id} className="hover:bg-gray-50/50 transition-colors block md:table-row p-5 md:p-0 border-b border-gray-100 md:border-none last:border-none">

                                        {/* N° MESA */}
                                        <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell">
                                            <div className="flex justify-between items-center md:block">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase">
                                                    N° Mesa:
                                                </span>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">Mesa #{mesa.numero}</div>
                                                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider md:mt-0.5">
                                                        #{mesa._id.substring(0, 8)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* CAPACIDAD */}
                                        <td className="px-0 md:px-6 py-1.5 md:py-4 block md:table-cell text-sm text-gray-600">
                                            <div className="flex justify-between items-center md:block">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase">
                                                    Capacidad:
                                                </span>
                                                <span className="font-medium md:font-normal">{mesa.capacidad} Personas</span>
                                            </div>
                                        </td>

                                        {/* SUCURSAL */}
                                        <td className="px-0 md:px-6 py-1.5 md:py-4 block md:table-cell text-sm text-gray-600">
                                            <div className="flex justify-between items-center md:block">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase">
                                                    Sucursal:
                                                </span>
                                                <span className="font-semibold text-gray-700 md:font-normal">{mesa.sucursal?.nombre || 'N/A'}</span>
                                            </div>
                                        </td>

                                        {/* ESTADO */}
                                        <td className="px-0 md:px-6 py-1.5 md:py-4 block md:table-cell md:text-center">
                                            <div className="flex justify-between items-center md:block">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase">
                                                    Estado:
                                                </span>
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border tracking-wide ${mesa.isAvailable
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : "bg-red-50 text-red-500 border-red-100"
                                                    }`}>
                                                    {mesa.isAvailable ? "Libre" : "Ocupada"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* GESTIÓN (ACCIONES) */}
                                        <td className="px-0 md:px-6 py-3 md:py-4 block md:table-cell text-right border-t border-dashed border-gray-100 md:border-none mt-2 md:mt-0 pt-3 md:pt-4">
                                            <div className="flex justify-between items-center md:justify-end gap-3">
                                                <span className="inline-block md:hidden text-xs font-bold text-gray-400 uppercase">
                                                    Gestión:
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(mesa)}
                                                        className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-100 md:border-none transition-all shadow-sm"
                                                        title="Editar"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeactivate(mesa)}
                                                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-100 md:border-none transition-all shadow-sm"
                                                        title="Desactivar"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400 font-medium block md:table-cell">
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