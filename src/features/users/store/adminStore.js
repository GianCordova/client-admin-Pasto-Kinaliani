import { create } from "zustand";
import {
  getEmployees as getEmpleadosRequest,
  createEmployee as saveEmpleadoRequest,
  updateEmployee as updateEmpleadoRequest,
  activateEmployee as activateEmpleadoRequest,
  deactivateEmployee as deactivateEmpleadoRequest,
} from "../../../shared/api";

export const useEmpleadosStore = create((set, get) => ({
  empleados: [],
  loading: false,
  error: null,

  // Obtener todos los empleados activos
  getEmpleados: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getEmpleadosRequest();
      set({
        empleados: response.data.empleados,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener empleados",
        loading: false,
      });
    }
  },

  // Crear un nuevo empleado
  createEmpleado: async (formData) => {
    try {
      set({ loading: true, error: null });

      const response = await saveEmpleadoRequest(formData);

      set({
        empleados: [response.data.empleado, ...get().empleados],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear empleado",
      });
    }
  },

  // Actualizar un empleado existente
  updateEmpleado: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      const response = await updateEmpleadoRequest(id, formData);

      const updatedEmpleados = get().empleados.map((emp) =>
        emp._id === id ? response.data.empleado : emp
      );

      set({
        empleados: updatedEmpleados,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al actualizar empleado",
      });
    }
  },

  // Activar un empleado
  activateEmpleado: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await activateEmpleadoRequest(id);

      const updatedEmpleados = get().empleados.map((emp) =>
        emp._id === id ? response.data.empleado : emp
      );

      set({
        empleados: updatedEmpleados,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al activar empleado",
      });
    }
  },

  // Desactivar un empleado
  deactivateEmpleado: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await deactivateEmpleadoRequest(id);

      const updatedEmpleados = get().empleados.map((emp) =>
        emp._id === id ? response.data.empleado : emp
      );

      set({
        empleados: updatedEmpleados,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al desactivar empleado",
      });
    }
  },
}));