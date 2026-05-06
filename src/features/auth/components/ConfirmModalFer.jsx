import { toast } from "react-hot-toast";

export function showConfirmToast({ title, message, onConfirm, proveedor }) {
    toast.custom((t) => (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 animate-In">
            <div className="p-6">

                {/* Icono de advertencia (igual al modal) */}
                <div className="flex justify-center mb-4 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {title || "¿Estás seguro?"}
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    {message || "Esta acción no se puede deshacer."}
                    {proveedor && (
                        <>


                            Estás a punto de eliminar al proveedor

                            <span className="font-semibold text-gray-900">
                                {proveedor.nombre} {proveedor.apellido}
                            </span>
                        </>
                    )}
                </p>

                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="flex-1 px-4 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => {
                            onConfirm?.();
                            toast.dismiss(t.id);
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    ));
}
