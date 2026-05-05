import { useRef, useState } from "react";
import { usePedidosStore } from "../../users/store/adminStore";

export const PedidosFilter = () => {
    const searchInputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { getPedidos, getPedidosByStatus } = usePedidosStore();

    const handleFilterClick = async (value) => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }

        if (value.startsWith("estado:")) {
            const status = value.split(":")[1].toUpperCase();
            await getPedidosByStatus(status); // filtra usando el store
            setSearchTerm(""); // limpia el input
        } else {
            setSearchTerm(value);
        }
    };

    const handleSearchChange = async (text) => {
        setSearchTerm(text);

        if (text === "") {
            await getPedidos(); // si borras el input, recarga todos
        }
    };

    return (
        <div className="flex flex-wrap gap-3 mb-4 items-center">
            <button
                onClick={() => handleFilterClick("estado:pendiente")}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl hover:bg-yellow-200 transition"
            >
                Pendiente
            </button>
            <button
                onClick={() => handleFilterClick("estado:completado")}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-xl hover:bg-green-200 transition"
            >
                Completado
            </button>
            <button
                onClick={() => handleFilterClick("estado:cancelado")}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-xl hover:bg-red-200 transition"
            >
                Cancelado
            </button>
            <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar por usuario, ID o sucursal..."
                className="ml-auto p-3 border border-gray-200 rounded-xl w-full sm:w-64 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition text-gray-600"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
        </div>
    );
};