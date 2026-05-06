import { useEffect, useState } from "react";
import { useReservationsStore } from "../../users/store/adminStore.js";
import { ReservacionesForm } from "./ReservacionesModal.jsx";
import { ReservacionesFilter } from "./ReservacionesFilter.jsx";
import { showConfirmToast } from "../../auth/components/ConfirmModalFer.jsx";
import { showApproveToast } from "../../auth/components/AprobedModal.jsx";

export const Reservaciones = () => {

  const {
    reservaciones,
    getReservations,
    cancelReservation,
    confirmReservation,
  } = useReservationsStore();

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    setFiltered(reservaciones);
  }, [reservaciones]);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openCreate = () => {
    setSelected(null);
    setIsOpen(true);
  };

  const openEdit = (res) => {
    setSelected(res);
    setIsOpen(true);
  };

  const handleDelete = (res) => {
    showConfirmToast({
      title: "Eliminar reservación",
      message: `¿Eliminar reservación de ${res.id_usuario?.name}?`,
      onConfirm: () => cancelReservation(res._id),
    });
  };

  const handleAprove = (res) => {
    showApproveToast({
      title: "Aprobar reservación",
      message: `¿Aprobar reservación ${res._id}?`,
      onConfirm: () => confirmReservation(res._id),
    });
  };

  const statusColors = {
    pendiente: "bg-yellow-100 text-yellow-700",
    confirmada: "bg-green-100 text-green-700",
    cancelada: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Reservaciones
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Gestión de reservaciones del sistema.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-5 py-2 bg-main-blue text-white rounded-lg hover:opacity-90"
        >
          + Agregar
        </button>

      </div>

      {/* 🔥 FILTER */}
      <ReservacionesFilter
        reservaciones={reservaciones}
        onFilter={setFiltered}
      />

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            No se encontraron reservaciones.
          </div>
        ) : (
          filtered.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl shadow-md border p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-main-blue">
                {r.id_usuario?.name}
              </h3>

              <div className="text-xs text-gray-400 font-mono">
                {r._id}
              </div>

              <div className="mt-3 text-sm space-y-1">

                <p><b>Email:</b> {r.id_usuario?.email}</p>
                <p><b>Fecha:</b> {r.fecha}</p>
                <p><b>Hora:</b> {r.hora}</p>
                <p><b>Personas:</b> {r.numero_personas}</p>
                <p><b>Mesas:</b> {r.numero_mesas}</p>

                <p>
                  <b>Estado:</b>{" "}
                  <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase ${statusColors[r.estado]}`}>
                    {r.estado}
                  </span>
                </p>

              </div>

              {r.estado === "pendiente" && (
                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => openEdit(r)}
                    className="flex-1 py-2 bg-orange-600 text-white rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(r)}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => handleAprove(r)}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Confirmar
                  </button>

                </div>
              )}
            </div>
          ))
        )}

      </div>

      {/* TOTAL */}
      <div className="mt-6 bg-white px-6 py-4 rounded-xl border flex justify-between">
        <span>Total:</span>
        <span className="font-bold">{filtered.length}</span>
      </div>

      {/* 📌 FORM MODAL */}
      <ReservacionesForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        reservacion={selected}
      />

    </div>
  );
};

export default Reservaciones;