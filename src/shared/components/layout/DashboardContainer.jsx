import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const DashboardContainer = () => {

  return(
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-blue-500 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        <main className="flex-1 p-6 bg-white/90 rounded-tl-2xl">
          {/* Children */}
          Contenido del menú PastoKinalini
        </main>
      </div>
    </div>
  );
}