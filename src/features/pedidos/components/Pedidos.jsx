import { useEffect, useState } from "react";
import { usePedidosStore } from "../../users/store/adminStore";
import { showConfirmToast } from "../../auth/components/ConfirmModalFer";
import { showApproveToast } from "../../auth/components/AprobedModal";
import { PedidosFilter } from "./PedidosFilter";

export const Pedidos = () => {
    const { pedidos, getPedidos, cancelPedido, completadoPedido, getPedidosByStatus } = usePedidosStore();
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

    // Filtrado por texto libre: usuario, ID o sucursal
    const filtered = searchTerm
        ? pedidos.filter((p) =>
            (p.usuario?.name || p.usuario || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (p._id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.sucursal?.nombre || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
        : pedidos; // si no hay searchTerm, muestra todos los pedidos del store

    const statusColors = {
        PENDIENTE: "bg-yellow-100 text-yellow-700",
        COMPLETADO: "bg-green-100 text-green-700",
        CANCELADO: "bg-red-100 text-red-700",
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Pedidos</h2>
                <p className="text-gray-500 text-sm mt-1">Gestión de pedidos del sistema.</p>
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
                <PedidosFilter
                    onSearch={(value) => setSearchTerm(value)}
                />
            </div>
            {/* GRID DE PEDIDOS */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-12">
                        No se encontraron pedidos.
                    </div>
                ) : (
                    filtered.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all duration-300"
                        >
                            {/* HEADER CARD */}
                            <h3 className="text-lg font-bold text-main-blue">{p.usuario?.name || p.usuario}</h3>
                            <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">
                                ID: {p._id}
                            </div>

                            {/* DETALLES */}
                            <div className="mt-3 space-y-1 text-sm text-gray-700">
                                <p><span className="font-semibold">Sucursal:</span> {p.sucursal}</p>
                                <p><span className="font-semibold">Fecha:</span> {new Date(p.createdAt).toLocaleString()}</p>

                                <div className="mt-2">
                                    <span className="font-semibold">Detalles:</span>
                                    <ul className="mt-1 ml-4 list-disc text-gray-600">
                                        {p.detalles.map((item) => (
                                            <li key={item._id}>
                                                Platillo: {item.platillo}, Cantidad: {item.cantidad}, Subtotal: Q{item.subtotal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p><span className="font-semibold">Total:</span> Q{p.total}</p>

                                <p>
                                    <span className="font-semibold">Estado:</span>{" "}
                                    <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${statusColors[p.status] || "bg-gray-100 text-gray-700"}`}>
                                        {p.status}
                                    </span>
                                </p>
                            </div>


                            {/* BOTONES solo si el pedido está pendiente */}
                            {p.status === "PENDIENTE" && (
                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => handleAprove(p)}
                                        className="group relative flex-1 py-2 rounded-lg bg-orange-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-orange-700"
                                    >
                                        <img
                                            src="/src/assets/img/add.png"
                                            alt="completar"
                                            className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-150%] group-hover:scale-110 filter invert"
                                        />
                                        <span className="font-medium hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                                            Completar
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p)}
                                        className="group relative flex-1 py-2 rounded-lg bg-orange-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-orange-700"
                                    >
                                        <img
                                            src="/src/assets/img/delete.png"
                                            alt="cancelar"
                                            className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-150%] group-hover:scale-110 filter invert"
                                        />
                                        <span className="font-medium hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                                            Cancelar
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* TOTAL */}
            <div className="mt-6 bg-white px-6 py-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="text-xs text-gray-500 font-medium">
                    Total: <span className="text-gray-800">{filtered.length} pedidos</span>
                </div>
            </div>
        </div>
    );
};

export default Pedidos;