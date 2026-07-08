"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireAdminAction } from "@/lib/admin-auth";
import { requireDb } from "@/lib/db";
import { imageToUrl } from "@/lib/images";
import {
  heroSlides,
  reviews,
  siteSettings,
  tourImages,
  tours,
} from "@/lib/schema";
import { site as fallbackSite } from "@/content/site";

const pathOrUrl = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
    "Informe uma URL valida ou um caminho iniciado por /.",
  );

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : null));

const settingsSchema = z.object({
  brandName: z.string().trim().min(1),
  logoUrl: pathOrUrl,
  seoTitle: z.string().trim().min(1),
  seoDescription: z.string().trim().min(1),
  whatsapp: z.string().trim().regex(/^\d{10,15}$/),
  whatsappDisplay: z.string().trim().min(1),
  instagramUrl: z.string().trim().url(),
  instagramHandle: z.string().trim().min(1),
  email: z.string().trim().email(),
  location: z.string().trim().min(1),
  footerDescription: z.string().trim().min(1),
  conciergeName: z.string().trim().min(1),
  conciergeAvatarUrl: pathOrUrl,
});

const heroSchema = z.object({
  id: z.number().int().positive().optional(),
  imageUrl: pathOrUrl,
  subtitle: optionalText,
  title: z.string().trim().min(1),
  description: optionalText,
  sortOrder: z.number().int().default(0),
  active: z.boolean(),
});

const tourSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().trim().optional(),
  title: z.string().trim().min(1),
  tag: optionalText,
  description: z.string().trim().min(1),
  price: z.string().trim().regex(/^\d+([,.]\d{1,2})?$/),
  sortOrder: z.number().int().default(0),
  active: z.boolean(),
  imageUrls: z.array(pathOrUrl),
});

const reviewSchema = z.object({
  id: z.number().int().positive().optional(),
  stars: z.number().int().min(1).max(5),
  text: z.string().trim().min(1),
  name: z.string().trim().min(1),
  location: z.string().trim().min(1),
  sortOrder: z.number().int().default(0),
  active: z.boolean(),
});

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalId(formData: FormData) {
  const raw = value(formData, "id");
  return raw ? Number(raw) : undefined;
}

function numericValue(formData: FormData, key: string, fallback = 0) {
  const raw = value(formData, key);
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imageUrlsFromTextarea(formData: FormData) {
  return value(formData, "imageUrls")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function revalidatePublicSite() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const data = settingsSchema.parse({
    brandName: value(formData, "brandName"),
    logoUrl: value(formData, "logoUrl"),
    seoTitle: value(formData, "seoTitle"),
    seoDescription: value(formData, "seoDescription"),
    whatsapp: value(formData, "whatsapp"),
    whatsappDisplay: value(formData, "whatsappDisplay"),
    instagramUrl: value(formData, "instagramUrl"),
    instagramHandle: value(formData, "instagramHandle"),
    email: value(formData, "email"),
    location: value(formData, "location"),
    footerDescription: value(formData, "footerDescription"),
    conciergeName: value(formData, "conciergeName"),
    conciergeAvatarUrl: value(formData, "conciergeAvatarUrl"),
  });

  await db
    .insert(siteSettings)
    .values({ id: 1, ...data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: { ...data, updatedAt: new Date() },
    });

  revalidatePublicSite();
}

export async function saveHeroSlide(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const data = heroSchema.parse({
    id: optionalId(formData),
    imageUrl: value(formData, "imageUrl"),
    subtitle: value(formData, "subtitle"),
    title: value(formData, "title"),
    description: value(formData, "description"),
    sortOrder: numericValue(formData, "sortOrder"),
    active: checked(formData, "active"),
  });

  const values = {
    imageUrl: data.imageUrl,
    subtitle: data.subtitle,
    title: data.title,
    description: data.description,
    sortOrder: data.sortOrder,
    active: data.active,
    updatedAt: new Date(),
  };

  if (data.id) {
    await db.update(heroSlides).set(values).where(eq(heroSlides.id, data.id));
  } else {
    await db.insert(heroSlides).values(values);
  }

  revalidatePublicSite();
}

export async function deleteHeroSlide(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const id = optionalId(formData);

  if (id) {
    await db.delete(heroSlides).where(eq(heroSlides.id, id));
    revalidatePublicSite();
  }
}

export async function saveTour(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const parsed = tourSchema.parse({
    id: optionalId(formData),
    slug: value(formData, "slug"),
    title: value(formData, "title"),
    tag: value(formData, "tag"),
    description: value(formData, "description"),
    price: value(formData, "price"),
    sortOrder: numericValue(formData, "sortOrder"),
    active: checked(formData, "active"),
    imageUrls: imageUrlsFromTextarea(formData),
  });
  const slug = (parsed.slug ? slugify(parsed.slug) : slugify(parsed.title)) || `passeio-${Date.now()}`;
  const values = {
    slug,
    title: parsed.title,
    tag: parsed.tag,
    description: parsed.description,
    price: parsed.price.replace(",", "."),
    sortOrder: parsed.sortOrder,
    active: parsed.active,
    updatedAt: new Date(),
  };

  let tourId = parsed.id;

  if (tourId) {
    await db.update(tours).set(values).where(eq(tours.id, tourId));
  } else {
    const [createdTour] = await db.insert(tours).values(values).returning({
      id: tours.id,
    });
    tourId = createdTour.id;
  }

  if (!tourId) {
    throw new Error("Nao foi possivel salvar o passeio.");
  }

  await db.delete(tourImages).where(eq(tourImages.tourId, tourId));

  if (parsed.imageUrls.length > 0) {
    await db.insert(tourImages).values(
      parsed.imageUrls.map((imageUrl, index) => ({
        tourId,
        imageUrl,
        sortOrder: index,
      })),
    );
  }

  revalidatePublicSite();
}

export async function deleteTour(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const id = optionalId(formData);

  if (id) {
    await db.delete(tours).where(eq(tours.id, id));
    revalidatePublicSite();
  }
}

export async function saveReview(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const data = reviewSchema.parse({
    id: optionalId(formData),
    stars: numericValue(formData, "stars", 5),
    text: value(formData, "text"),
    name: value(formData, "name"),
    location: value(formData, "location"),
    sortOrder: numericValue(formData, "sortOrder"),
    active: checked(formData, "active"),
  });

  const values = {
    stars: data.stars,
    text: data.text,
    name: data.name,
    location: data.location,
    sortOrder: data.sortOrder,
    active: data.active,
    updatedAt: new Date(),
  };

  if (data.id) {
    await db.update(reviews).set(values).where(eq(reviews.id, data.id));
  } else {
    await db.insert(reviews).values(values);
  }

  revalidatePublicSite();
}

export async function deleteReview(formData: FormData) {
  await requireAdminAction();
  const db = requireDb();
  const id = optionalId(formData);

  if (id) {
    await db.delete(reviews).where(eq(reviews.id, id));
    revalidatePublicSite();
  }
}

export async function seedFallbackContent() {
  await requireAdminAction();
  const db = requireDb();

  await db
    .insert(siteSettings)
    .values({
      id: 1,
      brandName: fallbackSite.brand.name,
      logoUrl: imageToUrl(fallbackSite.brand.logo),
      seoTitle: fallbackSite.seo.title,
      seoDescription: fallbackSite.seo.description,
      whatsapp: fallbackSite.contact.whatsapp,
      whatsappDisplay: fallbackSite.contact.whatsappDisplay,
      instagramUrl: fallbackSite.contact.instagramUrl,
      instagramHandle: fallbackSite.contact.instagramHandle,
      email: fallbackSite.contact.email,
      location: fallbackSite.contact.location,
      footerDescription: fallbackSite.contact.footerDescription,
      conciergeName: fallbackSite.contact.conciergeName,
      conciergeAvatarUrl: imageToUrl(fallbackSite.contact.conciergeAvatar),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        brandName: fallbackSite.brand.name,
        logoUrl: imageToUrl(fallbackSite.brand.logo),
        seoTitle: fallbackSite.seo.title,
        seoDescription: fallbackSite.seo.description,
        whatsapp: fallbackSite.contact.whatsapp,
        whatsappDisplay: fallbackSite.contact.whatsappDisplay,
        instagramUrl: fallbackSite.contact.instagramUrl,
        instagramHandle: fallbackSite.contact.instagramHandle,
        email: fallbackSite.contact.email,
        location: fallbackSite.contact.location,
        footerDescription: fallbackSite.contact.footerDescription,
        conciergeName: fallbackSite.contact.conciergeName,
        conciergeAvatarUrl: imageToUrl(fallbackSite.contact.conciergeAvatar),
        updatedAt: new Date(),
      },
    });

  await db.delete(heroSlides);
  await db.delete(tours);
  await db.delete(reviews);

  if (fallbackSite.hero.length > 0) {
    await db.insert(heroSlides).values(
      fallbackSite.hero.map((slide, index) => ({
        imageUrl: imageToUrl(slide.image),
        subtitle: slide.subtitle ?? null,
        title: slide.title,
        description: slide.description ?? null,
        sortOrder: index,
        active: true,
        updatedAt: new Date(),
      })),
    );
  }

  for (const [index, tour] of fallbackSite.tours.entries()) {
    const [createdTour] = await db
      .insert(tours)
      .values({
        slug: tour.slug,
        title: tour.title,
        tag: tour.tag ?? null,
        description: tour.description,
        price: tour.price,
        sortOrder: index,
        active: true,
        updatedAt: new Date(),
      })
      .returning({ id: tours.id });

    if (tour.images.length > 0) {
      await db.insert(tourImages).values(
        tour.images.map((image, imageIndex) => ({
          tourId: createdTour.id,
          imageUrl: imageToUrl(image),
          sortOrder: imageIndex,
        })),
      );
    }
  }

  if (fallbackSite.reviews.length > 0) {
    await db.insert(reviews).values(
      fallbackSite.reviews.map((review, index) => ({
        stars: review.stars,
        text: review.text,
        name: review.name,
        location: review.location,
        sortOrder: index,
        active: true,
        updatedAt: new Date(),
      })),
    );
  }

  revalidatePublicSite();
}
