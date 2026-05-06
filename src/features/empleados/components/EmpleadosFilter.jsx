import { useState } from "react";

export const EmpleadosFilter = ({ data, onFilter }) => {
    const [filters, setFilters] = useState({
        search: "",
        puesto: "" // "" = Todos, "CHEF", "MESERO", "SERVICIO DE LIMPIEZA"
    });

    const options = ["", "CHEF", "MESERO", "SERVICIO DE LIMPIEZA"];
    const labels = { "": "Todos", "CHEF": "Chefs", "MESERO": "Meseros", "SERVICIO DE LIMPIEZA": "Limpieza" };
    const activeIndex = options.indexOf(filters.puesto);

    const applyFilters = (f) => {
        const result = data.filter((emp) => {
            const matchSearch = 
                emp.name.toLowerCase().includes(f.search.toLowerCase()) ||
                emp.surname.toLowerCase().includes(f.search.toLowerCase());

            const matchPuesto = f.puesto === "" || emp.puesto === f.puesto;

            return matchSearch && matchPuesto;
        });
        onFilter(result);
    };

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        applyFilters(updated);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
            <input
                type="text"
                placeholder="Buscar por nombre o apellido..."
                value={filters.search}
                onChange={(e) => handleChange("search", e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none transition"
            />

            <div className="relative w-full md:w-[450px]">
                <div className="relative flex bg-gray-100 rounded-full p-1">
                    <div
                        className="absolute top-1 bottom-1 w-1/4 bg-orange-500 rounded-full shadow transition-transform duration-300"
                        style={{ transform: `translateX(${activeIndex * 100}%)` }}
                    />
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => handleChange("puesto", opt)}
                            className={`relative z-10 flex-1 py-2 text-[10px] font-bold uppercase transition ${
                                filters.puesto === opt ? "text-white" : "text-gray-500"
                            }`}
                        >
                            {labels[opt]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};