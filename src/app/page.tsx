import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import PasseiosSignature from "@/components/PasseiosSignature";
import Depoimentos from "@/components/Depoimentos";
import Footer from "@/components/Footer";
import WhatsappWidget from "@/components/WhatsappWidget";
import { site } from "@/content/site";

export default function Home() {
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
      <Navbar />
      <main>
        <HeroSlider />
        <PasseiosSignature />
        <Depoimentos />
      </main>
      <Footer />
      <WhatsappWidget />
    </>
  );
}
