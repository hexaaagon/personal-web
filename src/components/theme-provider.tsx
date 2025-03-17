import { type ComponentProps } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import ReactLenis from "lenis/react";

export function ThemeProvider({ children }: ComponentProps<"div">) {
  return (
    <ReactLenis root>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors expand />
      </NextThemesProvider>
    </ReactLenis>
  );
}
