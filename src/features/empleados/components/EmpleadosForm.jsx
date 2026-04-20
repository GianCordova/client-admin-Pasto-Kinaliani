import { useState } from "react";

export const EmpleadosForm = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    dpi: "",
    puesto: "MESERO",
    sueldo: "",
    status: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del Empleado:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Nombre" onChange={handleChange} 
               className="border p-2 rounded w-full" />
        <input name="surname" placeholder="Apellido" onChange={handleChange} 
               className="border p-2 rounded w-full" />
      </div>

      <input name="dpi" placeholder="DPI (Único)" onChange={handleChange} 
             className="w-full border p-2 rounded" />

      <input type="number" name="sueldo" placeholder="Sueldo Q." onChange={handleChange} 
             className="w-full border p-2 rounded" />

      <select name="puesto" onChange={handleChange} className="w-full border p-2 rounded">
        <option value="MESERO">Mesero</option>
        <option value="CHEF">Chef</option>
        <option value="COMENSAL">Comensal</option>
        <option value="SERVICIO DE LIMPIEZA">Servicio de Limpieza</option>
      </select>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
        <label>Empleado Activo</label>
      </div>

      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-bold transition-colors">
        Registrar Empleado
      </button>
    </form>
  );
};