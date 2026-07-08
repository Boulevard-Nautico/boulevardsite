import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import PasseiosSignature from "@/components/PasseiosSignature";
import Depoimentos from "@/components/Depoimentos";
import Footer from "@/components/Footer";
import WhatsappWidget from "@/components/WhatsappWidget";
import { getPublicSiteContent, getRenderableContent } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getPublicSiteContent();

  return {
    title: site.seo.title,
    description: site.seo.description,
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      siteName: site.brand.name,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function Home() {
  const site = getRenderableContent(await getPublicSiteContent());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: site.brand.name,
    description:
      "Passeios náuticos de alto padrão pela Costa Verde — Angra dos Reis e Ilha Grande.",
    provider: {
      "@type": "LocalBusiness",
      name: site.brand.name,
      email: site.contact.email,
      telephone: `+${site.contact.whatsapp}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Angra dos Reis",
        addressRegion: "RJ",
        addressCountry: "BR",
      },
      areaServed: "Angra dos Reis e Ilha Grande, RJ",
    },
    offers: site.tours.map((tour) => ({
      "@type": "Offer",
      name: tour.title,
      price: tour.price,
      priceCurrency: "BRL",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar brand={site.brand} />
      <main>
        <HeroSlider slides={site.hero} />
        <PasseiosSignature tours={site.tours} contact={site.contact} />
        <Depoimentos reviews={site.reviews} />
      </main>
      <Footer site={site} />
      <WhatsappWidget brandName={site.brand.name} contact={site.contact} />
    </>
  );
}
