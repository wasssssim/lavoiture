import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LAVOITURE — Centre de Detailing Automobile",
  description:
    "Renovation, protection et esthetique automobile. Sublimez votre vehicule avec nos prestations de detailing haut de gamme.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
