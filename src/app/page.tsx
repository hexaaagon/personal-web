import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <p className="text-5xl">Work in Progress!</p>
      <p className="text-muted-foreground text-justify">
        yeah, this site is still under development.
      </p>
      <div className="text-muted-foreground/50 flex gap-2 font-mono text-sm *:transition *:hover:underline">
        <Link href="https://redesign.hexaa.sh">[development]</Link>
        <Link href="https://hexagonn.my.id">[old website]</Link>
      </div>
    </main>
  );
}
