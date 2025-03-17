"use client";

import { Sun, Moon } from "lucide-react";
import type { Button } from "@/components/ui/button";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export default function ThemeSwitch({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className={cn("size-4 rounded-full", className)} />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(className)}
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <>
          <Sun className="size-4" />
          <p className="sr-only">Change theme to Light Mode</p>
        </>
      ) : (
        <>
          <Moon className="size-4" />
          <p className="sr-only">Change theme to Dark Mode</p>
        </>
      )}
    </button>
  );
}
