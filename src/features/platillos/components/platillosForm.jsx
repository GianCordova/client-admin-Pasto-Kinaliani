import React, { useState, useEffect } from 'react';

export const PlatillosForm = ({ isOpen, onClose, platillo }) => {
    const isEdit = !!platillo;

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        isActive: true
    });

    // Efecto para cargar datos cuando se abre el modal (Editar o Nuevo)
    useEffect(() => {
        if (platillo && isOpen) {
            setForm({
                nombre: platillo.nombre || '',
                descripcion: platillo.descripcion || '',
                precio: platillo.precio || '',
                categoria: platillo.categoria || '',
                isActive: platillo.isActive ?? true
            });
        } else if (!platillo && isOpen) {
            setForm({
                nombre: '',
                descripcion: '',
                precio: '',
                categoria: '',
                isActive: true
            });
        }
    }, [platillo, isOpen]);

    // Si el modal no está abierto, no renderiza nada
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí validas y envías a tu API de Express/Mongoose
        console.log("Datos guardados:", form);
        onClose(); // Cierra el modal después de guardar
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-In">
                
                {/* Header Modal (Siguiendo el estilo de Proveedores) */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? 'Editar Platillo' : 'Nuevo Platillo'}
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
                        
                        {/* Fila: Nombre del Platillo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Platillo</label>
                            <input
                                name="nombre"
                                type="text"
                                required
                                value={form.nombre}
                                placeholder="Ej. Pizza Margarita"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                            />
                        </div>

                        {/* Campo: Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                name="descripcion"
                                rows="3"
                                required
                                value={form.descripcion}
                                placeholder="Detalles de los ingredientes..."
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Fila: Precio y Categoría */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (Q)</label>
                                <input
                                    name="precio"
                                    type="number"
                                    required
                                    value={form.precio}
                                    placeholder="0.00"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                <input
                                    name="categoria"
                                    type="text"
                                    required
                                    value={form.categoria}
                                    placeholder="Ej. Italiana"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Estado Activo (Toggle Switch) */}
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <label className="relative inline-flex items-center cursor-pointer gap-3">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    className="sr-only peer"
                                    checked={form.isActive}
                                    onChange={handleChange}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-400"></div>
                                <span className="text-sm font-medium text-gray-700">Platillo Activo</span>
                            </label>
                        </div>
                    </div>

                    {/* Botones de Acción */}
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
                            className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            {isEdit ? 'Guardar Cambios' : 'Crear Platillo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlatillosForm;