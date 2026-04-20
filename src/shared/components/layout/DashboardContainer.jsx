import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { PlatillosPage } from "../../../features/platillos/pages/platillosPage.jsx";
import { Proveedores } from "../../../features/proveedores/components/proveedores.jsx";
export const DashboardContainer = () => {
 
  const [view, setView] = useState("welcome");
 
  const renderView = () => {
    switch (view) {
 
      case "Empleados":
        return <EmpleadosPage />;
 
      case "Inventario":
        return <InventarioPage />;
 
      case "Mesas":
        return <MesasPage />;
 
      case "Pedidos":
        return <PedidosPage />;
 
      case "Platillos":
        return <PlatillosPage />;
 
      case "Proveedores":
        return <Proveedores />;
 
      case "Reservaciones":
        return <ReservacionesPage />;
 
      case "Sucursales":
        return <SucursalesPage />;
 
      case "Usuarios":
        return <UsuariosPage />;
 
      case "Ventas":
        return <VentasPage />;
 
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">
              Bienvenido 👋
            </h1>
            <p className="text-gray-500">
              Selecciona una opción del menú para comenzar
            </p>
          </div>
        );
 
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