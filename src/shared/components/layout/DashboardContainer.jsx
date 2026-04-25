import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Reservaciones } from "../../../features/reservaciones/components/Reservaciones.jsx";
import { Pedidos } from "../../../features/pedidos/components/Pedidos.jsx";
import { Empleados } from "../../../features/empleados/components/Empleados.jsx";
import { Inventario } from "../../../features/inventario/components/Inventario.jsx";
import { Mesas } from "../../../features/mesas/components/Mesas.jsx";
import { Platillos } from "../../../features/platillos/components/Platillos.jsx";
import { Proveedores } from "../../../features/proveedores/components/Proveedores.jsx";
import { Sucursales } from "../../../features/sucursales/components/Sucursales.jsx";
import { Usuarios } from "../../../features/usuarios/components/Usuarios.jsx";
import { Ventas } from "../../../features/ventas/components/Ventas.jsx";


export const DashboardContainer = () => {

  const [view, setView] = useState("welcome");

  const renderView = () => {
    switch (view) {

      case "Empleados":
        return <Empleados />;

      case "Inventario":
        return <Inventario />;

      case "Mesas":
        return <Mesas />;

      case "Pedidos":
        return <Pedidos />;

      case "Platillos":
        return <Platillos />;

      case "Proveedores":
        return <Proveedores />;

      case "Reservaciones":
        return <Reservaciones />;

      case "Sucursales":
        return <Sucursales />;

      case "Usuarios":
        return <Usuarios />;

      case "Ventas":
        return <Ventas />;

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