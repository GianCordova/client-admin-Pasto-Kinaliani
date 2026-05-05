import React, { useState, useEffect } from 'react';

export const EmpleadosModal = ({ isOpen, onClose, empleado }) => {
    const isEdit = !!empleado;

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        surname: '',
        role: 'Mesero',
        branch: 'La Reformita',
        status: true
    });

    useEffect(() => {
        if (empleado && isOpen) {
            setFormData({ ...empleado });
        } else if (!empleado && isOpen) {
            setFormData({
                id: '',
                name: '',
                surname: '',
                role: 'Mesero',
                branch: 'La Reformita',
                status: true
            });
        }
    }, [empleado, isOpen]);

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
        console.log("Guardando empleado...", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? 'Editar Empleado' : 'Nuevo Empleado'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Puesto</label>
                                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                                    <option value="Mesero">Mesero</option>
                                    <option value="Chef">Chef</option>
                                    <option value="Bartender">Bartender</option>
                                    <option value="Gerente">Gerente</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                                <select name="branch" value={formData.branch} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                                    <option value="La Reformita">La Reformita</option>
                                    <option value="Zona 10">Zona 10</option>
                                    <option value="San Cristóbal">San Cristóbal</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input type="checkbox" id="status" name="status" checked={formData.status} onChange={handleChange} className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400 border-gray-300" />
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">En Turno / Activo</label>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg">Cancelar</button>
                        <button type="submit" className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-sm">
                            {isEdit ? 'Actualizar Colaborador' : 'Registrar Empleado'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};