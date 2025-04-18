"use client";
import { useEffect } from "react";
import { toast } from "sonner";

import Typewriter from "typewriter-effect";

import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "@/components/link";

export default function Landing() {
  useEffect(() => {
    setTimeout(() => {
      toast.warning("This website is under development.", {
        description: (
          <div className="flex flex-col gap-2">
            <p>You may encounter bugs or unfinished UI elements.</p>

            <Link
              href="https://hexagonn.my.id"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Go to old website
            </Link>
          </div>
        ),
      });
    }, 1000);
  }, []);

  return (
    <main className="font-sans">
      <section className="flex flex-col justify-center gap-4 px-4 transition-all *:w-full md:flex-row-reverse md:gap-0">
        <div className="bg-foreground/20">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <p className="text-2xl font-medium">hi 👋, i&apos;m hexaa.</p>
          <span className="text-foreground/90 text-sm">
            <Typewriter
              options={{
                loop: true,
                delay: 50,
                deleteSpeed: 20,
              }}
              onInit={(tw) => {
                tw.pauseFor(1500);

                const descriptions: Array<string> = [
                  "just a teen developer.",
                  "i love coding, maybe.",
                  "i'm very easily distracted. why? idk.",
                ];

                for (const description of descriptions) {
                  tw.typeString(description).pauseFor(5000).deleteAll();
                }

                tw.start();
              }}
            />
          </span>
        </div>
      </section>
      <Separator className="my-8" />
    </main>
  );
}
