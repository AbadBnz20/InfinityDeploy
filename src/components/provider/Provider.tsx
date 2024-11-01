"user client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
};
