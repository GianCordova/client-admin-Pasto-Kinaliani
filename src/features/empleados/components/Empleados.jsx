import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore.js";
import { EmpleadosModal } from "./EmpleadosModal.jsx"; 
import { EmpleadosFilter } from "./EmpleadosFilter.jsx"; 
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const Empleados = () => {
  const { empleados, getEmpleados, deactivateEmpleado } = useAdminStore();
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => { 
    getEmpleados(); 
  }, []);

  // --- REGLA DE ORO ---
  // Creamos una lista que SOLO contenga a los vivos. 
  // Esta lista es la que le pasaremos al filtro.
  const empleadosActivos = empleados.filter(e => e.status === true);

  useEffect(() => { 
    // Al cargar o actualizar, mostramos solo los activos
    setFiltered(empleadosActivos); 
  }, [empleados]);

  const openCreate = () => { setSelected(null); setIsOpen(true); };
  const openEdit = (emp) => { setSelected(emp); setIsOpen(true); };

  const handleToggle = (emp) => {
    showConfirmToast({
        title: "Eliminar Empleado",
        message: `¿Estás seguro de que deseas eliminar a ${emp.name}?`,
        onConfirm: async () => {
            try {
                await deactivateEmpleado(emp._id);
                await getEmpleados(); 
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-3xl font-bold text-gray-800">Gestión de Empleados</h2>
           <p className="text-gray-500 text-sm">Personal operativo del restaurante.</p>
        </div>
        <button 
          onClick={openCreate} 
          className="px-5 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition shadow"
        >
          + Agregar Empleado
        </button>
      </div>

      {/* CLAVE AQUÍ: Pasamos 'empleadosActivos' en lugar de 'empleados' */}
      <EmpleadosFilter data={empleadosActivos} onFilter={setFiltered} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400">No hay empleados activos en esta sección.</div>
        ) : (
          filtered.map(e => (
            <div key={e._id} className="bg-white p-5 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{e.name} {e.surname}</h3>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">DPI: {e.dpi}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-green-100 text-green-700">
                  ACTIVO
                </span>
              </div>
              
              <p className="text-sm text-blue-600 font-semibold mt-2 uppercase">{e.puesto}</p>
              
              <div className="flex gap-2 mt-5">
                 <button 
                  onClick={() => openEdit(e)} 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-xs font-bold text-gray-600 transition"
                 >
                   Editar
                 </button>
                 <button 
                  onClick={() => handleToggle(e)} 
                  className="flex-1 py-2 rounded-lg text-white text-xs font-bold transition bg-red-500 hover:bg-red-600"
                 >
                  Eliminar
                 </button>
              </div>
            </div>
          ))
        )}
      </div>

      <EmpleadosModal isOpen={isOpen} onClose={() => setIsOpen(false)} empleado={selected} />
    </div>
  );
};