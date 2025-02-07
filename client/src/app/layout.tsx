import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Player from "@/components/Player";
import { Toaster } from "sonner";
import AuthCheck from "@/components/AuthCheck";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rafton - Music platform",
  description: "Upload your song and become a star",
  keywords: "Music, songs, artists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-rafton-blue text-white ${inter.className}`}>
        <AuthCheck>
          <Navbar />
          <main className="w-screen p-5 flex items-center justify-center">
            {children}
            <Toaster richColors />
            <Footer />
          </main>
          <Player />
        </AuthCheck>
      </body>
    </html>
  );
}
