import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthListener from "@/components/auth/AuthListener";
import Protected from "@/components/auth/Protected";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Socials | Messaging App",
  description: "created by github.com/zeyadsallam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthListener>
          <Protected>{children}</Protected>
        </AuthListener>
      </body>
    </html>
  );
}
