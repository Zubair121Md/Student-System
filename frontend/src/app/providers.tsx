"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { Chatbot } from "@/components/Chatbot";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Chatbot />
    </AuthProvider>
  );
}
