import React, { useState, useEffect } from 'react';
import { ProveedoresForm } from './proveedoresForm';
import { showConfirmToast } from '../../auth/components/ConfirmModal.jsx';
import { toast } from 'react-hot-toast';

export const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const API_URL = "http://localhost:3002/gestionRestaurantes/v1/proveedores";

  const fetchProveedores = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setProveedores(data);
      } else if (data && typeof data === 'object') {
        const list = data.proveedores || data.data || data.results || [];
        setProveedores(list);
      }
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
      toast.error("No se pudieron cargar los proveedores");
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleOpenModal = (proveedor = null) => {
    setSelectedProveedor(proveedor);
    setIsModalOpen(true);
  };

 const handleDeleteClick = (proveedor) => {
  const idToDelete = proveedor._id || proveedor.id;

  showConfirmToast({
    title: "¿Desactivar Proveedor?",
    message: "El proveedor permanecerá en la lista pero marcará como inactivo.",
    proveedor,
    onConfirm: async () => {
      try {
        const response = await fetch(`${API_URL}/${idToDelete}/desactivar`, {
          method: 'PUT'
        });

        if (!response.ok) {
          const errorData = await response.json();
          return toast.error(errorData.message || "Error al desactivar");
        }

        // --- CAMBIO AQUÍ: No filtramos, actualizamos el estado ---
        setProveedores(prev =>
          prev.map(p => 
            (p._id || p.id) === idToDelete 
              ? { ...p, isActive: false } // Cambiamos solo este proveedor
              : p // Los demás se quedan igual
          )
        );

        toast.success("Proveedor desactivado correctamente");

      } catch (error) {
        toast.error("Error de conexión con el servidor");
      }
    }
  });
};
  const filteredProveedores = proveedores.filter(p =>
    (p.nombre?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.apellido?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.dpi?.includes(searchTerm))
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Proveedores</h1>
          <p className="text-gray-500 text-sm mt-1">
            Listado oficial de proveedores, gestión de contactos y estado de actividad.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo Proveedor
        </button>
      </div>

      {/* FILTROS */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o DPI..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* TABLA CON DISEÑO MEJORADO */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Nombre Completo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">DPI</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Contacto</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Gestión</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredProveedores.length > 0 ? (
                filteredProveedores.map((p) => (
                  <tr key={p._id || p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{p.nombre} {p.apellido}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase">
                        ID: {(p._id || p.id).substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.dpi}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{p.telefono}</div>
                      <div className="text-xs text-gray-400">{p.correo || 'Sin correo'}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        p.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-50 text-red-400"
                      }`}>
                        {p.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(p)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400">
                    No se encontraron proveedores registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProveedoresForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        proveedor={selectedProveedor}
        onSuccess={() => {
          fetchProveedores();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Proveedores;