import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { getAssetPath } from '@/lib/base-path';
import { SidebarProvider } from '@/lib/sidebar-provider';
import { ThemeProvider } from '@/lib/theme-provider';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generic Functions - Documentation",
  description: "A comprehensive, lightweight utility library",
  icons: {
    icon: getAssetPath('/gf.png'),
    shortcut: getAssetPath('/gf.png'),
    apple: getAssetPath('/gf.png'),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
