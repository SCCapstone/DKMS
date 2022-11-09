"use client";

import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default Providers;
