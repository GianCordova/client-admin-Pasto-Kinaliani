import React, { useState } from 'react';

export const UsuariosFilter = ({ data, onFilter }) => {
    const [filters, setFilters] = useState({
        search: "",
        status: "todos"
    });

    const applyFilters = (f) => {
        const result = data.filter((u) => {
            const searchTerm = f.search.toLowerCase().trim();
            
            // Lógica de búsqueda expandida
            const matchesSearch = 
                u.name.toLowerCase().includes(searchTerm) || 
                u.surname.toLowerCase().includes(searchTerm) ||
                u.email.toLowerCase().includes(searchTerm) ||
                // Búsqueda por ID completo o parcial
                u._id.toLowerCase().includes(searchTerm); 
            
            const matchesStatus = f.status === "todos" || 
                                 (f.status === "activo" ? u.isActive : !u.isActive);
            
            return matchesSearch && matchesStatus;
        });
        onFilter(result);
    };

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        applyFilters(updated);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 relative">
                    <input
                        type="text"
                        placeholder="Buscar por Nombre, Correo o ID completo..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-700"
                        value={filters.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                    />
                    <span className="absolute left-4 top-3.5 text-gray-400">
                        {/* Icono de Lupa */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
                
                <select
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 text-gray-600 font-medium"
                    value={filters.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="activo">Solo Activos</option>
                    <option value="inactivo">Solo Inactivos</option>
                </select>
            </div>
            
            {/* Pequeño indicador de ayuda visual */}
            {filters.search && (
                <p className="text-[10px] text-gray-400 mt-2 ml-1 animate-pulse">
                    Filtrando resultados en tiempo real...
                </p>
            )}
        </div>
    );
};