export const TableTemplate = ({ title, columns, data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {col === "name" ? "Empleado" : col}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Gestión</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400">
                  No hay registros en el sistema.
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={item.id || i} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col} className="px-6 py-4 whitespace-nowrap">
                      {/* Caso especial: Nombre con ID debajo */}
                      {col === "name" ? (
                        <>
                          <div className="text-sm font-bold text-gray-900">{item.name} {item.surname}</div>
                          <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase">ID: {item.id?.substring(0, 8)}...</div>
                        </>
                      ) : col === "status" ? (
                        /* Caso especial: Badge de estado */
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}>
                          {item.status ? "Activo" : "Inactivo"}
                        </span>
                      ) : (
                        /* Renderizado normal */
                        <div className="text-sm text-gray-600">{item[col]}</div>
                      )}
                    </td>
                  ))}
                  {/* Botones de Acción (Iconos) */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(item)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};