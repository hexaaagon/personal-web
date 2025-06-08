import Link from "next/link";
import AnimateOnView from "@/components/animation";
import HeroEnd from "./hero-end";
import SocialCard from "./social-card";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="relative flex min-h-[90svh] flex-col">
        <div className="pb-4 *:leading-5">
          <p>Backend - Checkpoint 4/5</p>
          <p className="text-sm">
            if you wonder what is this, it&apos;s just a checkpoint. visit the{" "}
            <Link
              href="https://hexaa.sh"
              className="text-blue-600 transition-colors"
            >
              production web
            </Link>{" "}
            instead.
          </p>
          <p className="text-sm">progress: 90% - finishing</p>
        </div>
        <SocialCard />
        <HeroEnd />
      </section>
    </main>
  );
}
