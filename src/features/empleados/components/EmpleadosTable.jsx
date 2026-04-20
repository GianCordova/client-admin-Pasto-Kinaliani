import { TableTemplate } from "../../../shared/components/ui/TableTemplate";

export const EmpleadosTable = () => {
  const columns = ["Nombre", "Apellido", "DPI", "Puesto", "Sueldo", "Estado"];

  const data = [
    {
      nombre: "Juan",
      apellido: "Pérez",
      dpi: "1234 56789 0101",
      puesto: "CHEF",
      sueldo: "Q 5,500",
      estado: "Activo"
    },
    {
      nombre: "María",
      apellido: "López",
      dpi: "9876 54321 0202",
      puesto: "MESERO",
      sueldo: "Q 3,200",
      estado: "Activo"
    }
  ];

  const formattedData = data.map(emp => ({
    col1: emp.nombre,
    col2: emp.apellido,
    col3: emp.dpi,
    col4: emp.puesto,
    col5: emp.sueldo,
    col6: emp.estado
  }));

  return (
    <TableTemplate
      title="Gestión de Personal"
      columns={columns}
      data={formattedData}
    />
  );
};