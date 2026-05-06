import { useEffect, useState } from "react";
import { useInventarioStore } from "../../users/store/adminStore";
import { InventarioModal } from "./inventarioModal";

export const Inventario = () => {

    const {
        inventarios,
        getInventarios,
        activarInventario,
        desactivarInventario
    } = useInventarioStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterEstado, setFilterEstado] = useState("todos");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        getInventarios();
    }, []);

    const safeInventarios = inventarios || [];

    const filtered = safeInventarios.filter(i =>
        (i.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         (i.sucursal?.nombre || i.sucursal)?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterEstado === "todos" || i.estado === filterEstado)
    );

    const handleOpenModal = (item = null) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const getStatusBadge = (estado) => {
        if (estado === "disponible") {
            return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-200 flex items-center w-fit"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>Disponible</span>;
        } else if (estado === "agotado") {
            return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-medium border border-red-200 flex items-center w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>Agotado</span>;
        }
        return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-200 flex items-center w-fit"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>Vencido</span>;
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Inventario</h1>
                    <p className="text-gray-500 text-sm mt-1">Control de productos y existencias</p>
                </div>

                <button  onClick={() => { setIsModalOpen(true); setSelectedItem(null); }}
                    className="bg-orange-500 hover:bg-orange-600 transition-colors px-6 py-2.5 rounded-xl text-white font-medium shadow-sm flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Nuevo Producto
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o sucursal..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-orange-200 outline-none cursor-pointer transition-all"
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="disponible">Disponible</option>
                    <option value="agotado">Agotado</option>
                    <option value="vencido">Vencido</option>
                </select>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="p-4 px-6">Producto</th>
                                <th className="p-4 px-6">Sucursal</th>
                                <th className="p-4 px-6 text-center">Cantidad</th>
                                <th className="p-4 px-6 text-center">Stock Mínimo</th>
                                <th className="p-4 px-6">Estado</th>
                                <th className="p-4 px-6 text-right">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                                        No se encontraron productos en el inventario.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(i => (
                                    <tr key={i._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4 px-6 font-medium text-gray-900">{i.nombre}</td>
                                        <td className="p-4 px-6 text-sm text-gray-600">{i.sucursal?.nombre || i.sucursal}</td>
                                        <td className="p-4 px-6 text-center">
                                            <span className={`font-bold ${i.cantidad <= (i.stockMinimo || 0) ? 'text-red-600' : 'text-gray-900'}`}>
                                                {i.cantidad}
                                            </span>
                                        </td>
                                        <td className="p-4 px-6 text-center text-sm text-gray-500">{i.stockMinimo || 0}</td>

                                        <td className="p-4 px-6">
                                            {getStatusBadge(i.estado)}
                                        </td>

                                        <td className="p-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenModal(i)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Editar producto"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                </button>
                                                {i.estado === "disponible" ? (
                                                    <button 
                                                        onClick={() => desactivarInventario(i._id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Agotar"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => activarInventario(i._id)}
                                                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="Hacer Disponible"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <InventarioModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                item={selectedItem} 
            />

        </div>
    );
};