import { auth } from "@/auth.config";
import { Footer, NavbarC } from "@/components";
import { NextUIProvider } from "@nextui-org/react";
import { redirect } from "next/navigation";


export default async function InfinityLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NextUIProvider>
        <NavbarC />
        <div className="flex-grow">{children}</div>
        <Footer  />
      </NextUIProvider>
    </main>
  );
}
