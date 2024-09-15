import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800">GeomPT</h1>
          <div className="flex-grow flex justify-end">
            <Link href="/progress" passHref>
              <h1 className="bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300">
                progress
              </h1>
            </Link>
            <Link href="/plan" passHref>
              <h1 className="bg-purple-600 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-purple-700 transition duration-300">
                start session
              </h1>
            </Link>
          </div>
        </header>
        <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
        {children}
      </body>
    </html>
  );
}
