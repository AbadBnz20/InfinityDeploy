import { UserCookie } from "@/interfaces/auth-response";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<UserCookie | null >();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetSession()
  }, []);

  const GetSession = async () => {
    setLoading(true);
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
     if (user) {
       setSession(user?.user_metadata as UserCookie);
    }
    setLoading(false);
  };

  return {
    session,
    loading
  };
};
