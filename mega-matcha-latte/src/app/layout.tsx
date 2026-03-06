import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matcha Blanc",
  description: "A collision of calm and chaos. Scrollytelling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} tracking-tight antialiased bg-[#050505] text-[#FDFDF9]`}>
        {children}
      </body>
    </html>
  );
}
