"use client";
import { useEffect, useState } from "react";

export default function FloatingNavbar() {
  const [isAtTop, setIsAtTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = (e: any, isStart: boolean = false) => {
      setIsAtTop(window.scrollY <= window.innerHeight * 0.75);
      if (!isStart) setIsScrolling(true);

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        console.log("Scroll ended");
      }, 150);
    };

    handleScroll(undefined, true);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return <></>;
}
