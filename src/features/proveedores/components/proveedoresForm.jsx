import { useState } from "react";

export const ProveedoresForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dpi: "",
    telefono: "",
    correo: "",
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      // Manejo especial para el checkbox de estado activo
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí validas y envías a tu API de Express/Mongoose
    console.log("Datos enviados:", form);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Proveedor</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Fila: Nombre y Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              name="nombre"
              type="text"
              required
              placeholder="Ej. Juan"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              name="apellido"
              type="text"
              required
              placeholder="Ej. Pérez"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Campo: DPI (Validación de 13 dígitos según tu esquema) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">DPI (13 dígitos)</label>
          <input
            name="dpi"
            type="text"
            required
            maxLength="13"
            minLength="13"
            placeholder="2541 00000 0101"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
          />
        </div>

        {/* Fila: Teléfono y Correo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              name="telefono"
              type="tel"
              required
              placeholder="5544-3322"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              name="correo"
              type="email"
              required
              placeholder="proveedor@empresa.com"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Estado Activo */}
        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
          <label className="relative inline-flex items-center cursor-pointer gap-3">
            <input
              type="checkbox"
              name="isActive"
              className="sr-only peer"
              checked={form.isActive}
              onChange={handleChange}
            />
            {/* Toggle Switch Visual */}
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            <span className="text-sm font-medium text-gray-700">Proveedor Activo</span>
          </label>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95"
          >
            Guardar Proveedor
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};