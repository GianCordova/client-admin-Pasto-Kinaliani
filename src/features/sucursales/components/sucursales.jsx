import React, { useState } from 'react';
import { SucursalesModal } from './sucursalesModal';
import { SucursalesModalDelete } from './sucursalesModalDelete';

/**
 * Componente para la administración de Sucursales.
 * Basado en el esquema de Mongoose: nombre, dirección, teléfono, horario e isActive.
 */
export const Sucursales = () => {
    // Datos temporales basados en el esquema de Sucursales
    const [sucursales, setSucursales] = useState([
        {
            id: "65f1a2b3c4d5e6f7a8b90123",
            nombre: "Sucursal Central - La Reformita",
            direccion: "Av. Petapa 32-01, Zona 12, Ciudad de Guatemala",
            telefono: "+502 2233-4455",
            horario: { apertura: "07:00", cierre: "22:00" },
            isActive: true
        },
        {
            id: "65f1a2b3c4d5e6f7a8b90124",
            nombre: "Express Zona 10",
            direccion: "10ma Calle 5-50, Zona 10, Edificio Plaza",
            telefono: "+502 2211-0099",
            horario: { apertura: "08:00", cierre: "20:00" },
            isActive: true
        },
        {
            id: "65f1a2b3c4d5e6f7a8b90125",
            nombre: "San Cristóbal",
            direccion: "Boulevard Principal 12-44, Sector A-3",
            telefono: "+502 2478-1122",
            horario: { apertura: "07:00", cierre: "21:00" },
            isActive: false
        },
        {
            id: "65f1a2b3c4d5e6f7a8b90126",
            nombre: "Pradera Concepción",
            direccion: "KM 15.5 Carretera a El Salvador, Local 45",
            telefono: "+502 6633-8877",
            horario: { apertura: "10:00", cierre: "21:00" },
            isActive: true
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSucursal, setSelectedSucursal] = useState(null);

    const handleOpenModal = (sucursal = null) => {
        setSelectedSucursal(sucursal);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (sucursal) => {
        setSelectedSucursal(sucursal);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        // En una implementación real, aquí se llamaría a la API
        console.log("Deleted sucursal:", selectedSucursal?.nombre);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Sucursales</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Gestiona las ubicaciones físicas, horarios de atención y contacto de cada sucursal.
                    </p>
                </div>

                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nueva Sucursal
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, dirección o teléfono..."
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

            {/* TABLA DE SUCURSALES */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dirección</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Horario</th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Gestión</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {sucursales.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                        No hay sucursales registradas en el sistema.
                                    </td>
                                </tr>
                            ) : (
                                sucursales.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                        {/* Nombre con ID pequeño */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{s.nombre}</div>
                                            <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">ID: {s.id.substring(0, 8)}...</div>
                                        </td>

                                        {/* Dirección con truncado inteligente */}
                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="text-sm text-gray-600 truncate" title={s.direccion}>
                                                {s.direccion}
                                            </div>
                                        </td>

                                        {/* Teléfono */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                {s.telefono}
                                            </div>
                                        </td>

                                        {/* Horario */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {s.horario.apertura} - {s.horario.cierre}
                                            </div>
                                        </td>

                                        {/* Estado isActive */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.isActive
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-100 text-slate-500"
                                                }`}>
                                                {s.isActive ? "Abierta" : "Cerrada"}
                                            </span>
                                        </td>

                                        {/* Acciones */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenModal(s)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleOpenDeleteModal(s)}
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
                        Total: <span className="text-gray-800">{sucursales.length} sucursales</span> registradas
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
            <SucursalesModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sucursal={selectedSucursal}
            />
            <SucursalesModalDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                sucursal={selectedSucursal}
            />
        </div>
    );
};

export default Sucursales;