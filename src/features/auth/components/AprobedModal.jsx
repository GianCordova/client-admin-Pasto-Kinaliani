import { toast } from "react-hot-toast";

export function showApproveToast({ title, message, onConfirm, pedido }) {
    toast.custom((t) => (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 animate-In">
            <div className="p-6">

                {/* Icono de aprobación */}
                <div className="flex justify-center mb-4 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {title || "¿Aprobar?"}
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    {message || "¿Deseas aprobar esta acción?"}
                    {pedido && (
                        <>
                            <br />
                            Estás a punto de aprobar el pedido con ID:{" "}
                            <span className="font-semibold text-gray-900">{pedido._id}</span>
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
                        className="flex-1 px-4 py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                        onClick={() => {
                            onConfirm?.();
                            toast.dismiss(t.id);
                        }}
                    >
                        Aprobar
                    </button>
                </div>
            </div>
        </div>
    ));
}