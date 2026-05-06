import React, { useState, useEffect } from 'react';
import { useInventarioStore } from '../../users/store/adminStore';
import { useSucursalesStore } from '../../usuarios/store/adminStore';

export const InventarioModal = ({ isOpen, onClose, item }) => {

    const { createInventario, updateInventario, loading } = useInventarioStore();
    const { sucursales, getSucursales } = useSucursalesStore();
    const isEdit = !!item;

    const [formData, setFormData] = useState({
        sucursal: '',
        nombre: '',
        cantidad: 0,
        stockMinimo: 0,
        estado: 'disponible'
    });

    useEffect(() => {
        if (sucursales.length === 0) {
            getSucursales();
        }
    }, []);

    useEffect(() => {
        if (item && isOpen) {
            setFormData({
                sucursal: item.sucursal?._id || item.sucursal || '',
                nombre: item.nombre || '',
                cantidad: item.cantidad || 0,
                stockMinimo: item.stockMinimo || 0,
                estado: item.estado || 'disponible'
            });
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
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'cantidad' || name === 'stockMinimo' ? Number(value) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateInventario(item._id, formData);
            } else {
                await createInventario(formData);
            }
            onClose();
        } catch (error) {
            console.error("Error guardando inventario", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Editar Producto" : "Nuevo Producto"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
                    <div className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                            <input 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleChange}
                                required
                                placeholder="Ej. Tomates frescos" 
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                            <select 
                                name="sucursal" 
                                value={formData.sucursal} 
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all cursor-pointer"
                            >
                                <option value="">Seleccione una sucursal</option>
                                {sucursales.map(suc => (
                                    <option key={suc._id} value={suc._id}>{suc.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad Actual</label>
                                <input 
                                    type="number" 
                                    name="cantidad" 
                                    value={formData.cantidad} 
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                                <input 
                                    type="number" 
                                    name="stockMinimo" 
                                    value={formData.stockMinimo} 
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <select 
                                name="estado" 
                                value={formData.estado} 
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all cursor-pointer"
                            >
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                                <option value="vencido">Vencido</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    Guardando...
                                </>
                            ) : (
                                isEdit ? "Actualizar Producto" : "Crear Producto"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};