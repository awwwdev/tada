// import { User } from "@/types";
import { createClientForBrowser } from "@/utils/supabase/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

// type Res = { message: string; user: User };
export default function useUserMe() {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: async () => {
      const supabase = createClientForBrowser();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!data.user) return null;
      const { data: userView, error: userViewError } = await supabase.from("user_view").select().eq("id", data.user.id).single();
      if (userViewError) throw userViewError;
      return userView;
    }
  });
}


// const getSupabaseAuthUser = async (supabase) => {
//   const sessionRes = await supabase.auth.getSession();
//   console.log("🚀 ~ sessionRes:", sessionRes)
//   if (!sessionRes) return null;
//   if (sessionRes.error) throw new Error(sessionRes.error.message);
//   console.log("🚀 ~ sessionRes?.data:", sessionRes?.data)
//   if (!sessionRes?.data?.session) return null;
//   const userAuthMe = sessionRes?.data?.session?.user;
//   console.log("🚀 ~ userAuthMe:", userAuthMe)
//   return userAuthMe;
// };
