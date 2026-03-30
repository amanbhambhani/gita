import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gita AI – Krishna Guidance",
  description: "Seek divine guidance from the Bhagavad Gita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-50 to-white min-h-screen`}>
        <Navbar />
        {children}
        <footer className="py-8 text-center text-gray-500 border-t border-blue-100 mt-auto">
          <p>Created and Designed by <span className="font-semibold text-blue-600">Aman Bhambhani</span></p>
        </footer>
      </body>
    </html>
  );
}
