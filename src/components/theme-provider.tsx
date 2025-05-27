import { type ComponentProps } from "react";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

//import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ReactLenis from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export function ThemeProvider({ children }: ComponentProps<"div">) {
  return (
    <>
      {/*<ViewTransitions>*/}
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <ReactLenis root>{children}</ReactLenis>
        <Toaster richColors expand />
        <SmoothCursor disableRotation />
      </NextThemesProvider>
      {/*</ViewTransitions>*/}

      <Analytics />
      <SpeedInsights />
    </>
  );
}
