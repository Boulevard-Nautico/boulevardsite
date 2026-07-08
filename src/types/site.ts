import type { StaticImageData } from "next/image";

export type SiteImage = StaticImageData | string;

export interface SiteBrand {
  logo: SiteImage;
  name: string;
}

export interface HeroSlide {
  id?: number;
  image: SiteImage;
  subtitle?: string | null;
  title: string;
  description?: string | null;
  active?: boolean;
  order?: number;
}

export interface Tour {
  id?: number;
  slug: string;
  title: string;
  description: string;
  /** Valor em reais, sem o prefixo "R$". Ex: "150" */
  price: string;
  tag?: string | null;
  images: SiteImage[];
  active?: boolean;
  order?: number;
}

export interface Review {
  id?: number;
  stars: number;
  text: string;
  name: string;
  location: string;
  active?: boolean;
  order?: number;
}

export interface SiteContact {
  /** Apenas digitos: pais + DDD + numero (usado nos links wa.me) */
  whatsapp: string;
  /** Como o numero aparece para o usuario (no rodape) */
  whatsappDisplay: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  location: string;
  footerDescription: string;
  conciergeName: string;
  conciergeAvatar: SiteImage;
}

export interface SiteSeo {
  title: string;
  description: string;
}

export interface SiteContent {
  brand: SiteBrand;
  hero: HeroSlide[];
  tours: Tour[];
  reviews: Review[];
  contact: SiteContact;
  seo: SiteSeo;
}
