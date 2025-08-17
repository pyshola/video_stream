import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { constants } from "@/config";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import LinearProgress from "@mui/material/LinearProgress";




export const metadata: Metadata = {
  title: constants.siteName,
  description: constants.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <React.Suspense fallback={<LinearProgress />}>
            {children}
          {children}
          </React.Suspense>
        </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
