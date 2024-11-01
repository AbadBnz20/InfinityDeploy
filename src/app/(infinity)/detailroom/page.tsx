import { FormRoom } from "@/components/detailsRoom/FormRoom";
import { InformationRoom } from "@/components/reservation/InformationRoom";

export default function DetailRoomPage() {
  return (
    <div className="container mx-auto p-4">
       <h1 className="text-2xl font-bold mb-2">Datos de los huespedes</h1>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-3">
          <FormRoom/>
        </div>
        <div className="col-span-2">
        <InformationRoom/>
        </div>
      </div>

    </div>
  );
}