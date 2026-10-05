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
  title: "Next Demo - WEB-25-12",
  description: "Created live in lecture",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex text-sm px-4 my-2 bg-gray-200">
          <div className="w-full">Next Demo</div>
          <ul className="flex flex-row gap-2 ">
            <li>Blog</li>
          </ul>
        </nav>
        <main className="mx-4 my-4">
          {children}
        </main>
        </body>
    </html>
  );
}
