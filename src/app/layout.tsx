import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalProviders from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          <Navbar />
          <div className="pt-16 max-w-7xl mx-auto ">{children}</div>

          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </GlobalProviders>
      </body>
    </html>
  );
}
