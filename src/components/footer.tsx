"use client";
import { usePathname } from "next/navigation";

import HCWebring from "@/components/hackclub-webring";
import FadeContent from "@/components/ui/fade-content";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const pathname = usePathname();

  return (
    <FadeContent className="mt-auto">
      <Separator />
      <footer className="flex justify-between px-2 py-5">
        <p className="text-sm">&copy; 2025 - Hexaa</p>
        {pathname === "/" && <HCWebring />}
      </footer>
    </FadeContent>
  );
}
