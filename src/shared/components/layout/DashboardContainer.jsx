import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

// IMPORTA TU VISTA
import { ReservacionesPage } from "../../../features/reservaciones/pages/ReservacionesPage.jsx";

export const DashboardContainer = () => {

  const [view, setView] = useState("Reservaciones");

  return(
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        
        {/* Sidebar */}
        <Sidebar setView={setView} />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl">
          
          {view === "Reservaciones" && <ReservacionesPage />}

        </main>
      </div>
    </div>
  );
};