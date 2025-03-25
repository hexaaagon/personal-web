"use server";

interface Member {
  member: string;
  url: string;
}

export async function getWebring(
  webringUrl: URL = new URL("https://webring.hackclub.com/members.json"),
) {
  const response = await fetch(webringUrl);
  const members = (await response.json()) as Member[];

  const siteIndex = members.findIndex(
    (member) => new URL(member.url).hostname === "hexaa.sh",
  );
  const previousIndex = (siteIndex - 1 + members.length) % members.length;
  const nextIndex = (siteIndex + 1) % members.length;
  const previous = members[previousIndex];
  const next = members[nextIndex];

  return { previous, next };
}
