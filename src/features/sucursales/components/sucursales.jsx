import { SucursalesModal } from './sucursalesModal';
import { useSucursalesStore } from '../../usuarios/store/adminStore';
import { useUIStore } from '../../auth/store/uiStore';
import { useEffect, useState } from 'react';
import { useEffect as useToastEffect } from 'react';
import { showError } from '../../../shared/utils/toast';
import { deleteSucursal } from '../../../shared/api';

/**
 * Componente para la administración de Sucursales.
 * Basado en el esquema de Mongoose: nombre, dirección, teléfono, horario e isActive.
 */
export const Sucursales = () => {
    // Datos temporales basados en el esquema de Sucursales

    const { sucursales, loading, error, getSucursales } = useSucursalesStore();
    const { openConfirm } = useUIStore();

    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        getSucursales();
    }, [getSucursales]);

    useToastEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);

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
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    onClick={() => { setOpenModal(true); setSelectedItem(null); }}
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
                    />
                    <span className="absolute left-4 top-3.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sucursales.map((sucursal) => (
                    /* CARD */
                    <div
                        key={sucursal._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">

                        {/* IMAGEN */}
                        <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                            <img
                                src={`https://res.cloudinary.com/dzvyh0ywj/image/upload/v1777941991/kinalSports/${sucursal.photo}`}
                                alt={sucursal.nombre}
                                className="max-h-full max-w-full object-contain rounded-t-xl"
                            />
                        </div>

                        {/* CONTENIDO */}
                        <div className="p-5">
                            <h2 className="text-xl font-bold text-main-blue">
                                {sucursal.nombre}
                            </h2>

                            {/* BADGES */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                                    {sucursal.horario}
                                </span>

                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                                    {sucursal.telefono}
                                </span>
                            </div>

                            {/* INFO */}
                            <p className="text-sm text-gray-400 mt-2 truncate">
                                Dirección: {sucursal.direccion}
                            </p>

                            {/* BOTONES */}
                            <div className="flex gap-3 mt-5">
                                <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition"
                                    onClick={() => {
                                        setSelectedItem(sucursal);
                                        setOpenModal(true);
                                    }}
                                >
                                    ✏️ Editar
                                </button>

                                <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                                    onClick={() => {
                                        console.log("boton presionado eliminar");
                                        showConfirmToast({
                                            title: "Eliminar Sucursal",
                                            message: `¿Eliminar ${sucursal.nombre}?`,
                                            onConfirm: () => {
                                                deleteField(sucursal._id);
                                            }
                                        })
                                    }}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            <SucursalesModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedItem(null);
                }}
                selectedItem={selectedItem}
            />
        </div>
    );
};

export default Sucursales;