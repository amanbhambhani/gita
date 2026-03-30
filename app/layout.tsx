import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif" 
});

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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-[#fdfcf8] text-[#2c2c2c] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-12 text-center border-t border-[#e5e1d8] bg-[#f9f7f2]">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-serif italic text-xl mb-2 text-[#5a5a40]">"Whenever there is a decline in righteousness, I manifest Myself..."</p>
            <p className="text-sm text-[#8e8e8e]">Created and Designed by <span className="font-semibold text-[#5a5a40]">Aman Bhambhani</span></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
