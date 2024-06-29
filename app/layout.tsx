import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./_components/navbar";
import { SideNav } from "./_components/side-nav";
import ReduxStoreProvider from "@/providers/redux-store-provider";
import { cn } from "@/lib/utils";
import UserProvider from "@/providers/server-calls-provider";

const afacad = Afacad({
  weight: ["400", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "This is Admin portal on ecommerse project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("no-scrollbar")}>
      <body className={afacad.className} suppressHydrationWarning>
        <ReduxStoreProvider>
          <UserProvider>
            <Navbar />
            <SideNav>{children}</SideNav>
            <Toaster
              offset={18}
              position="top-right"
              richColors
              // closeButton
              theme="system"
              duration={1500}
            />
          </UserProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
