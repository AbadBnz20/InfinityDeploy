import { ContentDetailPayment } from "@/components/payment/ContentDetailPayment";
import { ContentPayment } from "@/components/payment/ContentPayment";

export default function CheckoutPaymentPage() {
  const bookingData = {
    departure: {
      from: "Aeropuerto Internacional",
      to: "Hotel Centro Ciudad",
      date: "24 Ene 2024",
      time: "14:30",
      vehicle: {
        name: "Sedán Ejecutivo",
        price: 50.0,
      },
      passengers: 3,
    },
    return: {
      date: "30 Ene 2024",
      time: "10:00",
      vehicle: {
        name: "Sedán Ejecutivo",
        price: 50.0,
      },
    },
  };
  return (
    <div className="grid justify-center items-center min-h-[70vh] w-[100%]">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex-grow-0 flex-shrink-0">
          <ContentPayment />

          {/* <Information/> */}
        </div>
        <div className="flex-grow flex-shrink">
          <ContentDetailPayment {...bookingData} />
        {/* <InformationRoom/> */}
        </div>
      </div>
    </div>
  );
}
