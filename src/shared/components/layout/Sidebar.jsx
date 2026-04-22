// Recibimos setView como prop desde el DashboardContainer
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

  return (
    <aside className="w-60 bg-white min-h-[calc(100vh-4rem)] p-4 shadow-sm">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <div
              onClick={() => setView(item.label)}
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};