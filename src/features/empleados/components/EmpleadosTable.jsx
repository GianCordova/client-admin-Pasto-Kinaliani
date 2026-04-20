import { TableTemplate } from "../../../shared/components/ui/TableTemplate";

export const EmpleadosTable = () => {
  const columns = ["name", "surname", "dpi", "puesto", "sueldo", "estado"];

  const data = [
    {
      name: "Juan",
      surname: "Pérez",
      dpi: "1234 56789 0101",
      puesto: "CHEF",
      sueldo: "Q 5,500",
      estado: "Activo"
    },
    {
      name: "María",
      surname: "López",
      dpi: "9876 54321 0202",
      puesto: "MESERO",
      sueldo: "Q 3,200",
      estado: "Inactivo"
    }
  ];

  const formattedData = data.map(emp => ({
    col1: emp.name,
    col2: emp.surname,
    col3: emp.dpi,
    col4: emp.puesto,
    col5: emp.sueldo,
    col6: emp.status
  }));

  return (
    <TableTemplate
      title="Gestion de Personal"
      columns={columns}
      data={data}
    />
  );
};