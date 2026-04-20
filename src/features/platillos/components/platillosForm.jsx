import { useState } from "react";

export const PlatillosForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    isActive: true
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
    console.log(form);

    // Aquí podrías enviar al backend con fetch o axios
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        name="nombre"
        placeholder="Nombre del platillo"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="categoria"
        placeholder="Categoría"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Activo
      </label>

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Guardar Platillo
      </button>

    </form>
  );
};