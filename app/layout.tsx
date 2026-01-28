import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Melisa Onder",
  description: "Melisa Onder - Political Science & Legal Studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable}`}>
      <head />
      <body className="font-serif antialiased bg-beige-pink text-deep-brown">
        {children}
      </body>
    </html>
  );
}
