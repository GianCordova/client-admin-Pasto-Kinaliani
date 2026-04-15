import { useState } from "react";

export const ReservacionesForm = () => {
  const [form, setForm] = useState({
    id_usuario: "",
    fecha: "",
    hora: "",
    numero_personas: "",
    numero_mesas: "",
    estado: "pendiente"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input name="id_usuario" placeholder="Usuario"
        onChange={handleChange} className="w-full border p-2 rounded" />

      <input type="date" name="fecha"
        onChange={handleChange} className="w-full border p-2 rounded" />

      <input name="hora" placeholder="Hora"
        onChange={handleChange} className="w-full border p-2 rounded" />

      <input name="numero_personas" placeholder="Personas"
        onChange={handleChange} className="w-full border p-2 rounded" />

      <input name="numero_mesas" placeholder="Mesas"
        onChange={handleChange} className="w-full border p-2 rounded" />

      <select name="estado" onChange={handleChange}
        className="w-full border p-2 rounded">
        <option value="pendiente">Pendiente</option>
        <option value="confirmada">Confirmada</option>
        <option value="cancelada">Cancelada</option>
      </select>

      <button className="bg-orange-500 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
};