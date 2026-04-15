import { useState } from "react";

export const ToggleMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-orange-500 text-white px-3 py-1 rounded-lg"
      >
        ⚙️
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-50">
          <button className="block w-full px-4 py-2 hover:bg-gray-100">
            ➕ Agregar
          </button>
          <button className="block w-full px-4 py-2 hover:bg-gray-100">
            ✏️ Actualizar
          </button>
          <button className="block w-full px-4 py-2 hover:bg-gray-100 text-red-500">
            🗑️ Eliminar
          </button>
        </div>
      )}
    </div>
  );
};