import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

import { EmpleadosPage } from "../../../features/empleados/pages/EmpleadosPage.jsx";
import { UsuariosPage } from "../../../features/usuarios/pages/UsuariosPage.jsx"; 

export const DashboardContainer = () => {
  const [view, setView] = useState("Empleados");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar setView={setView} />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl">
          {view === "Empleados" && <EmpleadosPage />}
          
          {view === "Usuarios" && <UsuariosPage />}
          
          {view === "Dashboard" && (
            <div className="text-center p-10 text-gray-500">
              <h2 className="text-2xl font-bold">Bienvenido al Sistema</h2>
              <p>Selecciona una opción del menú lateral.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};