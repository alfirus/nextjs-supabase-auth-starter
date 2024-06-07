"use client";

import supabaseBrowser from "@/utils/supabase/browser";
import { useAuthStore } from "@/utils/zustand";
import { ReactNode, useEffect } from "react";

const AuthListener = ({ children }: { children: ReactNode }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const listener = supabaseBrowser.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.data.subscription?.unsubscribe();
  }, []);

  return children;
};

export default AuthListener;
