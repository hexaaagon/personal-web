import Link from "next/link";
import AnimateOnView from "@/components/animation";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center *:transition-[font-size,line-height]">
      <p className="text-3xl sm:text-5xl">Work in Progress!</p>
      <p className="text-muted-foreground text-justify text-xs sm:text-base">
        yeah, this site is still under development.
      </p>
      <div className="flex gap-2 font-mono text-xs text-sky-700 *:transition-all *:hover:underline sm:text-sm dark:text-sky-600">
        <Link href="https://redesign.hexaa.sh">[development]</Link>
        <Link href="https://hexagonn.my.id">[old website]</Link>
      </div>
    </main>
  );
}
