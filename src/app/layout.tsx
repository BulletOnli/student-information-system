import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalProviders from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProviders>
          <SidebarProvider>
            <div className="w-full flex h-screen bg-background">
              <CustomSidebar />
              <div className="w-full overflow-y-auto">
                <Header />
                {children}
              </div>
            </div>
          </SidebarProvider>

          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </GlobalProviders>
      </body>
    </html>
  );
}
