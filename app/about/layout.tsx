import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Habeeb Oke (Native Dev) — how curiosity, not a single defined path, led into software engineering.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
