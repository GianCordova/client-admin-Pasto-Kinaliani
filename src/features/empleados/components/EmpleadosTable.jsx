import { useState } from "react";
import { TableTemplate } from "../../../shared/components/ui/TableTemplate";

export const EmpleadosTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Datos simulando el esquema de Empleado
  const [empleados] = useState([
    { id: "65f1a2b3c4d5e6f7a8b90123", name: "Juan", surname: "Pérez", dpi: "3001 45678 0101", puesto: "CHEF", status: true },
    { id: "65f1a2b3c4d5e6f7a8b90124", name: "María", surname: "García", dpi: "2500 12345 0108", puesto: "MESERO", status: true },
    { id: "65f1a2b3c4d5e6f7a8b90125", name: "Carlos", surname: "López", dpi: "1900 98765 0101", puesto: "LIMPIEZA", status: false },
  ]);

  const columns = ["name", "puesto", "dpi", "status"];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER similar al de Sucursales */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Empleados</h1>
          <p className="text-gray-500 text-sm mt-1">Administra el personal, sus puestos y estados de contratación.</p>
        </div>
        <button className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
          <span className="text-xl">+</span> Nuevo Empleado
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, puesto o DPI..."
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

      {/* TABLA USANDO EL TEMPLATE ACTUALIZADO */}
      <TableTemplate 
        columns={columns} 
        data={empleados} 
        onEdit={(emp) => console.log("Editando a:", emp.name)}
        onDelete={(id) => console.log("Eliminando ID:", id)}
      />

      {/* FOOTER de la tabla */}
      <div className="mt-4 text-xs text-gray-500 font-medium ml-2">
        Total: <span className="text-gray-800">{empleados.length} empleados</span> registrados
      </div>
    </div>
  );
};