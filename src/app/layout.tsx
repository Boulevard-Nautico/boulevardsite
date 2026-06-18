import type { Metadata } from "next";
import { Marcellus, Jost, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boulevardnautico.com.br"),
  title: {
    default: "Boulevard Náutico | Padrão Ouro em Angra dos Reis",
    template: "%s | Boulevard Náutico",
  },
  description:
    "Passeios náuticos de alto padrão pela Costa Verde — Angra dos Reis e Ilha Grande. Roteiros exclusivos, frota premium e atendimento concierge.",
  keywords: [
    "passeios de barco Angra dos Reis",
    "lancha Ilha Grande",
    "passeio náutico Costa Verde",
    "Super Lagoa Azul",
    "Boulevard Náutico",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Boulevard Náutico",
    title: "Boulevard Náutico | Padrão Ouro em Angra dos Reis",
    description:
      "Passeios náuticos de alto padrão pela Costa Verde — Angra dos Reis e Ilha Grande.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${marcellus.variable} ${jost.variable} ${jakarta.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
