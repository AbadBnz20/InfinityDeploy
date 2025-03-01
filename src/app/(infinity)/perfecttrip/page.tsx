import { TapsPerfecttrip } from "@/components/perfecttrip/TapsPerfecttrip";

export default function PerfecTripPage() {
  return (
    <div>
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="perfecttrip/header.jpg"
          alt="Family enjoying a luxury beach vacation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in-up text-white">
              Mi viaje perfecto
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-4 ">
        <TapsPerfecttrip />
      </div>
    </div>
  );
}
