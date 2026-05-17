import { useEffect, useState } from "react";
import { usePedidosStore } from "../store/pedidosStore";
import { showConfirmToast } from "../../auth/components/ConfirmModalFer";
import { showApproveToast } from "../../auth/components/AprobedModal";
import { PedidosFilter } from "./PedidosFilter";

export const Pedidos = () => {
    const { pedidos, getPedidos, cancelPedido, completadoPedido } = usePedidosStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getPedidos();
    }, []);

    const handleDelete = (pedido) => {
        showConfirmToast({
            title: "Eliminar pedido",
            message: `¿Eliminar pedido ${pedido._id}?`,
            onConfirm: () => cancelPedido(pedido._id),
        });
    };

    const handleAprove = (pedido) => {
        showApproveToast({
            title: "Aprobar pedido",
            message: `¿Aprobar pedido ${pedido._id}?`,
            onConfirm: () => completadoPedido(pedido._id),
        });
    };

    // --- FILTRADO SEGURO RESISTENTE A ERRORES ---
    // El filtrado inteligente en Pedidos.jsx se mantiene sincronizado gracias al onSearch:
    const filtered = searchTerm
        ? pedidos.filter((p) => {
            const userName = typeof p.usuario === 'object' ? p.usuario?.name : p.usuario;
            const sucursalName = typeof p.sucursal === 'object' ? p.sucursal?.nombre : p.sucursal;

            return (
                (userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p._id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (sucursalName || "").toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        : pedidos; // Si no hay búsqueda por texto, muestra directamente lo que dictamine el store (por estado o fechas)

    const statusColors = {
        PENDIENTE: "bg-amber-50 text-amber-700 border-amber-200",
        COMPLETADO: "bg-emerald-50 text-emerald-700 border-emerald-200",
        CANCELADO: "bg-red-50 text-red-600 border-red-100",
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Pedidos</h2>
                    <p className="text-gray-500 text-sm mt-0.5">Gestión y control de flujo de pedidos del sistema.</p>
                </div>
            </div>

            {/* SEARCH / FILTROS COMPONENTE */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <PedidosFilter onSearch={(value) => setSearchTerm(value)} />
            </div>

            {/* GRID DE PEDIDOS ADAPTATIVO */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-12 font-medium bg-white rounded-xl border border-gray-200 shadow-sm">
                        No se encontraron pedidos que coincidan con la búsqueda.
                    </div>
                ) : (
                    filtered.map((p) => {
                        // Renderizado seguro si sucursal o usuario vienen como objetos o ID plano
                        const nombreSucursal = typeof p.sucursal === 'object' ? p.sucursal?.nombre : p.sucursal;
                        const nombreUsuario = typeof p.usuario === 'object' ? p.usuario?.name : p.usuario;

                        return (
                            <div
                                key={p._id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200"
                            >
                                <div>
                                    {/* HEADER CARD */}
                                    <div className="flex justify-between items-start gap-2 border-b border-gray-100 pb-3">
                                        <div className="truncate">
                                            <h3 className="text-base font-bold text-gray-900 truncate" title={nombreUsuario || "Cliente"}>
                                                {nombreUsuario || "Cliente"}
                                            </h3>
                                            <div className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase tracking-wider">
                                                ID: {p._id ? `${p._id.substring(0, 12)}...` : 'N/A'}
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 text-[10px] rounded-full font-black uppercase border tracking-wide whitespace-nowrap ${statusColors[p.status] || "bg-gray-100 text-gray-600"}`}>
                                            {p.status}
                                        </span>
                                    </div>

                                    {/* DETALLES DE LOGÍSTICA */}
                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between items-center bg-gray-50/70 p-2 rounded-lg border border-gray-100">
                                            <span className="text-xs font-bold text-gray-400 uppercase">Sucursal:</span>
                                            <span className="font-semibold text-gray-700 text-xs">{nombreSucursal || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-gray-400 uppercase">Fecha:</span>
                                            <span className="text-gray-500 font-medium">{p.createdAt ? new Date(p.createdAt).toLocaleString() : 'N/A'}</span>
                                        </div>

                                        {/* TABLA INTERNA MINI PARA LOS PLATILLOS (Evita que se rompan los renglones) */}
                                        <div className="mt-3 border border-gray-100 rounded-xl overflow-hidden bg-white">
                                            <div className="bg-gray-50 px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100">
                                                Artículos
                                            </div>
                                            <div className="max-h-32 overflow-y-auto divide-y divide-gray-50">
                                                {p.detalles && p.detalles.map((item, idx) => (
                                                    <div key={item._id || idx} className="p-2.5 flex justify-between items-center gap-2 text-xs">
                                                        <div className="truncate flex-1">
                                                            <p className="font-bold text-gray-800 truncate">{item.nombre || "Platillo Eliminado"}</p>
                                                            <p className="text-[10px] text-gray-400">Cant: {item.cantidad}</p>
                                                        </div>
                                                        <span className="font-mono font-semibold text-gray-700 whitespace-nowrap">
                                                            Q{item.subtotal}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TOTAL Y ACCIONES ACCESIBLES */}
                                <div className="mt-5 pt-3 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Total a Pagar:</span>
                                        <span className="text-xl font-black text-gray-900 font-mono">Q{p.total}</span>
                                    </div>

                                    {/* BOTONES de estado controlado */}
                                    {p.status === "PENDIENTE" && (
                                        <div className="flex gap-3">
                                            {/* COMPLETAR (Aprobar en verde corporativo) */}
                                            <button
                                                onClick={() => handleAprove(p)}
                                                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Completar
                                            </button>

                                            {/* CANCELAR (Rojo sutil/alerta) */}
                                            <button
                                                onClick={() => handleDelete(p)}
                                                className="flex-1 py-2.5 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Cancelar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* FOOTER METRICS */}
            <div className="mt-6 bg-white px-5 py-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Total en pantalla: <span className="text-gray-800 font-mono text-sm ml-1 font-black">{filtered.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Pedidos;