import { TableTemplate } from "../../../shared/components/ui/TableTemplate";

export const ReservacionesTable = () => {
  const columns = [
    "id_usuario",
    "fecha",
    "hora",
    "numero_personas",
    "numero_mesas",
    "estado"
  ];

  const data = [
    {
      id_usuario: "USR001",
      fecha: "2026-04-14",
      hora: "18:00",
      numero_personas: 4,
      numero_mesas: 2,
      estado: "pendiente"
    },
    {
      id_usuario: "USR002",
      fecha: "2026-04-15",
      hora: "20:00",
      numero_personas: 2,
      numero_mesas: 1,
      estado: "confirmada"
    }
  ];

  return (
    <TableTemplate
      title="Reservaciones"
      columns={columns}
      data={data}
    />
  );
};