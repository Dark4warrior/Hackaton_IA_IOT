import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Smart Home",
  description: "Interface de gestion des lumières connectées",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
