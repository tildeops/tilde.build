import type { Metadata } from "next";

// Internal tooling (e.g. the liquid-shader recorder). Keep it out of search
// indexes — robots.ts also disallows /dev/, this is the belt-and-suspenders.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
