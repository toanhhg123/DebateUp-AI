"use client";

import { ThemeProvider } from "@material-tailwind/react";

export function Layout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Layout;
