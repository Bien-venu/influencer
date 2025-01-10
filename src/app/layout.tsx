import Top from "@/components/Top";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Influence",
  description: "Influencers and campaign management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen w-full flex-col gap-2 overflow-hidden py-2 pb-8">
          <Top />
          {children}
        </main>
      </body>
    </html>
  );
}
