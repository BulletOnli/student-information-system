"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";

const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReactQueryProvider>
  );
};

export default GlobalProviders;
