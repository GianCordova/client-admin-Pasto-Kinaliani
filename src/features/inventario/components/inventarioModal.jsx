import React, { useState, useEffect } from 'react';

export const InventarioModal = ({ isOpen, onClose, item }) => {

    const isEdit = !!item;

    const [formData, setFormData] = useState({
        sucursal: '',
        nombre: '',
        cantidad: 0,
        stockMinimo: 0,
        estado: 'disponible'
    });

    useEffect(() => {
        if (item && isOpen) {
            setFormData(item);
        } else if (!item && isOpen) {
            setFormData({
                sucursal: '',
                nombre: '',
                cantidad: 0,
                stockMinimo: 0,
                estado: 'disponible'
            });
        }
    }, [item, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">

            <div className="bg-white p-6 rounded-xl w-full max-w-lg">

                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? "Editar Producto" : "Nuevo Producto"}
                </h2>

                <div className="space-y-3">

                    <input name="nombre" value={formData.nombre} onChange={handleChange}
                        placeholder="Nombre" className="w-full border p-2 rounded" />

                    <input name="sucursal" value={formData.sucursal} onChange={handleChange}
                        placeholder="Sucursal" className="w-full border p-2 rounded" />

                    <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange}
                        className="w-full border p-2 rounded" />

                    <input type="number" name="stockMinimo" value={formData.stockMinimo} onChange={handleChange}
                        className="w-full border p-2 rounded" />

                    <select name="estado" value={formData.estado} onChange={handleChange}
                        className="w-full border p-2 rounded">
                        <option value="disponible">Disponible</option>
                        <option value="agotado">Agotado</option>
                        <option value="vencido">Vencido</option>
                    </select>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose}>Cancelar</button>
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">
                        {isEdit ? "Actualizar" : "Crear"}
                    </button>
                </div>

            </div>
        </div>
    );
};