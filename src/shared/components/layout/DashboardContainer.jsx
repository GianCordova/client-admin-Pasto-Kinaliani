import { useState } from "react"; // 1. Importamos useState
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Ventas } from "../../../features/ventas/components/ventas"; // 2. Importa tu componente
import {Inventario} from "../../../features/inventario/components/inventario";

export const DashboardContainer = () => {
  // 3. Estado para controlar qué componente se ve
  const [view, setView] = useState("welcome");

  // 4. Función para renderizar el contenido dinámico
  const renderView = () => {
    switch (view) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <h1 className="text-4xl font-bold text-gray-700 mb-4">
              Bienvenido a Pasto Kinaliani
            </h1>
            <p className="text-gray-500">
              Selecciona una opción para gestionar las ventas
            </p>
          </div>
        );

      case "Ventas":
        return <Ventas />;
      case "Inventario":
        return <Inventario/>;

      default:
        return <h2>Vista no encontrada</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar - Pasamos setView para que los botones cambien la vista */}
        <Sidebar setView={setView} />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl">
          {/* 5. Renderizamos la vista actual */}
          <div key={view} className="animate-fade">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};