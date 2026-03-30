import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Gita AI – Krishna Guidance App",
  description: "A divine guidance application that provides solutions to life problems using Bhagavad Gita wisdom, powered by Gemini AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}
