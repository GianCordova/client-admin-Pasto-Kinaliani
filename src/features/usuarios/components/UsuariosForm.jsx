import { useState } from "react";

export const UsuariosForm = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <form className="space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nombre</label>
          <input name="name" onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none" placeholder="Ej. Juan" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Apellido</label>
          <input name="surname" onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none" placeholder="Ej. Pérez" />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Correo Electrónico</label>
        <input type="email" name="email" onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none" placeholder="correo@ejemplo.com" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Teléfono (8 dígitos)</label>
          <input type="text" name="phone" maxLength="8" onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none" placeholder="12345678" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Estado</label>
          <select name="isActive" onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none">
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Dirección Completa</label>
        <textarea name="address" onChange={handleChange} rows="2" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-100 outline-none" placeholder="Av. Reforma, Ciudad de Guatemala..."></textarea>
      </div>

      <button type="submit" className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-md">
        Guardar Usuario
      </button>
    </form>
  );
};