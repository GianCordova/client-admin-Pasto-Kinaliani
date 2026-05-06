import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const items = [
    { label: "Empleados", to: "/dashboard/empleados" },
    { label: "Inventario", to: "/dashboard/inventario" },
    { label: "Mesas", to: "/dashboard/mesas" },
    { label: "Pedidos", to: "/dashboard/pedidos" },
    { label: "Platillos", to: "/dashboard/platillos" },
    { label: "Proveedores", to: "/dashboard/proveedores" },
    { label: "Reservaciones", to: "/dashboard/reservaciones" },
    { label: "Sucursales", to: "/dashboard/sucursales" },
    { label: "Usuarios", to: "/dashboard/usuarios" },
    { label: "Ventas", to: "/dashboard/ventas" },
  ];

  return (
    <aside className="w-60 bg-white min-h-[calc(100vh-4rem)] p-4 shadow-sm">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${isActive
                  ? "text-orange-600 font-bold bg-gray-100"
                  : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};