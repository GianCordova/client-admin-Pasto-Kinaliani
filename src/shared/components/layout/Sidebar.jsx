import { useState } from "react";

export const Sidebar = ({ setView }) => {
  const items = [
    { label: "Empleados" },
    { label: "Inventario" },
    { label: "Mesas" },
    { label: "Pedidos" },
    { label: "Platillos" },
    { label: "Proveedores" },
    { label: "Reservaciones" },
    { label: "Sucursales" },
    { label: "Usuarios" },
    { label: "Ventas" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="w-60 bg-white min-h-[calc(100vh-4rem)] p-4 shadow-sm relative">

      {/* Fondo animado */}
      <div
        className="absolute left-4 right-4 h-10 bg-orange-400 rounded-lg transition-all duration-300"
        style={{
          top: `${activeIndex * 44 + 16}px`,
        }}
      />

      <ul className="space-y-1 relative">
        {items.map((item, index) => (
          <li key={item.label}>
            <div
              onClick={() => {
                setActiveIndex(index);
                setView(item.label);
              }}
              className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors relative z-10
                ${activeIndex === index
                  ? "text-white"
                  : "text-gray-700 hover:bg-orange-100"
                }`}
            >
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};