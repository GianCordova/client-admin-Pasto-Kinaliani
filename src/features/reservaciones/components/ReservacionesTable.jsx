export const ReservacionesCards = () => {

  const data = [
    {
      id_usuario: "USR001",
      fecha: "2026-04-14",
      hora: "18:00",
      numero_personas: 4,
      numero_mesas: 2,
      estado: "pendiente"
    },
    {
      id_usuario: "USR002",
      fecha: "2026-04-15",
      hora: "20:00",
      numero_personas: 2,
      numero_mesas: 1,
      estado: "confirmada"
    }
  ];

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">

        <h2 className="text-2xl font-bold">
          Reservaciones
        </h2>

        {/* BOTÓN AGREGAR */}
        <button className="group relative px-3 sm:px-5 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg">

          {/* ICONO */}
          <img
            src="/src/assets/img/add.png"
            alt="agregar"
            className="
            w-5 h-5 
            transition-transform duration-500 ease-in-out
            sm:group-hover:-translate-x-[-150%] 
            group-hover:scale-110 filter invert
    "
          />

          {/* TEXTO */}
          <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-500 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
            Agregar
          </span>

        </button>

      </div>

      {/* GRID DE CARDS */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {data.map((res, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
          >

            <h3 className="text-lg font-bold text-main-blue">
              {res.id_usuario}
            </h3>

            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p><span className="font-semibold">Fecha:</span> {res.fecha}</p>
              <p><span className="font-semibold">Hora:</span> {res.hora}</p>
              <p><span className="font-semibold">Personas:</span> {res.numero_personas}</p>
              <p><span className="font-semibold">Mesas:</span> {res.numero_mesas}</p>
            </div>

            <div className="mt-4">
              <span className={`px-3 py-1 text-xs rounded-full font-medium
                ${res.estado === "confirmada"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}>
                {res.estado}
              </span>
            </div>

            <div className="flex gap-3 mt-5">

              {/* EDITAR */}
              <button className="group relative flex-1 py-2 rounded-lg bg-main-green text-white flex items-center justify-center overflow-hidden transition-all duration-300">

                <img
                  src="/src/assets/img/pencil.png"
                  alt="editar"
                  className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-120%] group-hover:scale-110 filter invert"
                />

                <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                  Editar
                </span>

              </button>

              {/* ELIMINAR */}
              <button className="group relative flex-1 py-2 rounded-lg bg-orange-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-orange-700">

                <img
                  src="/src/assets/img/delete.png"
                  alt="eliminar"
                  className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-150%] group-hover:scale-110 filter invert"
                />

                <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                  Eliminar
                </span>

              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};
