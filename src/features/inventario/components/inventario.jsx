import React, { useState } from 'react';
import { InventarioModal } from './InventarioModal';
import { InventarioModalDelete } from './InventarioModalDelete';

export const Inventario = () => {

    const [inventario, setInventario] = useState([
        { _id: "I-001", sucursal: "Zona 10", nombre: "Carne", cantidad: 50, stockMinimo: 10, estado: "disponible" },
        { _id: "I-002", sucursal: "La Reformita", nombre: "Queso", cantidad: 5, stockMinimo: 10, estado: "agotado" },
        { _id: "I-003", sucursal: "San Cristóbal", nombre: "Lechuga", cantidad: 2, stockMinimo: 5, estado: "vencido" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterEstado, setFilterEstado] = useState("todos");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item = null) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Eliminado:", selectedItem?._id);
    };

    const filtered = inventario.filter(i =>
        (i.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
         i.sucursal.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterEstado === "todos" || i.estado === filterEstado)
    );

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Inventario</h1>
                    <p className="text-gray-500 text-sm">Control de productos por sucursal</p>
                </div>

                <button onClick={() => handleOpenModal()}
                    className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-orange-500 flex items-center gap-2">
                    + Nuevo Producto
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre o sucursal..."
                    className="col-span-3 px-3 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="px-3 py-2 border rounded-lg"
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="disponible">Disponible</option>
                    <option value="agotado">Agotado</option>
                    <option value="vencido">Vencido</option>
                </select>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold">Producto</th>
                            <th className="px-6 py-4 text-left text-xs font-bold">Sucursal</th>
                            <th className="px-6 py-4 text-left text-xs font-bold">Cantidad</th>
                            <th className="px-6 py-4 text-left text-xs font-bold">Stock Min</th>
                            <th className="px-6 py-4 text-left text-xs font-bold">Estado</th>
                            <th className="px-6 py-4 text-right text-xs font-bold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map(i => (
                            <tr key={i._id} className="border-t hover:bg-gray-50">

                                <td className="px-6 py-4 font-bold">{i.nombre}</td>
                                <td className="px-6 py-4">{i.sucursal}</td>
                                <td className="px-6 py-4">{i.cantidad}</td>
                                <td className="px-6 py-4">{i.stockMinimo}</td>

                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                                        ${i.estado === "disponible" && "bg-green-100 text-green-700"}
                                        ${i.estado === "agotado" && "bg-red-100 text-red-700"}
                                        ${i.estado === "vencido" && "bg-yellow-100 text-yellow-700"}
                                    `}>
                                        {i.estado}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleOpenModal(i)} className="mr-2">✏️</button>
                                    <button onClick={() => handleOpenDeleteModal(i)}>🗑️</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 text-sm text-gray-500">
                    Total: {filtered.length} productos
                </div>
            </div>

            <InventarioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
            <InventarioModalDelete isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} item={selectedItem} />
        </div>
    );
};