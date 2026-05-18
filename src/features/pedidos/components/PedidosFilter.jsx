import { useEffect, useState } from "react";
import { usePedidosStore } from "../store/pedidosStore";
import { useSucursalesStore } from "../../sucursales/store/sucursalesStore";
import { useUsuarioStore } from "../../usuarios/store/usuarioStore";

export const PedidosFilter = () => {
    const {
        pedidos,
        getPedidos,
        getPedidosByStatus,
        getPedidosBySucursal,
        getPedidosByUsuario
    } = usePedidosStore();

    const { sucursales, getSucursales } = useSucursalesStore();
    const { usuarios, getUsuarios } = useUsuarioStore();

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        from: "",
        to: ""
    });

    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [searchType, setSearchType] = useState("usuarios");

    const statuses = ["", "PENDIENTE", "COMPLETADO", "CANCELADO"];
    const labels = {
        "": "Todos",
        PENDIENTE: "Pendiente",
        COMPLETADO: "Completado",
        CANCELADO: "Cancelado"
    };

    const activeIndex = statuses.indexOf(filters.status);

    useEffect(() => {
        if (!sucursales || sucursales.length === 0) {
            getSucursales();
        }
        if (!usuarios || usuarios.length === 0) {
            getUsuarios();
        }
    }, []);

    useEffect(() => {
        applyFilters(filters, pedidos);
    }, [pedidos]);

    const applyFilters = (f, pedidosData) => {
        const result = pedidosData.filter((p) => {
            const matchSearch =
                f.search === "" ||
                p.usuario?._id === f.search ||
                p.sucursal?._id === f.search;

            const matchStatus = f.status === "" || p.status === f.status;
            const pedidoDate = new Date(p.createdAt);
            const fromDate = f.from ? new Date(f.from) : null;
            const toDate = f.to ? new Date(f.to) : null;

            const matchFrom = fromDate ? pedidoDate >= fromDate : true;
            const matchTo = toDate ? pedidoDate <= toDate : true;

            return matchSearch && matchStatus && matchFrom && matchTo;
        });

        setFilteredPedidos(result);
    };

    const handleChange = async (field, value) => {
        const updated = {
            ...filters,
            [field]: value
        };

        setFilters(updated);

        let pedidosActualizados = pedidos;

        if (field === "status") {
            await getPedidosByStatus(value);
            pedidosActualizados = usePedidosStore.getState().pedidos;
        } else if (field === "search") {
            if (value === "") {
                await getPedidos();
            } else {
                if (searchType === "sucursales" && getPedidosBySucursal) {
                    await getPedidosBySucursal(value);
                } else if (searchType === "usuarios" && getPedidosByUsuario) {
                    await getPedidosByUsuario(value);
                }
            }
            pedidosActualizados = usePedidosStore.getState().pedidos;
        }

        applyFilters(updated, pedidosActualizados);
    };

    const handleTabChange = (type) => {
        setSearchType(type);
        handleChange("search", "");
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3 items-center">
                <div className="flex flex-1 w-full flex-col sm:flex-row gap-2">
                    {searchType === "usuarios" ? (
                        <select
                            className="flex-1 p-2.5 border border-gray-200 rounded-xl outline-none focus:border-orange-400 text-gray-600 cursor-pointer bg-white text-sm font-medium transition-all"
                            value={filters.search}
                            onChange={(e) => handleChange("search", e.target.value)}
                        >
                            <option value="">Todos los usuarios</option>
                            {usuarios?.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name} - {user.surname} - {user.email}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <select
                            className="flex-1 p-2.5 border border-gray-200 rounded-xl outline-none focus:border-orange-400 text-gray-600 cursor-pointer bg-white text-sm font-medium transition-all"
                            value={filters.search}
                            onChange={(e) => handleChange("search", e.target.value)}
                        >
                            <option value="">Todas las sucursales</option>
                            {sucursales?.map((suc) => (
                                <option key={suc._id} value={suc._id}>
                                    {suc.nombre}
                                </option>
                            ))}
                        </select>
                    )}

                    <div className="flex bg-gray-100 rounded-lg p-1 h-[42px] sm:w-auto w-full">
                        <button
                            type="button"
                            onClick={() => handleTabChange("usuarios")}
                            className={`flex-1 sm:flex-none px-4 py-1 text-sm font-medium rounded-md transition-all ${searchType === "usuarios"
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Usuarios
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange("sucursales")}
                            className={`flex-1 sm:flex-none px-4 py-1 text-sm font-medium rounded-md transition-all ${searchType === "sucursales"
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Sucursales
                        </button>
                    </div>
                </div>

                <div className="relative w-full lg:w-[420px]">
                    <div className="relative flex bg-gray-100 rounded-full p-1">
                        <div
                            className="absolute top-1 bottom-1 w-1/4 bg-orange-500 rounded-full shadow transition-transform duration-300"
                            style={{
                                transform: `translateX(${activeIndex * 100}%)`
                            }}
                        />
                        {statuses.map((status) => (
                            <button
                                key={status || "ALL"}
                                onClick={() => handleChange("status", status)}
                                className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${filters.status === status ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                {labels[status]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center">
                <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs text-gray-500">Desde</label>
                    <input
                        type="datetime-local"
                        value={filters.from}
                        onChange={(e) => handleChange("from", e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    />
                </div>

                <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs text-gray-500">Hasta</label>
                    <input
                        type="datetime-local"
                        value={filters.to}
                        onChange={(e) => handleChange("to", e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    />
                </div>

                <button
                    onClick={async () => {
                        const reset = { search: "", status: "", from: "", to: "" };
                        setFilters(reset);
                        await getPedidos();
                        const pedidosActualizados = usePedidosStore.getState().pedidos;
                        applyFilters(reset, pedidosActualizados);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 ml-auto w-full md:w-auto"
                >
                    Limpiar
                </button>
            </div>
        </div>
    );
};