import { useRef, useState } from "react";
import { usePedidosStore } from "../store/pedidosStore";

// 💡 AGREGAMOS LA PROP "onSearch" PARA COMUNICARSE CON EL PADRE
export const PedidosFilter = ({ onSearch }) => {
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

    // 🔎 Aplicar filtros en el Backend a través de Zustand
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

    // 🔎 Búsqueda por ID, usuario o sucursal
    const handleSearch = (value) => {
        const updated = { ...filters, search: value };
        setFilters(updated);

        // 🔥 CRUCIAL: Le avisamos al componente padre lo que el usuario escribió
        if (onSearch) onSearch(value);

        applyFilters(updated);
    };

    // 📌 Estado
    const setStatus = (status) => {
        const updated = { ...filters, status };
        setFilters(updated);
        applyFilters(updated);
    };

    // 📅 Fechas
    const handleDateChange = (name, value) => {
        const updated = { ...filters, [name]: value };
        setFilters(updated);
        applyFilters(updated);
    };

    const activeIndex = statuses.indexOf(filters.status);

    return (
        <div className="w-full flex flex-col gap-4 p-1 bg-white">
            {/* 🔎 BÚSQUEDA + ESTADO */}
            <div className="flex flex-col lg:flex-row gap-3 items-center">

                {/* 🔎 SEARCH */}
                <input
                    ref={searchInputRef}
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    placeholder="Buscar por ID, usuario o sucursal..."
                    className="w-full flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 outline-none text-sm text-gray-700"
                />

                {/* 🟧 ISLA DE ESTADOS */}
                <div className="relative w-full lg:w-[420px]">
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
                                type="button"
                                onClick={() => setStatus(status)}
                                className={`relative z-10 flex-1 py-2 text-xs md:text-sm font-bold transition-all duration-200 ${filters.status === status ? "text-white" : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {statusLabels[status]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 📅 RANGO DE FECHAS */}
            <div className="flex flex-col sm:flex-row gap-3 items-end w-full border-t border-gray-50 pt-3">
                {/* DESDE */}
                <div className="flex flex-col w-full sm:w-auto flex-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase mb-1">Desde</label>
                    <input
                        type="datetime-local"
                        value={filters.from}
                        onChange={(e) => handleDateChange("from", e.target.value)}
                        className="p-2.5 border border-gray-200 rounded-xl text-xs text-gray-600 outline-none focus:border-orange-400"
                    />
                </div>

                {/* HASTA */}
                <div className="flex flex-col w-full sm:w-auto flex-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase mb-1">Hasta</label>
                    <input
                        type="datetime-local"
                        value={filters.to}
                        onChange={(e) => handleDateChange("to", e.target.value)}
                        className="p-2.5 border border-gray-200 rounded-xl text-xs text-gray-600 outline-none focus:border-orange-400"
                    />
                </div>

                {/* LIMPIAR */}
                <button
                    type="button"
                    onClick={async () => {
                        const reset = { search: "", status: "", from: "", to: "" };
                        setFilters(reset);
                        if (onSearch) onSearch(""); // Resetea también el texto en el padre
                        await getPedidos();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 font-semibold text-xs transition"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
};