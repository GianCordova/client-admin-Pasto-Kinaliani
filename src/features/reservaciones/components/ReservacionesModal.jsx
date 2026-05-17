import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showSuccess, showError } from "../../../shared/utils/toast.js";
import { useSaveReservation } from "../hooks/useSaveReservation";

export const ReservacionesForm = ({ isOpen, onClose, reservacion }) => {
  const isEdit = !!reservacion;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ AQUÍ ESTÁ LA CORRECCIÓN
  const { saveReservation } = useSaveReservation();

  useEffect(() => {
    if (isOpen) {
      if (reservacion) {
        reset({
          id_usuario: reservacion.id_usuario?._id || reservacion.id_usuario || "",
          fecha: reservacion.fecha ? reservacion.fecha.split("T")[0] : "",
          hora: reservacion.hora || "",
          numero_personas: reservacion.numero_personas || "",
          numero_mesas: reservacion.numero_mesas || "",
          estado: reservacion.estado || "pendiente",
        });
      } else {
        reset({
          id_usuario: "",
          fecha: "",
          hora: "",
          numero_personas: "",
          numero_mesas: "",
          estado: "pendiente",
        });
      }
    }
  }, [isOpen, reservacion, reset]);

  const onSubmit = async (data) => {
    try {
      await saveReservation(data, reservacion?._id);

      showSuccess(
        reservacion
          ? "Reservación actualizada correctamente"
          : "Reservación creada correctamente"
      );

      reset();
      onClose();
    } catch (err) {
      console.log("❌ ERROR COMPLETO:", err);

      showError(
        err?.response?.data?.message ||
        err?.message ||
        "Error al guardar la reservación"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">

      {/* CONTENEDOR */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {isEdit ? "Editar Reservación" : "Nueva Reservación"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información de la reservación
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >
          {/* ID USUARIO */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Usuario (ID)
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
                            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="ID del usuario"
              {...register("id_usuario", {
                required: "El usuario es obligatorio",
              })}
            />
            {errors.id_usuario && (
              <p className="text-red-600 text-xs mt-1">
                {errors.id_usuario.message}
              </p>
            )}
          </div>

          {/* FECHA Y HORA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FECHA */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                {...register("fecha", {
                  required: "La fecha es obligatoria",
                  validate: (value) => {
                    const today = new Date().toISOString().split("T")[0];
                    return value >= today || "No puedes seleccionar una fecha anterior a hoy";
                  },
                })}
              />
              {errors.fecha && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.fecha.message}
                </p>
              )}
            </div>

            {/* HORA */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Hora
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
                                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                {...register("hora", {
                  required: "La hora es obligatoria",
                })}
              />
              {errors.hora && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.hora.message}
                </p>
              )}
            </div>
          </div>

          {/* PERSONAS Y MESAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Personas
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
                                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                {...register("numero_personas", {
                  required: "Requerido",
                  min: { value: 1, message: "Mínimo 1 persona" },
                })}
              />
              {errors.numero_personas && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.numero_personas.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Mesas
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                {...register("numero_mesas", {
                  required: "Requerido",
                  min: { value: 1, message: "Mínimo 1 mesa" },
                  max: { value: 10, message: "Máximo 10 mesas" },
                })}
              />
              {errors.numero_mesas && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.numero_mesas.message}
                </p>
              )}
            </div>
          </div>

          {/* ESTADO */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Estado
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
                            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              {...register("estado")}
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow"
              style={{
                background:
                  "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                border: "none",
              }}
            >
              {isEdit ? "Guardar cambios" : "Crear reservación"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};