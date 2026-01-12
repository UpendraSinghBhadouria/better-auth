import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-sm.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
