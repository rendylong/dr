import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GBase - Enterprise Deep Research, 10x more insights",
  description: "Leverage internal knowledge with the internet's vast resources. Enable deep research for your entire team at 1/10 of the cost.",
  openGraph: {
    title: "GBase - Enterprise Deep Research, 10x more insights",
    description: "Leverage internal knowledge with the internet's vast resources. Enable deep research for your entire team at 1/10 of the cost.",
    type: "website",
  },
  twitter: {
    title: "GBase - Enterprise Deep Research, 10x more insights",
    description: "Leverage internal knowledge with the internet's vast resources. Enable deep research for your entire team at 1/10 of the cost.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
