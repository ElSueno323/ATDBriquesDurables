import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TranslationProvider } from "@/utils/useTranslation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATD Briques Durables",
  description: "Votre partenaire de confiance pour la construction durable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <TranslationProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
