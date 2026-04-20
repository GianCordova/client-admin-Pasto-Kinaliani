import { useState } from "react";
import { TableTemplate } from "../../../shared/components/ui/TableTemplate";

export const UsuariosTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Datos temporales basados en tu modelo Usuario
  const [usuarios] = useState([
    { 
        id: "65f1a2b3c4d5e6f7a8b90999", 
        name: "Esteban", 
        surname: "Quito", 
        email: "esteban.q@mail.com", 
        address: "Ciudad de Guatemala, Zona 1", 
        phone: "55443322", 
        status: true // Mapeamos isActive a status para el TableTemplate
    },
    { 
        id: "65f1a2b3c4d5e6f7a8b90888", 
        name: "Rosa", 
        surname: "Melano", 
        email: "rosa.m@mail.com", 
        address: "Antigua Guatemala", 
        phone: "99887766", 
        status: false 
    }
  ]);

  // Definimos qué columnas queremos ver (deben coincidir con las llaves del objeto)
  // Nota: Usamos "name" porque el Template ya concatena name + surname
  const columns = ["name", "email", "phone", "address", "status"];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Usuarios</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona los clientes y sus datos de contacto registrados.</p>
        </div>
        <button className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          Nuevo Usuario
        </button>
      </div>

      {/* FILTRO DE BÚSQUEDA */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
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

      {/* TABLA REUTILIZABLE */}
      <TableTemplate 
        columns={columns} 
        data={usuarios} 
        onEdit={(user) => console.log("Editando:", user.email)}
        onDelete={(id) => console.log("Eliminando ID:", id)}
      />
      {/* FOOTER de la tabla */}
      <div className="mt-4 text-xs text-gray-500 font-medium ml-2">
        Total: <span className="text-gray-800">{usuarios.length} usuarios</span> registrados
      </div>
    </div>
  );
};