import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from '@/components/ui/toaster';

const JosefinSans = localFont({
  src: "./fonts/JosefinSans-VariableFont_wght.ttf",
  variable: "--font-fammily-JosefinSans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Accessor",
  description: "RBAC - Role Based Access Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${JosefinSans.variable} font-josefin`}
        id="heroPatterns"
      >
        <main className="h-screen flex flex-col justify-center items-center">
          <Navbar />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
