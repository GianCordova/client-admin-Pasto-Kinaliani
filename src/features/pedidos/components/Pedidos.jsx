import { useState } from "react";
import { PedidosForm } from "./PedidosForm";
export const PedidosCards = () => {

    const [open, setOpen] = useState(false);

    const data = [
        {
            usuario: "USR001",
            sucursal: "Sucursal Centro",
            total: 120,
            status: "PENDIENTE",
            detalles: [
                { platillo: "Pizza", cantidad: 2, subtotal: 80 },
                { platillo: "Coca Cola", cantidad: 2, subtotal: 40 }
            ]
        },
        {
            usuario: "USR002",
            sucursal: "Sucursal Norte",
            total: 200,
            status: "COMPLETADO",
            detalles: [
                { platillo: "Hamburguesa", cantidad: 2, subtotal: 120 },
                { platillo: "Papas", cantidad: 1, subtotal: 80 }
            ]
        }
    ];

    return (
        <div className="p-4">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">

                <h2 className="text-2xl font-bold">
                    Pedidos
                </h2>

                <button onClick={() => setOpen(true)} className="group relative px-3 sm:px-5 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg">

                    {/* ICONO */}
                    <img
                        src="/src/assets/img/add.png"
                        alt="agregar"
                        className="
            w-5 h-5 
            transition-transform duration-500 ease-in-out
            sm:group-hover:-translate-x-[-150%] 
            group-hover:scale-110 filter invert
    "
                    />

                    {/* TEXTO */}
                    <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-500 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                        Agregar
                    </span>

                </button>

            </div>

            {/* MODAL (aquí luego metes tu form de pedidos) */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-3">Nuevo Pedido</h2>


                        <button
                            onClick={() => setOpen(false)}
                            className="mt-4 bg-gray-200 px-4 py-2 rounded"
                        >
                            Cerrar
                        </button> {open && (
                            <PedidosForm onClose={() => setOpen(false)} />
                        )}
                    </div>
                </div>
            )}

            {/* GRID DE CARDS */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {data.map((pedido, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
                    >

                        {/* USUARIO */}
                        <h3 className="text-lg font-bold text-main-blue">
                            {pedido.usuario}
                        </h3>

                        {/* INFO */}
                        <div className="mt-3 space-y-1 text-sm text-gray-700">

                            <p>
                                <span className="font-semibold">Sucursal:</span>{" "}
                                {pedido.sucursal}
                            </p>

                            <p>
                                <span className="font-semibold">Total:</span> Q{pedido.total}
                            </p>

                        </div>

                        {/* STATUS */}
                        <div className="mt-4">
                            <span className={`px-3 py-1 text-xs rounded-full font-medium
                ${pedido.status === "COMPLETADO"
                                    ? "bg-green-100 text-green-700"
                                    : pedido.status === "CANCELADO"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                {pedido.status}
                            </span>
                        </div>

                        {/* DETALLES */}
                        <div className="mt-4 text-xs text-gray-600 space-y-1">
                            {pedido.detalles.map((d, idx) => (
                                <p key={idx}>
                                    🍽 {d.platillo} x{d.cantidad} = Q{d.subtotal}
                                </p>
                            ))}
                        </div>

                        {/* BOTONES */}
                        <div className="flex gap-3 mt-5">

                            {/* EDITAR */}
                            <button className="group relative flex-1 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300">

                                <img
                                    src="/src/assets/img/pencil.png"
                                    alt="editar"
                                    className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-120%] group-hover:scale-110 filter invert"
                                />

                                <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                                    Editar
                                </span>

                            </button>

                            {/* ELIMINAR */}
                            <button className="group relative flex-1 py-2 rounded-lg bg-orange-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-orange-700">

                                <img
                                    src="/src/assets/img/delete.png"
                                    alt="eliminar"
                                    className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-150%] group-hover:scale-110 filter invert"
                                />

                                <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                                    Eliminar
                                </span>

                            </button>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};