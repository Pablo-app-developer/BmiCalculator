import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de IMC — Índice de Masa Corporal",
  description:
    "Calcula tu Índice de Masa Corporal (IMC) gratis. Ingresa tu peso y altura y descubre si estás en tu peso ideal. Con tabla de categorías y recomendaciones.",
  keywords: ["calculadora IMC", "índice de masa corporal", "peso ideal", "IMC normal", "calcular IMC"],
  openGraph: {
    title: "Calculadora de IMC — Índice de Masa Corporal",
    description: "Calcula tu IMC gratis en segundos. Incluye tabla de categorías y consejos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
