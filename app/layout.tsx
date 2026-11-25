import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import sessionService from "@/lib/session";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await sessionService.getCurrent();
  const userName = session
    ? [session.firstName, session.lastName].filter(Boolean).join(" ") ||
      session.email
    : null;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar userName={userName} />
        <main className="mx-4 mt-10 mb-8">
          {children}
        </main>
        </body>
    </html>
  );
}
