"use client";
import { useDiscord } from "@/hooks/use-discord";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function SocialCard() {
  const discord = useDiscord();

  return (
    <main className="flex flex-col gap-8">
      <section className="font-montreal-mono flex flex-col gap-4 text-xs *:overflow-x-scroll *:rounded-lg *:bg-black/10 *:p-4 *:px-8 *:dark:bg-black/20">
        <pre>{JSON.stringify(discord, null, 2)}</pre>
        <pre>{`
          - discord/lanyard ✅
          - lyrics
          - easy-peasy
          - lyrics & easy-peasy combined
          - spotify (last.fm)
        `}</pre>
      </section>
    </main>
  );
}

// export function SpotifyCard({
//   className,
//   style,
//   discord,
//   ...props
// }: Omit<React.ComponentProps<"div">, "children"> & {
//   discord: LanyardWebsocket;
// }) {
//   // TODO: animating this thing
//   if (!discord.status) return <></>;
//
//   discord.status.spotify && discord.status.
//
//   return (
//     <div
//       className={cn("bg-cover", className)}
//       style={{
//         ...style,
//         backgroundImage: `url(${discord.status.spotify.album_art_url})`,
//       }}
//       {...props}
//     >
//       <div className="bg h-full w-full"></div>
//     </div>
//   );
// }
