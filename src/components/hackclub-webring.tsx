"use client";
import useSWR from "swr";
import { getWebring } from "@/lib/actions/webring";

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
  const { data } = useSWR(
    "https://webring.hackclub.com/members.json",
    getWebring,
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger className="group flex items-center space-x-2">
          {!data ? (
            <></>
          ) : (
            <Link href={data.previous.url}>
              <ChevronLeft size={16} />
            </Link>
          )}
          <Link href="https://webring.hackclub.com">
            <Image
              src="/static/images/hackclub.svg"
              alt="Hack Club Webring"
              width={20}
              height={20}
              className="grayscale transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </Link>
          {!data ? (
            <></>
          ) : (
            <Link href={data.next.url}>
              <ChevronRight size={16} />
            </Link>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Click the arrows to see other websites of Hack Club members.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
