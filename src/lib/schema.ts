import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  brandName: text("brand_name").notNull(),
  logoUrl: text("logo_url").notNull(),
  seoTitle: text("seo_title").notNull(),
  seoDescription: text("seo_description").notNull(),
  whatsapp: varchar("whatsapp", { length: 24 }).notNull(),
  whatsappDisplay: varchar("whatsapp_display", { length: 32 }).notNull(),
  instagramUrl: text("instagram_url").notNull(),
  instagramHandle: varchar("instagram_handle", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  location: text("location").notNull(),
  footerDescription: text("footer_description").notNull(),
  conciergeName: varchar("concierge_name", { length: 160 }).notNull(),
  conciergeAvatarUrl: text("concierge_avatar_url").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  subtitle: text("subtitle"),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: text("title").notNull(),
  tag: text("tag"),
  description: text("description").notNull(),
  price: varchar("price", { length: 32 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const tourImages = pgTable("tour_images", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id")
    .notNull()
    .references(() => tours.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  stars: integer("stars").default(5).notNull(),
  text: text("text").notNull(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  role: varchar("role", { length: 32 }).default("admin").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
