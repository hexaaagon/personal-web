"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import ThemeSwitch from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";

const urls: Array<{ name: string; href: string; className?: string }> = [
  { name: "home", href: "/" },
  { name: "blogs", href: "/blogs/*" },
  { name: "guestbook", href: "/guestbook/*" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <nav
      className={cn(
        "bg-background/60 sticky top-0 z-[100] mb-12 space-y-7 pt-8 font-mono backdrop-blur-lg transition-transform duration-700 ease-in-out sm:-mx-12",
        isScrolling ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex items-center justify-between sm:mx-12">
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
      </div>
      <Separator />
    </nav>
  );
}

export default Navbar;
