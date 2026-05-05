import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

import { Ventas } from "../../../features/ventas/components/ventas.jsx";
import { Inventario } from "../../../features/inventario/components/inventario.jsx";
import { Reservaciones } from "../../../features/reservaciones/components/Reservaciones.jsx";
import { Pedidos } from "../../../features/pedidos/components/Pedidos.jsx";
import { Empleados } from "../../../features/empleados/components/Empleados.jsx";
import { Mesas } from "../../../features/mesas/components/mesas.jsx";
import { Platillos } from "../../../features/platillos/components/platillos.jsx";
import { Proveedores } from "../../../features/proveedores/components/proveedores.jsx";
import { Sucursales } from "../../../features/sucursales/components/sucursales.jsx";
import { Usuarios } from "../../../features/usuarios/components/Usuarios.jsx";

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
              Selecciona una opción del menú
            </p>
          </div>
        );

      case "Ventas":
        return <Ventas />;

      case "Inventario":
        return <Inventario />;

      case "Reservaciones":
        return <Reservaciones />;

      case "Pedidos":
        return <Pedidos />;

      case "Empleados":
        return <Empleados />;

      case "Mesas":
        return <Mesas />;

      case "Platillos":
        return <Platillos />;

      case "Proveedores":
        return <Proveedores />;

      case "Sucursales":
        return <Sucursales />;

      case "Usuarios":
        return <Usuarios />;

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
          <div key={view} className="w-full h-full animate-fade">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};