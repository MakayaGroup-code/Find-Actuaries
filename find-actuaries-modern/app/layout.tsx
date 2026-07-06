import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Find Actuaries | Africa opens every direction",
  description: "An idea born in 2001, rebuilt as Find Actuaries Limited in 2026. Connecting actuarial talent across Nigeria, Ghana, Kenya and Tanzania to the paths their qualification actually opens.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}