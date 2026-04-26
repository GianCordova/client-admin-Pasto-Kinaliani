import React, { useState, useEffect } from "react";

export const ReservacionesForm = ({ isOpen, onClose, reservacion }) => {

  const isEdit = !!reservacion;

  const [form, setForm] = useState({
    id_usuario: "",
    fecha: "",
    hora: "",
    numero_personas: "",
    numero_mesas: "",
    estado: "pendiente"
  });

  // 🔥 Cargar datos cuando es editar
  useEffect(() => {
    if (reservacion && isOpen) {
      setForm({
        id_usuario: reservacion.id_usuario || "",
        fecha: reservacion.fecha || "",
        hora: reservacion.hora || "",
        numero_personas: reservacion.numero_personas || "",
        numero_mesas: reservacion.numero_mesas || "",
        estado: reservacion.estado || "pendiente"
      });
    } else if (!reservacion && isOpen) {
      setForm({
        id_usuario: "",
        fecha: "",
        hora: "",
        numero_personas: "",
        numero_mesas: "",
        estado: "pendiente"
      });
    }
  }, [reservacion, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos:", form);

    // 🔥 aquí conectas tu API luego
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? "Editar Reservación" : "Nueva Reservación"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 rounded hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                name="id_usuario"
                value={form.id_usuario}
                onChange={handleChange}
                required
                placeholder="Ej. USR001"
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>

            {/* Hora */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Hora
              </label>
              <input
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>

            {/* Personas */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Número de personas
              </label>
              <input
                type="number"
                name="numero_personas"
                value={form.numero_personas}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>

            {/* Mesas */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Número de mesas
              </label>
              <input
                type="number"
                name="numero_mesas"
                value={form.numero_mesas}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>

            {/* Estado */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              >
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

          </div>

          {/* BOTONES */}
          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-main-blue text-white rounded-lg hover:opacity-90"
            >
              {isEdit ? "Guardar Cambios" : "Crear Reservación"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default ReservacionesForm;