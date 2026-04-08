import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthAI Coach",
  description: "Votre tableau de bord de santé intelligent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning empêche vos extensions Chrome de faire planter le terminal
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}