"use client";

import MuiTheme from "@/provider/mui-theme";
import { Footer, Navbar } from "@/components";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthContextProvider } from "@/provider/auth";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        />
      </head>
      <body className={roboto.className}>
        <Toaster richColors />
        <AuthContextProvider>
          <MuiTheme>
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          </MuiTheme>
        </AuthContextProvider>
      </body>
    </html>
  );
}
