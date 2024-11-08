import { auth } from "@/auth.config";
import { FormProfile } from "@/components/profile/FormProfile";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 container mx-auto  mt-6">
      <aside className="w-64 h-[300px] bg-maincolor rounded-lg shadow p-6 mt-6">
        <div className="flex flex-col items-center p-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-4 border-blue-100">
              <img
                alt="Profile"
                className="rounded-full object-cover"
                src={session.user.image}
              />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{session.user.firstname} {session.user.lastname}</h2>
          <p className="text-sm text-gray-500">{session.user.email}</p>

          {/* <nav className="mt-8 w-full">
            <Link
              className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-blue-600"
              href="#"
            >
              <div className="mr-2 h-2 w-2 rounded-full bg-blue-600" />
              Personal Information
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50"
              href="#"
            >
              Payment
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50"
              href="#"
            >
              Change Password
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50"
              href="#"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </nav> */}
        </div>
      </aside>
      <main className="col-span-3 p-6">
        <FormProfile firstname={session.user.firstname} lastname={session.user.lastname} birthdate={session.user.birthdate} country={session.user.country} email={session.user.email} phone={session.user.phone} />
      </main>
    </div>
  );
}
