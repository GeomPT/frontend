import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import NavBar from "./navBar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "GeomPT",
    description: "Enhancing Your Physical Therapy with AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 antialiased`}
        >
          <NavBar></NavBar>
          {children}
        </body>
      </html>
    );
}
