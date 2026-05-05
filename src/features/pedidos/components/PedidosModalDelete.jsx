import React from 'react';

export const PedidosModalDelete = ({ isOpen, onClose, onConfirm, pedido }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">

                <div className="p-8 text-center">

                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <span className="text-red-600 text-xl">⚠️</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">
                        ¿Eliminar pedido?
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        Estás a punto de eliminar el pedido de{" "}
                        <span className="font-bold text-gray-700">
                            {pedido?.usuario}
                        </span>.
                    </p>

                </div>

                <div className="p-4 bg-gray-50 flex flex-col sm:flex-row-reverse gap-2">

                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600"
                    >
                        Sí, eliminar
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        Cancelar
                    </button>

                </div>
            </div>
        </div>
    );
};