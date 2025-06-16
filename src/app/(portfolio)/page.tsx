import Hero from "./hero";
import SocialCard from "./about-social";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="spacer-y-4 px-6 pt-8 pb-16 text-center">
        <p className="text-lg font-medium">Checkpoint 1/5 (20%)</p>
        <p className="text-muted-foreground text-sm">
          you&apos;re not supposed to be here. this is the redesign branch.{" "}
          <Link href="https://hexaa.sh" className="text-blue-400 underline">
            Head back to the production web.
          </Link>
        </p>
      </div>
      <SocialCard />
    </main>
  );
}
