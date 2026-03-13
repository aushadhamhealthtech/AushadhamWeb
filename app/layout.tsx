import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aushadham – Healthcare at Your Fingertips",
  description:
    "Aushadham connects you with top Ayurveda and healthcare professionals. Book appointments, upload reports, and get expert consultations online or in-clinic.",
  keywords: ["Ayurveda", "doctor consultation", "book appointment", "healthcare", "Aushadham"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans pb-[56px] lg:pb-0`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
