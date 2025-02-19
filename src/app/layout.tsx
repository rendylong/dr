import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YourSaaS - 智能化的 SaaS 解决方案",
  description: "为您的业务提供智能化的 SaaS 解决方案，提升效率，降低成本。",
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
