import React from 'react';

export const InventarioModalDelete = ({ isOpen, onClose, onConfirm, item }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">

            <div className="bg-white p-6 rounded-xl text-center">

                <h2 className="text-xl font-bold mb-4">¿Eliminar producto?</h2>

                <p className="mb-6">
                    {item?.nombre} de {item?.sucursal}
                </p>

                <div className="flex gap-4">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={() => { onConfirm(); onClose(); }}
                        className="bg-red-500 text-white px-4 py-2 rounded">
                        Eliminar
                    </button>
                </div>

            </div>
        </div>
    );
};