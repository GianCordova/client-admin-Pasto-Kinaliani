import { useEffect, useState } from "react";
import { useReservacionesStore } from "../../users/store/adminStore"; // tu store de reservaciones
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { showApproveToast } from "../../auth/components/AprobedModal";
import { PedidosFilter } from "../../pedidos/components/PedidosFilter";
import { ReservacionesForm } from "./ReservacionesModal"; // formulario de agregar / editar

export const Reservaciones = () => {
  const { reservaciones, getReservaciones, cancelarReservacion, confirmarReservacion } = useReservacionesStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservacion, setSelectedReservacion] = useState(null);

  useEffect(() => {
    getReservaciones();
  }, []);

  const handleDelete = (res) => {
    showConfirmToast({
      title: "Cancelar reservación",
      message: `¿Cancelar reservación ${res.id_usuario}?`,
      onConfirm: () => cancelarReservacion(res.id),
    });
  };

  const handleApprove = (res) => {
    showApproveToast({
      title: "Confirmar reservación",
      message: `¿Confirmar reservación ${res.id_usuario}?`,
      onConfirm: () => confirmarReservacion(res.id),
    });
  };

  // Filtrado por texto libre: usuario o estado
  const filtered = searchTerm
    ? reservaciones.filter((r) =>
      (r.id_usuario || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (r.estado || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    : reservaciones;

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
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Reservaciones</h2>
          <p className="text-gray-500 text-sm mt-1">Gestión de reservaciones del sistema.</p>
        </div>

        {/* BOTON AGREGAR */}
        <button
          onClick={() => {
            setSelectedReservacion(null); // limpiar selección para nuevo
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-lg bg-main-blue text-white hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <ReservacionesFilter onSearch={(value) => setSearchTerm(value)} />
      </div>

      {/* GRID DE RESERVACIONES */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            No se encontraron reservaciones.
          </div>
        ) : (
          filtered.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all duration-300"
            >
              {/* HEADER CARD */}
              <h3 className="text-lg font-bold text-main-blue">{r.id_usuario}</h3>
              <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">
                ID: {r.id}
              </div>

              {/* DETALLES */}
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Fecha:</span> {r.fecha}</p>
                <p><span className="font-semibold">Hora:</span> {r.hora}</p>
                <p><span className="font-semibold">Personas:</span> {r.numero_personas}</p>
                <p><span className="font-semibold">Mesas:</span> {r.numero_mesas}</p>

                <p>
                  <span className="font-semibold">Estado:</span>{" "}
                  <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${statusColors[r.estado] || "bg-gray-100 text-gray-700"}`}>
                    {r.estado}
                  </span>
                </p>
              </div>

              {/* BOTONES solo si está pendiente */}
              {r.estado === "pendiente" && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleApprove(r)}
                    className="group relative flex-1 py-2 rounded-lg bg-green-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-green-700"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => handleDelete(r)}
                    className="group relative flex-1 py-2 rounded-lg bg-red-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      <div className="mt-6 bg-white px-6 py-4 rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="text-xs text-gray-500 font-medium">
          Total: <span className="text-gray-800">{filtered.length} reservaciones</span>
        </div>
      </div>

      {/* MODAL AGREGAR / EDITAR */}
      <ReservacionesForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservacion={selectedReservacion}
      />
    </div>
  );
};

export default Reservaciones;