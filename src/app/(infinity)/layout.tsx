import { Footer, NavbarC } from "@/components";
import { WidgetChatbot } from "@/components/chatbot/WidgetChatbot";
import { createClient } from "@/utils/supabase/server";
import { NextUIProvider } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function InfinityLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <>
    
      <main className="min-h-screen flex flex-col">
        <NextUIProvider>
          <NavbarC />
          <div className="flex-grow">{children}</div>
          <Footer />
          <WidgetChatbot/>
        </NextUIProvider>
      </main>
    </>
  );
}
