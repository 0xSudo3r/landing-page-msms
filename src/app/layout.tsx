import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدير المحل - نظام إدارة محلات الموبايل",
  description: "أفضل برنامج لإدارة محلات الموبايل والصيانة في مصر. تتبع المبيعات، المخزون، والضمان بسهولة.",
  openGraph: {
    title: "مدير المحل - نظام إدارة محلات الموبايل",
    description: "أفضل برنامج لإدارة محلات الموبايل والصيانة في مصر.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
