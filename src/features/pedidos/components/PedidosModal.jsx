import React, { useState, useEffect } from "react";

export const PedidosForm = ({ isOpen, onClose, pedido }) => {

    const isEdit = !!pedido;

    const [form, setForm] = useState({
        usuario: "",
        sucursal: "",
        total: "",
        status: "pendiente"
    });

    // 🔥 Cargar datos cuando es editar
    useEffect(() => {
        if (pedido && isOpen) {
            setForm({
                usuario: pedido.usuario || "",
                sucursal: pedido.sucursal || "",
                total: pedido.total || "",
                status: pedido.status || "pendiente"
            });
        } else if (!pedido && isOpen) {
            setForm({
                usuario: "",
                sucursal: "",
                total: "",
                status: "pendiente"
            });
        }
    }, [pedido, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Datos:", form);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Editar Pedido" : "Nuevo Pedido"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition p-1 rounded hover:bg-gray-200"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Usuario */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Usuario
                            </label>
                            <input
                                name="usuario"
                                value={form.usuario}
                                onChange={handleChange}
                                required
                                placeholder="Ej. USR001"
                                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Sucursal
                            </label>
                            <input
                                name="sucursal"
                                value={form.sucursal}
                                onChange={handleChange}
                                required
                                placeholder="Ej. Sucursal Centro"
                                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            />
                        </div>

                        {/* Total */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Total
                            </label>
                            <input
                                type="number"
                                name="total"
                                value={form.total}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            />
                        </div>

                        {/* Estado */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Estado
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="completado">Completado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>

                    </div>

                    {/* BOTONES */}
                    <div className="mt-6 flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-main-blue text-white rounded-lg hover:opacity-90"
                        >
                            {isEdit ? "Guardar Cambios" : "Crear Pedido"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default PedidosForm;