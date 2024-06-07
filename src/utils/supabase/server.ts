import { createServerClient as SupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const createServerClient = () => {
  const cookieStore = cookies();

  return SupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    }
  );
};

const supabaseServer = createServerClient();

export default supabaseServer;
