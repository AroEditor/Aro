import { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster as Sonner } from "~/components/ui/sonner";
import { Toaster } from "~/components/ui/toaster";
import "~/lib/fonts/CMUSerif/stylesheet.css";

import "./globals.css";
import ProgressBar from "./progress-bar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const defaultUrl = process.env.VERCEL_URL ? `https://app.aroeditor.io` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Aro Editor",
  description: "The No-code Typesetting Editor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} font-sans`}>
      <body className="bg-background text-foreground">
        <ProgressBar>
          <main className="flex min-h-screen flex-col items-center">{children}</main>
          <Toaster />
          <Sonner />
        </ProgressBar>
      </body>
    </html>
  );
}
