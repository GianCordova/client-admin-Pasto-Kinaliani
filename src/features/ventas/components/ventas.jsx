import { useEffect, useState } from "react";
import { useVentasStore } from "../../users/store/adminStore";

export const Ventas = () => {

    const { ventas, getVentas, loading } = useVentasStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterMetodo, setFilterMetodo] = useState("todos");

    useEffect(() => {
        getVentas();
    }, []);

    const safeVentas = ventas || [];

    const filtered = safeVentas.filter(v => {
        const matchSearch =
            !searchTerm ||
            v.pedido?.toString().toLowerCase().includes(searchTerm.toLowerCase());

        const matchMetodo =
            filterMetodo === "todos" || v.metodoPago === filterMetodo;

        return matchSearch && matchMetodo;
    });

    const getMetodoPagoBadge = (metodo) => {
        switch (metodo) {
            case "EFECTIVO":
                return <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium border border-emerald-200">Efectivo</span>;
            case "TARJETA":
                return <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium border border-blue-200">Tarjeta</span>;
            case "TRANSFERENCIA":
                return <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium border border-purple-200">Transferencia</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium border border-gray-200">{metodo}</span>;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const totalRevenue = filtered.reduce((acc, curr) => acc + (curr.total || 0), 0);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Historial de Ventas</h1>
                    <p className="text-gray-500 text-sm mt-1">Consulta los registros de ventas generados automáticamente.</p>
                </div>

                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <span className="text-gray-500 text-sm font-medium">Ingresos Totales</span>
                    <span className="text-2xl font-bold text-emerald-600">Q{totalRevenue.toFixed(2)}</span>
                </div>
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
                        placeholder="Buscar por ID de pedido..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={filterMetodo}
                    onChange={(e) => setFilterMetodo(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-orange-200 outline-none cursor-pointer transition-all"
                >
                    <option value="todos">Todos los métodos</option>
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="TARJETA">Tarjeta</option>
                    <option value="TRANSFERENCIA">Transferencia</option>
                </select>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Cargando registros de ventas...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="p-4 px-6">ID Pedido</th>
                                    <th className="p-4 px-6">Fecha</th>
                                    <th className="p-4 px-6">Método de Pago</th>
                                    <th className="p-4 px-6 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-12 text-center text-gray-400 font-medium">
                                            No se encontraron ventas con los filtros aplicados.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(v => (
                                        <tr key={v._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-4 px-6">
                                                <span className="font-medium text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md text-sm border border-gray-200 group-hover:border-gray-300 transition-colors">
                                                    {v.pedido}
                                                </span>
                                            </td>
                                            <td className="p-4 px-6 text-sm text-gray-600">
                                                {formatDate(v.fecha)}
                                            </td>
                                            <td className="p-4 px-6">
                                                {getMetodoPagoBadge(v.metodoPago)}
                                            </td>
                                            <td className="p-4 px-6 text-right">
                                                <span className="font-bold text-gray-900">Q{v.total?.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-between items-center text-sm text-gray-500 font-medium">
                <p>Mostrando {filtered.length} registro(s)</p>
            </div>

        </div>
    );
};