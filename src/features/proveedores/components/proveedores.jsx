import React, { useState } from 'react';
// Ajustado a tu nombre de componente
import { ProveedoresForm } from './proveedoresForm'; 
import { ProveedoresModalDelete } from './proveedoresModalDelete.jsx';

/**
 * Componente para la administración de Proveedores.
 * Basado en el esquema de Mongoose: nombre, apellido, dpi, telefono, correo e isActive.
 */
export const Proveedores = () => {
    // Datos temporales basados en el esquema de Proveedores
    const [proveedores, setProveedores] = useState([
        { 
            id: "65f1a2b3c4d5e6f7a8b90201", 
            nombre: "Carlos", 
            apellido: "Rodríguez", 
            dpi: "2541987450101", 
            telefono: "+502 5544-3322", 
            correo: "carlos.rod@distribuidora.com",
            isActive: true 
        },
        { 
            id: "65f1a2b3c4d5e6f7a8b90202", 
            nombre: "Ana", 
            apellido: "Martínez", 
            dpi: "3010457810105", 
            telefono: "+502 4411-9988", 
            correo: "ana.martinez@insumos.gt",
            isActive: true 
        },
        { 
            id: "65f1a2b3c4d5e6f7a8b90203", 
            nombre: "Juan José", 
            apellido: "Méndez", 
            dpi: "1988451230108", 
            telefono: "+502 3322-1100", 
            correo: "jmendez_proveedor@servicios.com",
            isActive: false 
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProveedor, setSelectedProveedor] = useState(null);

    const handleOpenModal = (proveedor = null) => {
        setSelectedProveedor(proveedor);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (proveedor) => {
        setSelectedProveedor(proveedor);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Deleted proveedor:", selectedProveedor?.nombre);
        setIsDeleteModalOpen(false);
    };

    // Filtro básico por nombre, apellido o DPI
    const filteredProveedores = proveedores.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.dpi.includes(searchTerm)
    );

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Proveedores</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Listado oficial de proveedores, gestión de contactos y estado de actividad.
                    </p>
                </div>

                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nuevo Proveedor
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido o DPI..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-gray-600"
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

            {/* TABLA DE PROVEEDORES */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">DPI</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Gestión</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredProveedores.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No se encontraron proveedores que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            ) : (
                                filteredProveedores.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{p.nombre} {p.apellido}</div>
                                            <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">ID: {p.id.substring(0, 8)}...</div>
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                            {p.dpi}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    {p.telefono}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {p.correo}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                p.isActive 
                                                ? "bg-emerald-100 text-emerald-700" 
                                                : "bg-red-50 text-red-400 border border-red-100"
                                            }`}>
                                                {p.isActive ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenModal(p)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" 
                                                    title="Editar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleOpenDeleteModal(p)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                                                    title="Eliminar"
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

                {/* FOOTER */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">
                        Total: <span className="text-gray-800">{filteredProveedores.length} proveedores</span> registrados
                    </div>
                </div>
            </div>

            {/* MODALES - Aquí usamos ProveedoresForm */}
            <ProveedoresForm 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                proveedor={selectedProveedor}
            />
            <ProveedoresModalDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                proveedor={selectedProveedor}
            />
        </div>
    );
};

export default Proveedores;