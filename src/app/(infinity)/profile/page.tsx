import { UserActive } from "@/actions/auth/getuser";
import { FormProfile } from "@/components/profile/FormProfile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function ProfilePage() {

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
    <ToastContainer/>
    <div className="grid grid-cols-1 md:grid-cols-4 container mx-auto  mt-6">
     
      <aside className="w-64 h-[300px] bg-maincolor rounded-lg shadow p-6 mt-6">
        <div className="flex flex-col items-center p-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-4 border-blue-100">
              <img
                alt="Profile"
                className="rounded-full object-cover"
                src={useractive.photo}
              />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{useractive.firstname} {useractive.lastname}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>

        </div>
      </aside>
      <main className="col-span-3 p-6">
        <FormProfile firstname={useractive.firstname} lastname={useractive.lastname} birthdate={""} country={""} email={user.email || ""} />
      </main>
    </div>
   </>
  );
}
