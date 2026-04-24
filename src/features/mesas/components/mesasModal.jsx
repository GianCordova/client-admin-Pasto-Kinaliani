import React, { useState, useEffect } from 'react';

export const MesasModal = ({ isOpen, onClose, mesa }) => {
    const isEdit = !!mesa;

    const [formData, setFormData] = useState({
        id: '',
        capacity: 4,
        branch: 'La Reformita',
        employee: 'Sin asignar',
        availability: true
    });

    useEffect(() => {
        if (mesa && isOpen) {
            setFormData({
                id: mesa.id || '',
                capacity: mesa.capacity || 4,
                branch: mesa.branch || '',
                employee: mesa.employee || '',
                availability: mesa.availability ?? true
            });
        } else if (!mesa && isOpen) {
            setFormData({
                id: '',
                capacity: 4,
                branch: 'La Reformita',
                employee: 'Sin asignar',
                availability: true
            });
        }
    }, [mesa, isOpen]);

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
        console.log("Saving mesa...", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-In">
                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? 'Editar Mesa' : 'Nueva Mesa'}
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Mesa</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                    placeholder="Ej. M-001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                            >
                                <option value="La Reformita">La Reformita</option>
                                <option value="Zona 10">Zona 10</option>
                                <option value="San Cristóbal">San Cristóbal</option>
                                <option value="Pradera Concepción">Pradera Concepción</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Empleado Asignado</label>
                            <input
                                type="text"
                                name="employee"
                                value={formData.employee}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                placeholder="Nombre del empleado"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="availability"
                                name="availability"
                                checked={formData.availability}
                                onChange={handleChange}
                                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400 border-gray-300"
                            />
                            <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                                Disponible
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
                            {isEdit ? 'Guardar Cambios' : 'Crear Mesa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MesasModal;
