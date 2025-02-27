"use client";
import { cn } from "@/lib/utils";

import Link from "@/components/link";

import { buttonVariants } from "@/components/ui/button";
import FuzzyText from "@/components/ui/fuzzy-text";
import FadeContent from "@/components/ui/fade-content";

export default function NotFound() {
  return (
    <FadeContent className="flex flex-col items-center space-y-4">
      <div className="flex max-h-[119px] flex-col items-center">
        <FuzzyText fontSize={100}>503</FuzzyText>
        <FuzzyText fontSize={40} fontFamily="Gochi Hand">
          service unavailable
        </FuzzyText>
      </div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "sm", variant: "ghost" }),
          "font-geist-mono",
        )}
      >
        go home
      </Link>
    </FadeContent>
  );
}
