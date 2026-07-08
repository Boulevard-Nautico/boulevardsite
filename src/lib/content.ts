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
    const [settings] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, 1))
      .limit(1);

    if (!settings) {
      return {
        content: fallbackSite,
        dbConfigured: true,
        usingFallback: true,
      };
    }

    const [heroRows, tourRows, tourImageRows, reviewRows] = await Promise.all([
      db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder), asc(heroSlides.id)),
      db.select().from(tours).orderBy(asc(tours.sortOrder), asc(tours.id)),
      db.select().from(tourImages).orderBy(asc(tourImages.sortOrder), asc(tourImages.id)),
      db.select().from(reviews).orderBy(asc(reviews.sortOrder), asc(reviews.id)),
    ]);

    const content: SiteContent = {
      brand: {
        logo: settings.logoUrl,
        name: settings.brandName,
      },
      seo: {
        title: settings.seoTitle,
        description: settings.seoDescription,
      },
      contact: {
        whatsapp: settings.whatsapp,
        whatsappDisplay: settings.whatsappDisplay,
        instagramUrl: settings.instagramUrl,
        instagramHandle: settings.instagramHandle,
        email: settings.email,
        location: settings.location,
        footerDescription: settings.footerDescription,
        conciergeName: settings.conciergeName,
        conciergeAvatar: settings.conciergeAvatarUrl,
      },
      hero: heroRows.map<HeroSlide>((slide) => ({
        id: slide.id,
        image: slide.imageUrl,
        subtitle: slide.subtitle,
        title: slide.title,
        description: slide.description,
        order: slide.sortOrder,
        active: slide.active,
      })),
      tours: tourRows.map<Tour>((tour) => ({
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
      })),
      reviews: reviewRows.map<Review>((review) => ({
        id: review.id,
        stars: review.stars,
        text: review.text,
        name: review.name,
        location: review.location,
        order: review.sortOrder,
        active: review.active,
      })),
    };

    return {
      content,
      dbConfigured: true,
      usingFallback: false,
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
