import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Mesas } from "../../../features/mesas/components/mesas";
import { Sucursales } from "../../../features/sucursales/components/sucursales";

export const DashboardContainer = () => {

  const [view, setView] = useState("welcome");

  const renderView = () => {
    switch (view) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">
              Bienvenido a Pasto Kinaliani
            </h1>
            <p className="text-gray-500">
              Selecciona una opción del menú para comenzar
            </p>
          </div>
        );

      case "Mesas":
        return <Mesas />;

      case "Sucursales":
        return <Sucursales />;

      default:
        return <h2>Vista no encontrada</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">

      <Navbar />

      <div className="flex flex-1">

        <Sidebar setView={setView} />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl relative overflow-hidden">

          {/* CONTENIDO CON ANIMACIÓN */}
          <div
            key={view}
            className="w-full h-full animate-fade"
          >
            {renderView()}
          </div>

        </main>

      </div>
    </div>
  );
};