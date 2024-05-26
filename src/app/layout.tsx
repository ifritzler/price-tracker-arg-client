import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { UpPage } from "@/components";
import Navbar from "@/components/Navbar/Navbar";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explora gondolas",
  description:
    "Un proyecto dedicado a proporcionar información detallada sobre los productos que deseas adquirir, en un contexto donde los precios importan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Providers>
        <body className={`${montserrat.className} min-h-lvh dark:bg-gray-900`}>
          <Navbar />
          {children}
          <UpPage />
        </body>
      </Providers>
    </html>
  );
}
