import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

// Importamos directamente el archivo único de cada feature
import { Empleados } from "../../../features/empleados/components/Empleados.jsx";
import { Usuarios } from "../../../features/usuarios/components/Usuarios.jsx"; 

export const DashboardContainer = () => {
  const [view, setView] = useState("Empleados");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar setView={setView} />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl shadow-2xl">
          {/* Cada componente es dueño de su propia tabla y lógica */}
          {view === "Empleados" && <Empleados />}
          {view === "Usuarios" && <Usuarios />}
          
          {view === "Dashboard" && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <h2 className="text-3xl font-bold">Bienvenido</h2>
              <p>Selecciona una opción para comenzar.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};