import { type ComponentProps } from "react";

//import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import ReactLenis from "lenis/react";

export function ThemeProvider({ children }: ComponentProps<"div">) {
  return (
    //  <ViewTransitions>
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactLenis root>{children}</ReactLenis>
      <Toaster richColors expand />
    </NextThemesProvider>
    //  </ViewTransitions>
  );
}
