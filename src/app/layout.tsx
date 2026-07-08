import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Aguacate Tex-Mex | Porto",
  description: "Autêntico sabor Tex-Mex no coração do Porto. Tacos, burritos, nachos e muito mais no Mercado Bom Sucesso. Pede online pelo Uber Eats ou Glovo.",
  keywords: ["tacos", "burritos", "tex-mex", "porto", "restaurante mexicano", "mercado bom sucesso"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Aguacate Tex-Mex | Porto",
    description: "Autêntico sabor Tex-Mex no coração do Porto. Tacos, burritos, nachos e muito mais.",
    url: "https://web-pink-seven-gedq6x5epx.vercel.app",
    siteName: "Aguacate Tex-Mex",
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
