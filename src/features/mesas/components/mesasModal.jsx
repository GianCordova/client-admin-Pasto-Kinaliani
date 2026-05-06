import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const MesasModal = ({ isOpen, onClose, mesa, onSuccess }) => {
    const isEdit = !!mesa;
    const [sucursales, setSucursales] = useState([]);
    const [formData, setFormData] = useState({
        numero: '',
        capacidad: 1,
        sucursal: '',
        isAvailable: true
    });

    useEffect(() => {
        if (isOpen) {
            // Cargar sucursales para el select
            fetch("http://localhost:3002/gestionRestaurantes/v1/admin/sucursales")
                .then(res => res.json())
                .then(data => {
                    if(data.success) setSucursales(data.sucursales || data.data);
                })
                .catch(() => toast.error("Error al cargar sucursales"));
        }

        if (mesa && isOpen) {
            setFormData({
                numero: mesa.numero || '',
                capacidad: mesa.capacidad || 1,
                sucursal: mesa.sucursal?._id || mesa.sucursal || '',
                isAvailable: mesa.isAvailable ?? true
            });
        } else {
            setFormData({ numero: '', capacidad: 1, sucursal: '', isAvailable: true });
        }
    }, [mesa, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEdit 
            ? `http://localhost:3002/gestionRestaurantes/v1/admin/mesas/${mesa._id}`
            : `http://localhost:3002/gestionRestaurantes/v1/admin/mesas`;

        try {
            const response = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(isEdit ? "Actualizado" : "Creado");
                onSuccess();
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.message || "Error en la operación");
            }
        } catch (err) {
            toast.error("Error de conexión");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Mesa' : 'Nueva Mesa'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Número de Mesa</label>
                        <input
                            type="number"
                            required
                            className="w-full p-2 border rounded-lg"
                            value={formData.numero}
                            onChange={(e) => setFormData({...formData, numero: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Capacidad</label>
                        <input
                            type="number"
                            min="1"
                            required
                            className="w-full p-2 border rounded-lg"
                            value={formData.capacidad}
                            onChange={(e) => setFormData({...formData, capacidad: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Sucursal</label>
                        <select
                            required
                            className="w-full p-2 border rounded-lg"
                            value={formData.sucursal}
                            onChange={(e) => setFormData({...formData, sucursal: e.target.value})}
                        >
                            <option value="">Seleccionar...</option>
                            {sucursales.map(s => (
                                <option key={s._id} value={s._id}>{s.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.isAvailable}
                            onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                        />
                        <span className="text-sm">Disponible para reservas</span>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-orange-400 text-white rounded-lg">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};