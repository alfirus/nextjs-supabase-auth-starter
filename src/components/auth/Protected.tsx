"use client";

import { useAuthStore } from "@/utils/zustand";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const Protected = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) {
    if (pathname !== "/login" && pathname !== "/register") {
      return redirect("/login");
    }
  }

  if (user) {
    if (pathname === "/login" || pathname === "/register") {
      return redirect("/");
    }
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      {children}
    </>
  );
};

export default Protected;
