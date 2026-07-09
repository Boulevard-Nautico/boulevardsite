import { asc, eq } from "drizzle-orm";
import { site as fallbackSite } from "@/content/site";
import { getDb } from "@/lib/db";
import {
  heroSlides,
  reviews,
  siteSettings,
  tourImages,
  tours,
} from "@/lib/schema";
import { imageToUrl } from "@/lib/images";
import type { HeroSlide, Review, SiteContent, Tour } from "@/types/site";

export interface EditableSiteContentResult {
  content: SiteContent;
  dbConfigured: boolean;
  usingFallback: boolean;
}

export async function getPublicSiteContent(): Promise<SiteContent> {
  const editable = await getEditableSiteContent();
  return editable.content;
}

export async function getEditableSiteContent(): Promise<EditableSiteContentResult> {
  const db = getDb();

  if (!db) {
    return {
      content: fallbackSite,
      dbConfigured: false,
      usingFallback: true,
    };
  }

  try {
    const settingsRows = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, 1))
      .limit(1);
    const heroRows = await db
      .select()
      .from(heroSlides)
      .orderBy(asc(heroSlides.sortOrder), asc(heroSlides.id));
    const tourRows = await db
      .select()
      .from(tours)
      .orderBy(asc(tours.sortOrder), asc(tours.id));
    const tourImageRows = await db
      .select()
      .from(tourImages)
      .orderBy(asc(tourImages.sortOrder), asc(tourImages.id));
    const reviewRows = await db
      .select()
      .from(reviews)
      .orderBy(asc(reviews.sortOrder), asc(reviews.id));
    const [settings] = settingsRows;
    const hasDbSettings = Boolean(settings);
    const hasPartialDbContent =
      heroRows.length > 0 || tourRows.length > 0 || reviewRows.length > 0;

    if (!settings && !hasPartialDbContent) {
      return {
        content: fallbackSite,
        dbConfigured: true,
        usingFallback: true,
      };
    }

    const mappedHero = heroRows.map<HeroSlide>((slide) => ({
      id: slide.id,
      image: slide.imageUrl,
      subtitle: slide.subtitle,
      title: slide.title,
      description: slide.description,
      order: slide.sortOrder,
      active: slide.active,
    }));
    const mappedTours = tourRows.map<Tour>((tour) => ({
      id: tour.id,
      slug: tour.slug,
      title: tour.title,
      tag: tour.tag,
      description: tour.description,
      price: tour.price,
      order: tour.sortOrder,
      active: tour.active,
      images: tourImageRows
        .filter((image) => image.tourId === tour.id)
        .map((image) => image.imageUrl),
    }));
    const mappedReviews = reviewRows.map<Review>((review) => ({
      id: review.id,
      stars: review.stars,
      text: review.text,
      name: review.name,
      location: review.location,
      order: review.sortOrder,
      active: review.active,
    }));

    const content: SiteContent = {
      brand: {
        logo: settings?.logoUrl ?? fallbackSite.brand.logo,
        name: settings?.brandName ?? fallbackSite.brand.name,
      },
      seo: {
        title: settings?.seoTitle ?? fallbackSite.seo.title,
        description: settings?.seoDescription ?? fallbackSite.seo.description,
      },
      contact: {
        whatsapp: settings?.whatsapp ?? fallbackSite.contact.whatsapp,
        whatsappDisplay:
          settings?.whatsappDisplay ?? fallbackSite.contact.whatsappDisplay,
        instagramUrl: settings?.instagramUrl ?? fallbackSite.contact.instagramUrl,
        instagramHandle:
          settings?.instagramHandle ?? fallbackSite.contact.instagramHandle,
        email: settings?.email ?? fallbackSite.contact.email,
        location: settings?.location ?? fallbackSite.contact.location,
        footerDescription:
          settings?.footerDescription ?? fallbackSite.contact.footerDescription,
        conciergeName:
          settings?.conciergeName ?? fallbackSite.contact.conciergeName,
        conciergeAvatar:
          settings?.conciergeAvatarUrl ?? fallbackSite.contact.conciergeAvatar,
      },
      hero: mappedHero.length > 0 ? mappedHero : fallbackSite.hero,
      tours: mappedTours.length > 0 ? mappedTours : fallbackSite.tours,
      reviews: mappedReviews.length > 0 ? mappedReviews : fallbackSite.reviews,
    };

    return {
      content,
      dbConfigured: true,
      usingFallback:
        !hasDbSettings ||
        mappedHero.length === 0 ||
        mappedTours.length === 0 ||
        mappedReviews.length === 0,
    };
  } catch {
    return {
      content: fallbackSite,
      dbConfigured: true,
      usingFallback: true,
    };
  }
}

export function getRenderableContent(content: SiteContent): SiteContent {
  return {
    ...content,
    hero: content.hero.filter((slide) => slide.active !== false),
    tours: content.tours.filter((tour) => tour.active !== false),
    reviews: content.reviews.filter((review) => review.active !== false),
  };
}

export function imageListToTextarea(images: Tour["images"]): string {
  return images.map(imageToUrl).join("\n");
}
