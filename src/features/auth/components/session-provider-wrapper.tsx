"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

type SessionProviderWrapper = {
  children: React.ReactNode;
};
function SessionProviderWrapper({ children }: SessionProviderWrapper) {
  return <SessionProvider>{children}</SessionProvider>;
}

export { SessionProviderWrapper };
