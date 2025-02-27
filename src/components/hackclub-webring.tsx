"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HCWebring() {
  const [prevUrl, setPrevUrl] = useState<string>("#");
  const [nextUrl, setNextUrl] = useState<string>("#");

  useEffect(() => {
    const fetchWebring = async () => {
      try {
        const res = await fetch("https://webring.hackclub.com/members.json");
        const members: { url: string }[] = await res.json();

        const currentHostname = window.location.hostname.toLowerCase();
        const currentIndex = members.findIndex(
          (member) => new URL(member.url).hostname === currentHostname,
        );

        if (currentIndex !== -1) {
          const prevIndex =
            (currentIndex - 1 + members.length) % members.length;
          const nextIndex = (currentIndex + 1) % members.length;
          setPrevUrl(members[prevIndex].url);
          setNextUrl(members[nextIndex].url);
        }
      } catch (error) {
        console.error("Failed to fetch webring members:", error);
      }
    };

    fetchWebring();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger className="group flex items-center space-x-2">
          <Link href={prevUrl} id="previousBtn">
            <ChevronLeft size={16} />
          </Link>
          <Link href="https://webring.hackclub.com">
            <Image
              src="/static/images/hackclub.svg"
              alt="Hack Club Webring"
              width={20}
              height={20}
              className="grayscale transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </Link>
          <Link href={nextUrl} id="nextBtn">
            <ChevronRight size={16} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click the arrows to see other websites of Hack Club members.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
