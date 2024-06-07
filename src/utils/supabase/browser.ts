import { createBrowserClient as SupabaseBrowserClient } from "@supabase/ssr";

const createBrowserClient = () => {
  return SupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

const supabaseBrowser = createBrowserClient();

export default supabaseBrowser;
