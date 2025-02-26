/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useTransitionRouter } from "next-view-transitions";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import ThemeSwitch from "./theme-switch";

const urls: Array<{ name: string; href: string; className?: string }> = [
  { name: "about", href: "/" },
  { name: "blogs", href: "/blogs/*" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      },
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  return (
    <nav className="relative z-[100] flex items-center justify-between py-8 font-geist-mono">
      <a
        onClick={(e) => {
          e.preventDefault();
          router.push("/", {
            onTransitionReady: slideInOut,
          });
        }}
        href="/"
      >
        hexaa
      </a>
      <div className="flex items-center space-x-4 text-foreground/60">
        {urls.map(({ name, href, className }) => {
          const isActive = href.endsWith("/*")
            ? pathname.startsWith(href.replace("/*", ""))
            : pathname === href;
          return (
            <a
              key={name}
              onClick={(e) => {
                e.preventDefault();
                router.push(href.replace("/*", ""), {
                  onTransitionReady: slideInOut,
                });
              }}
              href={href.replace("/*", "")}
              className={cn(
                "hover:underline",
                isActive && "underline",
                className,
              )}
            >
              {name}
            </a>
          );
        })}
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
