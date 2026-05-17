import { useState } from "react";

export const ReservacionesFilter = ({ reservaciones, onFilter }) => {

    const [filters, setFilters] = useState({
        search: "",
        estado: "",
        from: "",
        to: ""
    });

    const estados = ["", "pendiente", "confirmada", "cancelada"];

    const labels = {
        "": "Todos",
        pendiente: "Pendiente",
        confirmada: "Confirmada",
        cancelada: "Cancelada"
    };

    const activeIndex = estados.indexOf(filters.estado);

    // 🔎 FILTRO COMPLETO
    const applyFilters = (f) => {
        const result = reservaciones.filter((r) => {

            const matchSearch =
                (r.id_usuario?.name || "")
                    .toLowerCase()
                    .includes(f.search.toLowerCase()) ||
                (r._id || "")
                    .toLowerCase()
                    .includes(f.search.toLowerCase());

            const matchEstado =
                f.estado === "" || r.estado === f.estado;

            // 📅 FECHAS
            const reservaDate = new Date(`${r.fecha} ${r.hora}`);

            const fromDate = f.from ? new Date(f.from) : null;
            const toDate = f.to ? new Date(f.to) : null;

            const matchFrom = fromDate ? reservaDate >= fromDate : true;
            const matchTo = toDate ? reservaDate <= toDate : true;

            return matchSearch && matchEstado && matchFrom && matchTo;
        });

        onFilter(result);
    };

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        applyFilters(updated);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col gap-4">

            {/* 🔎 SEARCH + ISLA */}
            <div className="flex flex-col md:flex-row gap-3 items-center">

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Buscar por usuario o ID..."
                    value={filters.search}
                    onChange={(e) =>
                        handleChange("search", e.target.value)
                    }
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200"
                />

                {/* 🟧 ISLA */}
                <div className="relative w-full md:w-[420px]">

                    <div className="relative flex bg-gray-100 rounded-full p-1">

                        {/* SLIDER */}
                        <div
                            className="absolute top-1 bottom-1 w-1/4 bg-orange-500 rounded-full shadow transition-transform duration-300"
                            style={{
                                transform: `translateX(${activeIndex * 100}%)`
                            }}
                        />

                        {estados.map((estado) => (
                            <button
                                key={estado}
                                onClick={() => handleChange("estado", estado)}
                                className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${filters.estado === estado
                                    ? "text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                {labels[estado]}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* 📅 RANGO DE FECHAS Y HORAS */}
            <div className="flex flex-col md:flex-row gap-3 items-center">

                {/* DESDE */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs text-gray-500">Desde</label>
                    <input
                        type="datetime-local"
                        value={filters.from}
                        onChange={(e) =>
                            handleChange("from", e.target.value)
                        }
                        className="px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* HASTA */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs text-gray-500">Hasta</label>
                    <input
                        type="datetime-local"
                        value={filters.to}
                        onChange={(e) =>
                            handleChange("to", e.target.value)
                        }
                        className="px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* LIMPIAR */}
                <button
                    onClick={() => {
                        const reset = {
                            search: "",
                            estado: "",
                            from: "",
                            to: ""
                        };
                        setFilters(reset);
                        onFilter(reservaciones);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 ml-auto"
                >
                    Limpiar
                </button>

            </div>
        </div>
    );
};