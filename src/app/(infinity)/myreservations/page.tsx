import { GetReservationById } from "@/actions/reservation/reservation";
import { TableReservation } from "@/components/myreservation/TableReservation";

export default async function MyReservationsPage() {
  const items = await GetReservationById();
  return (
    <div className="container mx-auto px-4">
      <h3 className="text-xl mt-6">Mis reservas</h3>
      <div className="my-6">
        <TableReservation items={items} />
      </div>
    </div>
  );
}
