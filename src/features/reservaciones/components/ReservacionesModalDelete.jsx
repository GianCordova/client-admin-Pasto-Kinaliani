import React from 'react';

export const ReservacionesModalDelete = ({ isOpen, onClose, onConfirm, reservacion }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">
                        ¿Cancelar reservación?
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        ¿Deseas cancelar la reservación del usuario{" "}
                        <span className="font-bold text-gray-700">
                            {reservacion?.id_usuario}
                        </span>?
                        <br />
                        Esta acción no se puede deshacer.
                    </p>
                </div>

                <div className="p-4 bg-gray-50 flex flex-col sm:flex-row-reverse gap-2">
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition-colors"
                    >
                        Sí, cancelar
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};