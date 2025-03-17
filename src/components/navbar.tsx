"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import ThemeSwitch from "./theme-switch";

const urls: Array<{ name: string; href: string; className?: string }> = [
  { name: "home", href: "/" },
  { name: "blogs", href: "/blogs/*" },
  { name: "guestbook", href: "/guestbook/*" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-[100] flex items-center justify-between py-8 font-mono">
      <Link href="/">hexaa</Link>
      <div className="text-foreground/60 flex items-center space-x-4">
        {urls.map(({ name, href, className }) => {
          const isActive = href.endsWith("/*")
            ? pathname.startsWith(href.replace("/*", ""))
            : pathname === href;
          return (
            <Link
              key={name}
              href={href.replace("/*", "")}
              className={cn(
                "hover:underline",
                isActive && "underline",
                className,
              )}
            >
              {name}
            </Link>
          );
        })}
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
