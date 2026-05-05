import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const ProveedoresForm = ({ isOpen, onClose, proveedor, onSuccess }) => {
    const isEdit = !!proveedor;

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        dpi: "",
        telefono: "",
        correo: "",
        isActive: true
    });

    // Cargar datos en el formulario al abrir (Soporte para _id de MongoDB)
    useEffect(() => {
        if (proveedor && isOpen) {
            setForm({
                nombre: proveedor.nombre || '',
                apellido: proveedor.apellido || '',
                dpi: proveedor.dpi || '',
                telefono: proveedor.telefono || '',
                correo: proveedor.correo || '',
                isActive: proveedor.isActive ?? true
            });
        } else if (!proveedor && isOpen) {
            setForm({
                nombre: '',
                apellido: '',
                dpi: '',
                telefono: '',
                correo: '',
                isActive: true
            });
        }
    }, [proveedor, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const API_URL = "http://localhost:3001/gestionRestaurantes/v1/admin/proveedores";
        
        try {
            // Priorizamos _id que es el que usa MongoDB por defecto
            const idParaUrl = proveedor?._id || proveedor?.id;
            const url = isEdit ? `${API_URL}/${idParaUrl}` : API_URL;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(isEdit ? "Actualizado correctamente" : "Creado con éxito");
                
                // 1. Ejecutar el refresh de la tabla en el componente padre
                if (onSuccess) await onSuccess(); 
                
                // 2. Limpiar el estado local
                setForm({ nombre: "", apellido: "", dpi: "", telefono: "", correo: "", isActive: true });
                
                // 3. Cerrar modal
                onClose(); 
            } else {
                toast.error(data.message || "Error en la operación");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            toast.error("Error de conexión");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-In">
                
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    name="nombre"
                                    type="text"
                                    required
                                    value={form.nombre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                <input
                                    name="apellido"
                                    type="text"
                                    required
                                    value={form.apellido}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DPI (13 dígitos)</label>
                            <input
                                name="dpi"
                                type="text"
                                required
                                maxLength="13"
                                value={form.dpi}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    name="telefono"
                                    type="tel"
                                    required
                                    value={form.telefono}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                <input
                                    name="correo"
                                    type="email"
                                    required
                                    value={form.correo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <label className="relative inline-flex items-center cursor-pointer gap-3">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    className="sr-only peer"
                                    checked={form.isActive}
                                    onChange={handleChange}
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                <span className="text-sm font-medium text-gray-700">Proveedor Activo</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Cancelar
                        </button>
                        <button type="submit" className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg shadow-sm">
                            {isEdit ? 'Guardar Cambios' : 'Crear Proveedor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProveedoresForm;