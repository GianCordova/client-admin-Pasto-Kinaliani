// src/components/pedidos/PedidosFilter.jsx
import { useRef, useState } from "react";
import { usePedidosStore } from "../../users/store/adminStore";

export const PedidosFilter = () => {
    const searchInputRef = useRef(null);

    const { getPedidos, getPedidosByFilter } = usePedidosStore();

    const statuses = ["", "PENDIENTE", "COMPLETADO", "CANCELADO"];

    const statusLabels = {
        "": "Todos",
        PENDIENTE: "Pendiente",
        COMPLETADO: "Completado",
        CANCELADO: "Cancelado"
    };

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        from: "",
        to: ""
    });

    // 🔎 aplicar filtros
    const applyFilters = async (f) => {
        const hasFilters = f.search || f.status || f.from || f.to;

        if (!hasFilters) {
            await getPedidos();
            return;
        }

        await getPedidosByFilter({
            search: f.search,
            status: f.status,
            from: f.from,
            to: f.to
        });
    };

    // 🔎 búsqueda por ID, usuario o sucursal
    const handleSearch = (value) => {
        const updated = { ...filters, search: value };
        setFilters(updated);
        applyFilters(updated);
    };

    // 📌 estado
    const setStatus = (status) => {
        const updated = { ...filters, status };
        setFilters(updated);
        applyFilters(updated);
    };

    // 📅 fechas
    const handleDateChange = (name, value) => {
        const updated = { ...filters, [name]: value };
        setFilters(updated);
        applyFilters(updated);
    };

    const activeIndex = statuses.indexOf(filters.status);

    return (
        <div className="w-full flex flex-col gap-4 mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">

            {/* 🔎 BÚSQUEDA + ESTADO */}
            <div className="flex flex-col md:flex-row gap-3 items-center">

                {/* 🔎 SEARCH */}
                <input
                    ref={searchInputRef}
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    placeholder="Buscar por ID, usuario o sucursal..."
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 outline-none"
                />

                {/* 🟧 ISLA DE ESTADOS */}
                <div className="relative w-full md:w-[420px]">
                    <div className="relative flex bg-gray-100 rounded-full p-1">

                        {/* 🔶 SLIDER NARANJA */}
                        <div
                            className="absolute top-1 bottom-1 w-1/4 bg-orange-500 rounded-full shadow transition-transform duration-300"
                            style={{
                                transform: `translateX(${activeIndex * 100}%)`
                            }}
                        />

                        {statuses.map((status) => (
                            <button
                                key={status || "ALL"}
                                onClick={() => setStatus(status)}
                                className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${filters.status === status
                                    ? "text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                {statusLabels[status]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 📅 RANGO DE FECHAS */}
            <div className="flex flex-col md:flex-row gap-3 items-center">

                {/* DESDE */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs text-gray-500">Desde</label>
                    <input
                        type="datetime-local"
                        value={filters.from}
                        onChange={(e) => handleDateChange("from", e.target.value)}
                        className="p-3 border border-gray-200 rounded-xl"
                    />
                </div>

                {/* HASTA */}
                <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs text-gray-500">Hasta</label>
                    <input
                        type="datetime-local"
                        value={filters.to}
                        onChange={(e) => handleDateChange("to", e.target.value)}
                        className="p-3 border border-gray-200 rounded-xl"
                    />
                </div>

                {/* LIMPIAR */}
                <button
                    onClick={async () => {
                        const reset = {
                            search: "",
                            status: "",
                            from: "",
                            to: ""
                        };
                        setFilters(reset);
                        await getPedidos();
                    }}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition ml-auto"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
};