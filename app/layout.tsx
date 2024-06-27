import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./_components/navbar";
import { SideNav } from "./_components/side-nav";
import { StateProviders } from "@/providers/state-providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className} suppressHydrationWarning>
        <StateProviders>
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
        </StateProviders>
      </body>
    </html>
  );
}
