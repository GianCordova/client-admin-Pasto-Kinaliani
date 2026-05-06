import { useUIStore } from '../../auth/store/uiStore';
import { useEffect, useState } from 'react';
import { useEffect as useToastEffect } from 'react';
import { showError } from '../../../shared/utils/toast';
import { ConfirmModal } from '../../auth/components/ConfirmModal';
import { PlatillosForm } from './PlatillosForm';
import { usePlatillosStore } from '../../usuarios/store/adminStore';


export const Platillos = () => {
  // Datos temporales (Equivalente al setProveedores)
  const { platillos, loading, error, getPlatillos, togglePlatilloStatus } = usePlatillosStore();
  const { openConfirm, confirm, closeConfirm } = useUIStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getPlatillos();
  }, [getPlatillos]);

  useToastEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);


  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Platillos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona los platillos que se ofrecen en el restaurante.
          </p>
        </div>

        <button
          className="bg-orange-400 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          onClick={() => { setOpenModal(true); setSelectedItem(null); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo Platillo
        </button>
      </div>

      {/* FILTROS */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-gray-600"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {platillos.map((platillo) => (
          /* CARD */
          <div
            key={platillo._id}
            className={`bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-gray-100 ${!platillo.isActive ? 'opacity-60 grayscale-[50%]' : 'hover:shadow-xl hover:scale-[1.02]'}`}>

            {/* IMAGEN */}
            <div className="w-full h-52 bg-gray-100 relative flex items-center justify-center">
              <img
                src={`https://res.cloudinary.com/dzvyh0ywj/image/upload/${platillo.photo}`}
                alt={platillo.nombre}
                className="max-h-full max-w-full object-contain rounded-t-xl"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                <span className="font-black text-orange-600">Q{platillo.precio}</span>
              </div>
            </div>

            {/* CONTENIDO */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-main-blue">
                {platillo.nombre}
              </h2>

              {/* BADGES */}
              <div className="flex gap-2 mt-2 flex-wrap">

                <span className={`px-3 py-1 text-xs rounded-full font-medium bg-orange-100 text-orange-700`}>
                  {platillo.categoria}
                </span>

                <span className={`px-3 py-1 text-xs rounded-full font-medium ${platillo.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {platillo.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              {/* INFO */}
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {platillo.descripcion}
              </p>

              {/* BOTONES */}
              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition"
                  onClick={() => {
                    setSelectedItem(platillo);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className={`flex-1 py-2 rounded-lg text-white font-medium transition ${platillo.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                  onClick={() => {
                    openConfirm(
                      platillo.isActive ? "Desactivar Platillo" : "Activar Platillo",
                      `¿Seguro que quieres ${platillo.isActive ? 'desactivar' : 'activar'} el platillo ${platillo.nombre}?`,
                      () => {
                        togglePlatilloStatus(platillo._id, platillo.isActive);
                      }
                    );
                  }}
                >
                  {platillo.isActive ? '🗑️ Desactivar' : '✅ Activar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <PlatillosForm
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedItem(null);
        }}
        platillo={selectedItem}
      />

      <ConfirmModal
        isOpen={!!confirm}
        onClose={closeConfirm}
        title={confirm?.title}
        message={confirm?.message}
        onConfirm={confirm?.onConfirm}
      />
    </div>
  );
};

export default Platillos;