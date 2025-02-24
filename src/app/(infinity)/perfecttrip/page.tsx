import { TapsPerfecttrip } from "@/components/perfecttrip/TapsPerfecttrip";

export default function PerfecTripPage() {
  return (
    <div>
      <img
        src="images/my-perfect-trip.png"
        className="w-full h-[60vh] object-cover -mt-50"
      />

      <div className="container mx-auto p-4 ">
        <TapsPerfecttrip/>
      </div>
    </div>
  );
}
