"use client";

import { useEffect, useRef } from "react";

interface AnimateOnViewProps {
  delay?: number;
  duration?: number;
}

export default function AnimateOnView({
  children,
  delay = 0,
  duration = 300,
  ...props
}: React.ComponentProps<"div"> & AnimateOnViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      "p, div, h1, h2, h3, h4, h5, h6, span, a, button, section, article, header, footer, main, aside, nav, ul, ol, li",
    );

    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      const elementDelay = delay + index * 100;

      htmlElement.style.opacity = "0";
      htmlElement.style.visibility = "hidden";
      htmlElement.style.transition = "none";
      htmlElement.style.willChange = "transform, opacity";

      htmlElement.animate(
        [
          {
            opacity: 0,
            transform: "translateY(20px) scale(0.95)",
            visibility: "hidden",
          },
          {
            opacity: 1,
            transform: "translateY(0px) scale(1)",
            visibility: "visible",
          },
        ],
        {
          duration,
          delay: elementDelay,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        },
      );
    });
  }, [delay, duration]);

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
}
