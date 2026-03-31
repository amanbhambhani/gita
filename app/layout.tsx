import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-ui",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Gita Guidance – Krishna Wisdom App",
  description: "A divine guidance application that provides solutions to life problems using Bhagavad Gita wisdom, interpreted for the modern world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${libreBaskerville.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        <Navbar />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
