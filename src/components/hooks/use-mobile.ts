import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const checkMobile = () => {
      setIsMobile(isTouchDevice || window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", checkMobile);
    checkMobile();

    return () => mql.removeEventListener("change", checkMobile);
  }, []);

  return !!isMobile;
}
