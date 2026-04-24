import React, { useState } from 'react';
import { VentasModal } from './VentasModal';
import { VentasModalDelete } from './VentasModalDelete';

export const Ventas = () => {
    // Datos simulados basados en el esquema de Mongoose
    const [ventas, setVentas] = useState([
        { _id: "V-001", pedido: "PED-1024", total: 150.50, metodoPago: "EFECTIVO", fecha: "2024-05-20T10:30:00Z" },
        { _id: "V-002", pedido: "PED-1025", total: 85.00, metodoPago: "TARJETA", fecha: "2024-05-20T11:15:00Z" },
        { _id: "V-003", pedido: "PED-1026", total: 210.00, metodoPago: "TRANSFERENCIA", fecha: "2024-05-21T09:00:00Z" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterMetodo, setFilterMetodo] = useState("todos");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);

    const handleOpenModal = (venta = null) => {
        setSelectedVenta(venta);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (venta) => {
        setSelectedVenta(venta);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Venta eliminada:", selectedVenta?._id);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Ventas</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Registro histórico de transacciones, métodos de pago y totales recaudados.
                    </p>
                </div>

                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nueva Venta
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 relative">
                        <input
                            type="text"
                            placeholder="Buscar por ID de pedido..."
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
                        value={filterMetodo}
                        onChange={(e) => setFilterMetodo(e.target.value)}
                    >
                        <option value="todos">Todos los métodos</option>
                        <option value="EFECTIVO">Efectivo</option>
                        <option value="TARJETA">Tarjeta</option>
                        <option value="TRANSFERENCIA">Transferencia</option>
                    </select>
                </div>
            </div>

            {/* TABLA DE VENTAS */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">ID Pedido</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Fecha</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Método de Pago</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {ventas.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">No hay ventas registradas.</td>
                                </tr>
                            ) : (
                                ventas.map((v) => (
                                    <tr key={v._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{v.pedido}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(v.fecha).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">Q{v.total.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                v.metodoPago === 'EFECTIVO' ? "bg-green-100 text-green-700" : 
                                                v.metodoPago === 'TARJETA' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                            }`}>
                                                {v.metodoPago}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleOpenModal(v)} className="p-2 text-gray-400 hover:text-indigo-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleOpenDeleteModal(v)} className="p-2 text-gray-400 hover:text-red-500">
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
                {/* FOOTER */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">
                        Total: <span className="text-gray-800">{ventas.length} ventas</span> registradas
                    </div>
                </div>
            </div>

            <VentasModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} venta={selectedVenta} />
            <VentasModalDelete isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} venta={selectedVenta} />
        </div>
    );
};