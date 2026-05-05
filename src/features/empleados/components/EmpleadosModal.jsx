import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useEmpleadosStore } from "../../users/store/adminStore"; // Debes tener el store de empleados

import { useSaveEmployee } from "../hooks/useSaveEmpleados.js"; // Hook similar a useSaveField
import { Spinner } from "../../auth/components/Spinner.jsx";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const EmpleadoModal = ({ isOpen, onClose, empleado }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveEmpleado } = useSaveEmpleados();
  const loading = useEmpleadosStore((state) => state.loading);

  // Rellenar formulario si editando o limpiar si nuevo
  useEffect(() => {
    if (isOpen) {
      if (empleado) {
        reset({
          name: empleado.name,
          surname: empleado.surname,
          dpi: empleado.dpi,
          puesto: empleado.puesto,
          sueldo: empleado.sueldo,
          status: empleado.status
        });
      } else {
        reset({
          name: "",
          surname: "",
          dpi: "",
          puesto: "MESERO",
          sueldo: 0,
          status: true
        });
      }
    }
  }, [isOpen, empleado, reset]);

  const onSubmit = async (data) => {
    try {
      await saveEmpleado(data, empleado?._id);
      showSuccess(
        empleado
          ? "Empleado actualizado correctamente"
          : "Empleado creado correctamente"
      );
      reset();
      onClose();
    } catch (err) {
      showError("Error al guardar el empleado");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="p-4 sm:p-5 text-white sticky top-0 z-10"
               style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
            <h2 className="text-xl sm:text-2xl font-bold">
              {empleado ? "Editar Empleado" : "Nuevo Empleado"}
            </h2>
            <p className="text-xs sm:text-sm opacity-80">
              Completa la información del empleado
            </p>
          </div>

          {/* FORM */}
          <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                <input
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  {...register("name", { required: "El nombre es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Apellido */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Apellido</label>
                <input
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  {...register("surname", { required: "El apellido es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                />
                {errors.surname && <p className="text-red-600 text-sm mt-1">{errors.surname.message}</p>}
              </div>

              {/* DPI */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1">DPI</label>
                <input
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  {...register("dpi", { required: "El DPI es obligatorio", minLength: { value: 13, message: "DPI inválido" } })}
                />
                {errors.dpi && <p className="text-red-600 text-sm mt-1">{errors.dpi.message}</p>}
              </div>

              {/* Puesto */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Puesto</label>
                <select className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm outline-none"
                        {...register("puesto", { required: true })}>
                  <option value="MESERO">Mesero</option>
                  <option value="CHEF">Chef</option>
                  <option value="COMENSAL">Comensal</option>
                  <option value="SERVICIO DE LIMPIEZA">Servicio de limpieza</option>
                </select>
              </div>

              {/* Sueldo */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Sueldo</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  {...register("sueldo", { required: "El sueldo es obligatorio", min: { value: 0, message: "Debe ser positivo" } })}
                />
                {errors.sueldo && <p className="text-red-600 text-sm mt-1">{errors.sueldo.message}</p>}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 md:col-span-2 pt-2">
                <input
                  type="checkbox"
                  id="status"
                  {...register("status")}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400 border-gray-300"
                />
                <label htmlFor="status" className="text-sm font-medium text-gray-700">Activo</label>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
              <button type="button" className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      onClick={() => { reset(); onClose(); }}>
                Cancelar
              </button>

              <button type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow"
                      style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)", border: "none" }}>
                {loading ? <Spinner small /> : empleado ? "Guardar cambios" : "Crear empleado"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};