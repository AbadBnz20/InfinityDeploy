import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const session = await auth();

  // console.log(session)
  // if (session?.user) {
  //     redirect('/');
  // }

  return (
    <main className="">
      <ToastContainer />
      <div className="w-full">{children}</div>
    </main>
  );
}
