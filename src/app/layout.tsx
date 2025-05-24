import "./globals.css";

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Inter,
  Rubik,
} from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const grotesque = Bricolage_Grotesque({
  variable: "--font-grotesque",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hexaa",
  description: "just a random guy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Suppress Hydration Warning because of Next Themes. */
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${grotesque.variable} ${inter.variable} ${rubik.variable} font-grotesque antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
