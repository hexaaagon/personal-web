"use client";
import FadeContent from "./ui/fade-content";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <FadeContent className="mt-auto">
      <Separator />
      <footer className="px-2 py-5">
        <p className="text-sm">&copy; 2025 - Hexaa</p>
      </footer>
    </FadeContent>
  );
}
