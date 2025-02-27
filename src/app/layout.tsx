import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Gochi_Hand,
  Inter,
  Rubik,
} from "next/font/google";

import "./globals.css";

import { ViewTransitions } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gochi-hand",
});

const grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-grotesque",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Hexaa",
  description:
    "Hi there, I'm Hexaa. I'm a full stack developer. this is my portfolio, go check it out!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-inter antialiased",
            `${geistSans.variable} ${geistMono.variable} ${gochiHand.variable} ${grotesque.variable} ${inter.variable} ${rubik.variable}`,
          )}
          suppressHydrationWarning
        >
          <ThemeProvider>
            <div className="mx-auto flex min-h-screen max-w-screen-md flex-col px-4">
              <Navbar />
              <Separator className="mb-12" />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
