import React, { useState, useEffect } from "react";

export const PlatillosForm = ({ isOpen, onClose, platillo }) => {
    const isEdit = !!platillo;

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        isActive: true,
        imagen: null
    });

    // Cargar datos en modo edición
    useEffect(() => {
        if (platillo && isOpen) {
            setForm({
                nombre: platillo.nombre || "",
                descripcion: platillo.descripcion || "",
                precio: platillo.precio || "",
                categoria: platillo.categoria || "",
                isActive: platillo.isActive ?? true,
                imagen: null
            });
        } else if (!platillo && isOpen) {
            setForm({
                nombre: "",
                descripcion: "",
                precio: "",
                categoria: "",
                isActive: true,
                imagen: null
            });
        }
    }, [platillo, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nombre", form.nombre);
        formData.append("descripcion", form.descripcion);
        formData.append("precio", form.precio);
        formData.append("categoria", form.categoria);
        formData.append("isActive", form.isActive);

        if (form.imagen) {
            formData.append("imagen", form.imagen);
        }

        console.log("DATA ENVIADA:", Object.fromEntries(formData.entries()));

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-In">

                {/* HEADER */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Editar Platillo" : "Nuevo Platillo"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* IMAGEN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagen del Platillo
                        </label>

                        <input
                            type="file"
                            name="imagen"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                        />

                        {/* PREVIEW */}
                        {form.imagen && (
                            <img
                                src={URL.createObjectURL(form.imagen)}
                                alt="preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg border"
                            />
                        )}
                    </div>

                    {/* NOMBRE */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                            placeholder="Ej. Pizza Margarita"
                        />
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                            placeholder="Ingredientes..."
                        />
                    </div>

                    {/* PRECIO + CATEGORÍA */}
                    <div className="grid grid-cols-2 gap-4">

                        <input
                            name="precio"
                            type="number"
                            value={form.precio}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-50"
                            placeholder="Precio"
                        />

                        <input
                            name="categoria"
                            value={form.categoria}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-50"
                            placeholder="Categoría"
                        />
                    </div>

                    {/* ACTIVO */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />
                        Activo
                    </label>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                        >
                            {isEdit ? "Actualizar" : "Crear"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};