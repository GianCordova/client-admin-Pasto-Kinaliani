import { useState } from "react";
import { ReservacionesForm } from "./ReservacionesModal";
import { ReservacionesModalDelete } from "./ReservacionesModalDelete.jsx";

export const Reservaciones = () => {
  // Datos temporales
  const [reservaciones, setReservaciones] = useState([
    {
      id: "1",
      id_usuario: "USR001",
      fecha: "2026-04-14",
      hora: "18:00",
      numero_personas: 4,
      numero_mesas: 2,
      estado: "pendiente"
    },
    {
      id: "2",
      id_usuario: "USR002",
      fecha: "2026-04-15",
      hora: "20:00",
      numero_personas: 2,
      numero_mesas: 1,
      estado: "confirmada"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReservacion, setSelectedReservacion] = useState(null);

  // FUNCIONES (MISMA LÓGICA)
  const handleOpenModal = (res = null) => {
    setSelectedReservacion(res);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (res) => {
    setSelectedReservacion(res);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted reservacion:", selectedReservacion?.id_usuario);
    setIsDeleteModalOpen(false);
  };

  // FILTRO (igual que platillos pero adaptado)
  const filteredReservaciones = reservaciones.filter(r =>
    r.id_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Reservaciones</h2>
          <p className="text-gray-500 text-sm mt-1">Gestión de reservaciones del sistema.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="group relative px-3 sm:px-7 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg">

          <img
            src="/src/assets/img/add.png"
            alt="agregar"
            className="absolute w-5 h-5 left-1/2 top-1/2 -translate-x-[250%] -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-110 brightness-0 invert" />

          <span className="font-medium hidden sm:inline ml-2 whitespace-nowrap transition-all duration-500 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
            Agregar
          </span>

        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por usuario o estado..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-3.5 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReservaciones.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            No se encontraron reservaciones.
          </div>
        ) : (
          filteredReservaciones.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-main-blue">{res.id_usuario}</h3>
              <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-tighter">
                ID: {res.id}
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Fecha:</span> {res.fecha}</p>
                <p><span className="font-semibold">Hora:</span> {res.hora}</p>
                <p><span className="font-semibold">Personas:</span> {res.numero_personas}</p>
                <p><span className="font-semibold">Mesas:</span> {res.numero_mesas}</p>
              </div>

              <div className="mt-4">
                <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider
                  ${res.estado === "confirmada"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {res.estado}
                </span>
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => handleOpenModal(res)} className="group relative flex-1 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300">

                  <img
                    src="/src/assets/img/pencil.png"
                    alt="editar"
                    className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-120%] group-hover:scale-110 filter invert"
                  />

                  <span className=" font-medium hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                    Editar
                  </span>

                </button>

                <button onClick={() => handleOpenDeleteModal(res)} className="group relative flex-1 py-2 rounded-lg bg-orange-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-orange-700">

                  <img
                    src="/src/assets/img/delete.png"
                    alt="eliminar"
                    className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-150%] group-hover:scale-110 filter invert"
                  />

                  <span className=" font-medium hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                    Cancelar
                  </span>

                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 bg-white px-6 py-4 rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="text-xs text-gray-500 font-medium">
          Total: <span className="text-gray-800">{filteredReservaciones.length} reservaciones</span>
        </div>
      </div>

      <ReservacionesForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservacion={selectedReservacion}
      />

      <ReservacionesModalDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        reservacion={selectedReservacion}
      />
    </div>
  );
};

export default Reservaciones;