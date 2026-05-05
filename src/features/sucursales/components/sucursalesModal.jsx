import React, { useState, useEffect } from 'react';

export const SucursalesModal = ({ isOpen, onClose, sucursal }) => {
    const isEdit = !!sucursal;
    
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        apertura: '08:00',
        cierre: '20:00',
        isActive: true
    });

    useEffect(() => {
        if (sucursal && isOpen) {
            setFormData({
                nombre: sucursal.nombre || '',
                direccion: sucursal.direccion || '',
                telefono: sucursal.telefono || '',
                apertura: sucursal.horario?.apertura || '08:00',
                cierre: sucursal.horario?.cierre || '20:00',
                isActive: sucursal.isActive ?? true
            });
        } else if (!sucursal && isOpen) {
            setFormData({
                nombre: '',
                direccion: '',
                telefono: '',
                apertura: '08:00',
                cierre: '20:00',
                isActive: true
            });
        }
    }, [sucursal, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would normally save to state or API
        console.log("Saving sucursal...", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-In">
                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? 'Editar Sucursal' : 'Nueva Sucursal'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Sucursal</label>
                            <input 
                                type="text" 
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Ej. Express Zona 10"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                            <input 
                                type="text" 
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Dirección completa"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                            <input 
                                type="text" 
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Ej. +502 2233-4455"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horario Apertura</label>
                                <input 
                                    type="time" 
                                    name="apertura"
                                    value={formData.apertura}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horario Cierre</label>
                                <input 
                                    type="time" 
                                    name="cierre"
                                    value={formData.cierre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input 
                                type="checkbox" 
                                id="isActive"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400 border-gray-300"
                            />
                            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                Sucursal Abierta / Activa
                            </label>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="px-5 py-2.5 bg-orange-400 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {isEdit ? 'Guardar Cambios' : 'Crear Sucursal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SucursalesModal;
