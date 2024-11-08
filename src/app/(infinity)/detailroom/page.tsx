import { auth } from "@/auth.config";
import { FormRoom } from "@/components/detailsRoom/FormRoom";
import { InformationRoom } from "@/components/reservation/InformationRoom";
import { redirect } from "next/navigation";

export default async function DetailRoomPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto p-4">
       <h1 className="text-2xl font-bold mb-2">Datos de los huespedes</h1>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-3">
          <FormRoom firstname={session.user.firstname} lastname={session.user.lastname} birthdate={session.user.birthdate} country={session.user.country} email={session.user.email} phone={session.user.phone}/>
        </div>
        <div className="col-span-2">
        <InformationRoom/>
        </div>
      </div>

    </div>
  );
}