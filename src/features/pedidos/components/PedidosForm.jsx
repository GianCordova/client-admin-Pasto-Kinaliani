import { useState } from "react";

export const PedidosForm = ({ onClose }) => {

    const [form, setForm] = useState({
        usuario: "",
        sucursal: "",
        total: 0,
        status: "PENDIENTE",
    });

    const [detalles, setDetalles] = useState([
        { platillo: "", cantidad: 1, subtotal: 0 }
    ]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 🔥 manejar detalles (platillos)
    const handleDetalleChange = (index, e) => {
        const newDetalles = [...detalles];
        newDetalles[index][e.target.name] = e.target.value;
        setDetalles(newDetalles);
    };

    const addDetalle = () => {
        setDetalles([
            ...detalles,
            { platillo: "", cantidad: 1, subtotal: 0 }
        ]);
    };

    const removeDetalle = (index) => {
        const newDetalles = detalles.filter((_, i) => i !== index);
        setDetalles(newDetalles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const pedidoFinal = {
            ...form,
            detalles
        };

        console.log(pedidoFinal);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3"
            onClick={onClose}
        >

            {/* CONTENEDOR */}
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}
                <div
                    className="p-4 text-white"
                    style={{
                        background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)"
                    }}
                >
                    <h2 className="text-xl font-bold">Nuevo Pedido</h2>
                    <p className="text-sm opacity-80">Completa los datos del pedido</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">

                    {/* USUARIO */}
                    <input
                        name="usuario"
                        onChange={handleChange}
                        placeholder="Usuario (ID)"
                        className="w-full border p-2 rounded"
                    />

                    {/* SUCURSAL */}
                    <input
                        name="sucursal"
                        onChange={handleChange}
                        placeholder="Sucursal (ID)"
                        className="w-full border p-2 rounded"
                    />

                    {/* DETALLES */}
                    <div className="space-y-3">

                        <h3 className="font-semibold">Platillos</h3>

                        {detalles.map((d, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2">

                                <input
                                    name="platillo"
                                    placeholder="Platillo"
                                    value={d.platillo}
                                    onChange={(e) => handleDetalleChange(index, e)}
                                    className="border p-2 rounded"
                                />

                                <input
                                    type="number"
                                    name="cantidad"
                                    placeholder="Cantidad"
                                    value={d.cantidad}
                                    onChange={(e) => handleDetalleChange(index, e)}
                                    className="border p-2 rounded"
                                />

                                <input
                                    type="number"
                                    name="subtotal"
                                    placeholder="Subtotal"
                                    value={d.subtotal}
                                    onChange={(e) => handleDetalleChange(index, e)}
                                    className="border p-2 rounded"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeDetalle(index)}
                                    className="col-span-3 text-red-500 text-sm"
                                >
                                    Eliminar
                                </button>

                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addDetalle}
                            className="text-blue-600 text-sm"
                        >
                            + Agregar platillo
                        </button>

                    </div>

                    {/* TOTAL */}
                    <input
                        type="number"
                        name="total"
                        onChange={handleChange}
                        placeholder="Total"
                        className="w-full border p-2 rounded"
                    />

                    {/* STATUS */}
                    <select
                        name="status"
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="COMPLETADO">COMPLETADO</option>
                        <option value="CANCELADO">CANCELADO</option>
                    </select>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-3 border-t">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-main-blue text-white rounded"
                        >
                            Guardar pedido
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};