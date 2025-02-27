"use client";
import type React from "react";

import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

export default function Link({
  children,
  href,
  ...props
}: Omit<React.ComponentProps<"a">, "onClick"> & { href: string }) {
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
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== href)
          router.push(href, {
            onTransitionReady: slideInOut,
          });
      }}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
}
