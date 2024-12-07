import { Information } from "@/components/reservation/Information";
import { InformationRoom } from "@/components/reservation/InformationRoom";

export default function ReservationPage() {
  return (
    <>
      <div className="container mx-auto p-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Confirmar Pago</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Information />
          <InformationRoom />
        </div>
      </div>
    </>
  );
}
