import React, { useState, useEffect } from "react";

export const EmpleadosModal = ({ isOpen, onClose, empleado }) => {
    const isEdit = !!empleado;

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        surname: "",
        role: "Mesero",
        branch: "La Reformita",
        status: true,
        image: null
    });

    useEffect(() => {
        if (empleado && isOpen) {
            setFormData({
                ...empleado,
                image: null
            });
        } else if (!empleado && isOpen) {
            setFormData({
                id: "",
                name: "",
                surname: "",
                role: "Mesero",
                branch: "La Reformita",
                status: true,
                image: null
            });
        }
    }, [empleado, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setFormData((prev) => ({
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

        const form = new FormData();

        form.append("id", formData.id);
        form.append("name", formData.name);
        form.append("surname", formData.surname);
        form.append("role", formData.role);
        form.append("branch", formData.branch);
        form.append("status", formData.status);

        if (formData.image) {
            form.append("image", formData.image);
        }

        console.log("EMPLOYEE DATA:", Object.fromEntries(form.entries()));

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

                {/* HEADER */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Editar Empleado" : "Nuevo Empleado"}
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

                    {/* FOTO */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Foto del Empleado
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border rounded-lg"
                        />

                        {/* PREVIEW */}
                        {formData.image && (
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="preview"
                                className="mt-3 w-24 h-24 object-cover rounded-full border"
                            />
                        )}
                    </div>

                    {/* NOMBRE Y APELLIDO */}
                    <div className="grid grid-cols-2 gap-4">

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-50"
                            placeholder="Nombre"
                        />

                        <input
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-50"
                            placeholder="Apellido"
                        />
                    </div>

                    {/* PUESTO Y SUCURSAL */}
                    <div className="grid grid-cols-2 gap-4">

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-50"
                        >
                            <option>Mesero</option>
                            <option>Chef</option>
                            <option>Bartender</option>
                            <option>Gerente</option>
                        </select>

                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gray-50"
                        >
                            <option>La Reformita</option>
                            <option>Zona 10</option>
                            <option>San Cristóbal</option>
                        </select>

                    </div>

                    {/* STATUS */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="status"
                            checked={formData.status}
                            onChange={handleChange}
                        />
                        Activo / En turno
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
                            {isEdit ? "Actualizar" : "Registrar"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};