import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FloatingHeader from "@/components/FloatingHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee — Slow-roasted",
  description: "A scroll-scrubbed roast story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FloatingHeader />
        {children}
      </body>
    </html>
  );
}
