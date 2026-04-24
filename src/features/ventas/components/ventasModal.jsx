import React, { useState, useEffect } from 'react';

export const VentasModal = ({ isOpen, onClose, venta }) => {
    const isEdit = !!venta;
    const [formData, setFormData] = useState({
        pedido: '',
        total: 0,
        metodoPago: 'EFECTIVO',
        fecha: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (venta && isOpen) {
            setFormData({
                pedido: venta.pedido || '',
                total: venta.total || 0,
                metodoPago: venta.metodoPago || 'EFECTIVO',
                fecha: new Date(venta.fecha).toISOString().split('T')[0]
            });
        } else if (!venta && isOpen) {
            setFormData({ pedido: '', total: 0, metodoPago: 'EFECTIVO', fecha: new Date().toISOString().split('T')[0] });
        }
    }, [venta, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Editar Venta' : 'Registrar Venta'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>

                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID del Pedido (Referencia)</label>
                        <input type="text" name="pedido" value={formData.pedido} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200" placeholder="Ej. PED-1024" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
                            <input type="number" name="total" value={formData.total} onChange={handleChange} min="0" step="0.01" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                        <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200">
                            <option value="EFECTIVO">Efectivo</option>
                            <option value="TARJETA">Tarjeta</option>
                            <option value="TRANSFERENCIA">Transferencia</option>
                        </select>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg">Cancelar</button>
                        <button type="submit" className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg shadow-sm">
                            {isEdit ? 'Actualizar Venta' : 'Confirmar Venta'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};