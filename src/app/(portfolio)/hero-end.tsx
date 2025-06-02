"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import moment from "moment-timezone";
import Link from "next/link";

export default function HeroEnd() {
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="absolute right-0 bottom-4 left-0 w-full">
      <Link
        className={`font-montreal-mono relative container flex items-end justify-start text-xs transition-[opacity] duration-300 ${isAtTop ? "opacity-90 dark:opacity-75" : "pointer-events-none opacity-0"}`}
        href="https://time.is/jakarta"
        target="_blank"
      >
        <p>[{isAtTop ? <LocalTime /> : "00:00:00"}]</p>
      </Link>
    </div>
  );
}

const LocalTime = dynamic(
  () =>
    Promise.resolve(() => {
      const [localTime, setLocalTime] = useState<string>(
        moment.tz("Asia/Jakarta").format("HH:mm:ss"),
      );

      useEffect(() => {
        const timeInterval = setInterval(() => {
          setLocalTime(moment.tz("Asia/Jakarta").format("HH:mm:ss"));
        }, 1000);

        return () => clearInterval(timeInterval);
      }, []);

      return <>{localTime}</>;
    }),
  { ssr: false },
);
