import type { SiteContent } from "@/types/site";

// Hero
import heroLagoa3 from "@/assets/live/0605-Captacao-Boulevart-Nautico-Super-Lagoa-Azul-3-scaled.jpg";
import aventureiro8 from "@/assets/live/1904-Drone-Editadas-Passeio-Aventureiro-8-scaled.jpg";

// Ilhas Paradisíacas
import dji0062 from "@/assets/live/DJI_0062-scaled.jpg";
import cataguases from "@/assets/live/cataguases.png";
import botinas from "@/assets/live/botinas.png";
// Super Lagoa Azul
import lagoa5 from "@/assets/live/0605-Captacao-Boulevart-Nautico-Super-Lagoa-Azul-5-scaled.jpg";
import lagoaAzul9 from "@/assets/live/Lagoa-Azul-9-scaled.jpg";
import lagoaAzul13 from "@/assets/live/Lagoa-Azul-13-scaled.jpg";
import lagoaAzul19 from "@/assets/live/Lagoa-Azul-19-scaled.jpg";
// Meia-volta a Ilha
import lagoa14 from "@/assets/live/0605-Captacao-Boulevart-Nautico-Super-Lagoa-Azul-14-scaled.jpg";
import dji0213 from "@/assets/live/DJI_0213-scaled.jpg";
import dji0191 from "@/assets/live/DJI_0191-scaled.jpg";
import img5053 from "@/assets/live/IMG_5053-scaled.jpg";

// Marca / concierge
import logo from "@/assets/brand/logo-boulevard.png";
import conciergeAvatar from "@/assets/brand/concierge-erick.png";

/* ====================================================================
   CONTEÚDO — réplica exata do site atual. Edite aqui e faça deploy.
   ==================================================================== */
export const site: SiteContent = {
  brand: {
    logo,
    name: "Boulevard Náutico",
  },

  seo: {
    title: "Boulevard Náutico | Padrão Ouro em Angra dos Reis",
    description:
      "Passeios náuticos de alto padrão pela Costa Verde — Angra dos Reis e Ilha Grande. Roteiros exclusivos, frota premium e atendimento concierge.",
  },

  hero: [
    {
      image: heroLagoa3,
      subtitle: "Temporada Boulevard",
      title: "O Padrão Ouro",
    },
    {
      image: aventureiro8,
      subtitle: "Temporada Boulevard",
      title: "O Padrão Ouro no Mar de Angra dos Reis",
      description:
        "A curadoria Boulevard Náutico para quem exige excelência, conforto absoluto e roteiros verdadeiramente exclusivos.",
    },
  ],

  tours: [
    {
      slug: "ilhas-paradisiacas",
      title: "Ilhas Paradisíacas",
      tag: "Ilhas Paradisíacas",
      description:
        "Navegue por praias e Ilhas incríveis da Baía de Angra dos Reis: Ilhas Botinas, Ilha da Gipóia (Praia do Dentista, Praia das Fechas, Praia da Fazenda e Ponta da Piedade)",
      price: "150",
      images: [aventureiro8, dji0062, cataguases, botinas],
    },
    {
      slug: "super-lagoa-azul",
      title: "Super Lagoa Azul",
      tag: "Super Lagoa Azul",
      description:
        "Um dos cartões postais da Ilha Grande te espera neste passeio! Ilha de Cataguases, Lagoa Azul, Praia de Grumixama e Praia de Aripeba.",
      price: "150",
      images: [lagoa5, lagoaAzul9, lagoaAzul13, lagoaAzul19],
    },
    {
      slug: "meia-volta-a-ilha",
      title: "Meia-volta a Ilha",
      tag: "Meia-volta",
      description:
        "O roteiro para quem quer explorar grande parte da Ilha Grande. Lagoa Azul, Praia de Araçá, Praia de Aripeba, Maguariquessaba e Lagoa Verde.",
      price: "150",
      images: [lagoa14, dji0213, dji0191, img5053],
    },
  ],

  reviews: [
    {
      stars: 5,
      text: "A experiência mais incrível que já tive quando o assunto é passeio! Simplesmente, amei!",
      name: "Julianna Barra",
      location: "São Paulo, SP",
    },
    {
      stars: 5,
      text: "Passeio maravilhoso de lancha! Gostaria de destacar o trabalho incrível dos marinheiros. Além da lancha ser nova e está tudo perfeito!",
      name: "Mônica Terra",
      location: "Rio de Janeiro, RJ",
    },
    {
      stars: 5,
      text: "Experiência incrível! Estou ansiosa para as próximas!",
      name: "Amanda Coelho",
      location: "Angra dos Reis",
    },
  ],

  contact: {
    whatsapp: "5524992588898",
    whatsappDisplay: "(24) 99258-8898",
    instagramUrl: "https://www.instagram.com/boulevard.nautico/",
    instagramHandle: "@boulevard.nautico",
    email: "nauticoboulevard@gmail.com",
    location: "Shopping Piratas, Angra dos Reis RJ",
    footerDescription:
      "Redefinindo o conceito de luxo e exclusividade no turismo náutico de Angra dos Reis. Navegue com o Padrão Ouro.",
    conciergeName: "Erick - Boulevard Náutico",
    conciergeAvatar,
  },
};
