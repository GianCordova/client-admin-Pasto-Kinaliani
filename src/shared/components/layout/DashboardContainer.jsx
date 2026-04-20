import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

import { ReservacionesPage } from "../../../features/reservaciones/pages/ReservacionesPage.jsx";
// importa más vistas aquí cuando las tengas
// import { EquiposPage } from "...";

export const DashboardContainer = () => {

  const [view, setView] = useState("Reservaciones");

  const renderView = () => {
    switch (view) {

      case "Reservaciones":
        return <ReservacionesPage />;

      default:
        return <h2 className="text-gray-500">Vista no encontrada</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">

      <Navbar />

      <div className="flex flex-1">

        <Sidebar setView={setView} />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl">
          {renderView()}
        </main>

      </div>
    </div>
  );
};