export const PlatillosCards = () => {

  const data = [
    {
      nombre: "Pizza Margarita",
      descripcion: "Clásica con tomate, mozzarella y albahaca",
      precio: 80,
      categoria: "Comida Italiana",
      isActive: true
    },
    {
      nombre: "Hamburguesa Doble",
      descripcion: "Carne doble con queso y papas",
      precio: 65,
      categoria: "Comida Rápida",
      isActive: false
    }
  ];

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">

        <h2 className="text-2xl font-bold">
          Platillos
        </h2>

        {/* BOTÓN AGREGAR */}
        <button className="bg-main-blue px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2">

          <img
        src="/src/assets/img/add.png"
        alt="agregar"
        className="h-5 w-5"
    />

            Agregar Platillo

        </button>

      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {data.map((platillo, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
          >

            <h3 className="text-lg font-bold text-main-blue">
              {platillo.nombre}
            </h3>

            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p><span className="font-semibold">Descripción:</span> {platillo.descripcion}</p>
              <p><span className="font-semibold">Precio:</span> Q{platillo.precio}</p>
              <p><span className="font-semibold">Categoría:</span> {platillo.categoria}</p>
            </div>

            <div className="mt-4">
              <span className={`px-3 py-1 text-xs rounded-full font-medium
                ${platillo.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}>
                {platillo.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div className="flex gap-3 mt-5">

              {/* EDITAR */}
              <button className="group relative flex-1 py-2 rounded-lg bg-main-blue text-white flex items-center justify-center overflow-hidden transition-all duration-300">

                <img
                  src="/src/assets/img/pencil.png"
                  alt="editar"
                  className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-120%] group-hover:scale-110"
                />

                <span className="hidden sm:inline ml-2 whitespace-nowrap transition-all duration-300 transform sm:group-hover:translate-x-3 sm:group-hover:opacity-0">
                  Editar
                </span>

              </button>

              {/* ELIMINAR */}
              <button className="group relative flex-1 py-2 rounded-lg bg-red-600 text-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-red-700">

                <img
                  src="/src/assets/img/delete.png"
                  alt="eliminar"
                  className="w-5 h-5 transition-transform duration-500 ease-in-out sm:group-hover:-translate-x-[-120%] group-hover:scale-110"
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