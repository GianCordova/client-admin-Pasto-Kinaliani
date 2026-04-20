import { useState } from "react";
import { ToggleMenu } from "./ToggleMenu";

export const TableTemplate = ({ title, columns, data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <ToggleMenu />
      </div>

      {/* Tabla */}
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-orange-500 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-2">{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="text-center border-t hover:bg-orange-50">
              {columns.map((col) => (
                <td key={col} className="p-2">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};