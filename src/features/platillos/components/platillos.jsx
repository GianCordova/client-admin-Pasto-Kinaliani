import { useState } from "react";
import { PlatillosForm } from "./platillosForm";
import { PlatillosModalDelete } from "./platillosModalDelete.jsx";

export const Platillos = () => {
  // Datos temporales (Equivalente al setProveedores)
  const [platillos, setPlatillos] = useState([
    {
      id: "65f1a2b3c4d5e6f7a8b90201",
      nombre: "Pizza Margarita",
      descripcion: "Clásica con tomate, mozzarella y albahaca",
      precio: 80,
      categoria: "Comida Italiana",
      isActive: true
    },
    {
      id: "65f1a2b3c4d5e6f7a8b90202",
      nombre: "Hamburguesa Doble",
      descripcion: "Carne doble con queso y papas",
      precio: 65,
      categoria: "Comida Rápida",
      isActive: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // MODAL STATE (Igual a Proveedores)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlatillo, setSelectedPlatillo] = useState(null);

  // FUNCIONES DE CONTROL (Igual a Proveedores)
  const handleOpenModal = (platillo = null) => {
    setSelectedPlatillo(platillo);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (platillo) => {
    setSelectedPlatillo(platillo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted platillo:", selectedPlatillo?.nombre);
    // Aquí iría tu lógica de API
    setIsDeleteModalOpen(false);
  };

  // FILTRO (Igual a Proveedores, ajustado a campos de Platillos)
  const filteredPlatillos = platillos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER (Diseño original de Platillos, lógica de Proveedores) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Platillos</h2>
          <p className="text-gray-500 text-sm mt-1">Gestión del menú y disponibilidad de platillos.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()} 
          className="group relative px-5 py-2.5 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg font-semibold"
        >
          <img src="/src/assets/img/add.png" alt="agregar" className="w-5 h-5 filter invert mr-2" />
          <span>Nuevo Platillo</span>
        </button>
      </div>

      {/* FILTROS (Igual a Proveedores) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-gray-600"
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

      {/* GRID DE CARDS (Diseño original de Platillos) */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlatillos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            No se encontraron platillos que coincidan con la búsqueda.
          </div>
        ) : (
          filteredPlatillos.map((platillo) => (
            <div
              key={platillo.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-main-blue">{platillo.nombre}</h3>
              <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">ID: {platillo.id.substring(0, 8)}...</div>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Descripción:</span> {platillo.descripcion}</p>
                <p><span className="font-semibold">Precio:</span> Q{platillo.precio}</p>
                <p><span className="font-semibold">Categoría:</span> {platillo.categoria}</p>
              </div>

              <div className="mt-4">
                <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider
                  ${platillo.isActive ? "bg-green-100 text-green-700" : "bg-red-50 text-red-400 border border-red-100"}`}>
                  {platillo.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="flex gap-3 mt-5">
                <button 
                  onClick={() => handleOpenModal(platillo)}
                  className="group relative flex-1 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300"
                >
                  <img src="/src/assets/img/pencil.png" alt="editar" className="w-5 h-5 filter invert mr-2" />
                  <span className="font-medium">Editar</span>
                </button>

                <button 
                  onClick={() => handleOpenDeleteModal(platillo)}
                  className="group relative flex-1 py-2 rounded-lg bg-orange-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-orange-700"
                >
                  <img src="/src/assets/img/delete.png" alt="eliminar" className="w-5 h-5 filter invert mr-2" />
                  <span className="font-medium">Eliminar</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER (Igual a Proveedores) */}
      <div className="mt-6 bg-white px-6 py-4 rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="text-xs text-gray-500 font-medium">
          Total: <span className="text-gray-800">{filteredPlatillos.length} platillos</span> en el menú
        </div>
      </div>

      {/* MODALES (Igual a Proveedores) */}
      <PlatillosForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platillo={selectedPlatillo}
      />
      <PlatillosModalDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        platillo={selectedPlatillo}
      />
    </div>
  );
};

export default Platillos;