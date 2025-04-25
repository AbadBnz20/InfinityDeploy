import { GetSession } from "@/actions/auth/getuser";
import { TapsPerfecttrip } from "@/components/perfecttrip/TapsPerfecttrip";

export default async function PerfecTripPage() {
   const user = await GetSession()
  return (
    <div>
        <TapsPerfecttrip {...user} />
    </div>
  );
}
