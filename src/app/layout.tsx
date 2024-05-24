import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { UpPage } from "@/components";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explora gondolas",
  description: "Un proyecto dedicado a proporcionar información detallada sobre los productos que deseas adquirir, en un contexto donde los precios importan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-lvh`}>
        {children}
        <UpPage />
      </body>
    </html>
  );
}
