import type { Metadata, ResolvingMetadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { getDomain } from "@/utils/getDomain";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My blog | Cool story of my life!",
    description: "Cool story of my life!",
    openGraph: {
      type: "website",
      url: getDomain(),
      title: "My blog | Cool story of my life!",
      description: "Cool story of my life!",
      images: [
        {
          url: `${getDomain()}/image.png`,
          width: 2467,
          height: 2765,
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
