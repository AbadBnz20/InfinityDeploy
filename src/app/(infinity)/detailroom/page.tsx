import { UserActive } from "@/actions/auth/getuser";
import { FormRoom } from "@/components/detailsRoom/FormRoom";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function DetailRoomPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const useractive = await UserActive(user.id);
  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-2">Datos de los huespedes</h1>
        <FormRoom
          firstname={useractive.firstname}
          lastname={useractive.lastname}
          birthdate={""}
          country={"Bolivia"}
          email={user.email || ""}
          phone={user.phone || ""}
        />
      </div>
    </>
  );
}
