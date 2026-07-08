CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
  "brand_name" text NOT NULL,
  "logo_url" text NOT NULL,
  "seo_title" text NOT NULL,
  "seo_description" text NOT NULL,
  "whatsapp" varchar(24) NOT NULL,
  "whatsapp_display" varchar(32) NOT NULL,
  "instagram_url" text NOT NULL,
  "instagram_handle" varchar(120) NOT NULL,
  "email" varchar(254) NOT NULL,
  "location" text NOT NULL,
  "footer_description" text NOT NULL,
  "concierge_name" varchar(160) NOT NULL,
  "concierge_avatar_url" text NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "hero_slides" (
  "id" serial PRIMARY KEY NOT NULL,
  "image_url" text NOT NULL,
  "subtitle" text,
  "title" text NOT NULL,
  "description" text,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "tours" (
  "id" serial PRIMARY KEY NOT NULL,
  "slug" varchar(180) NOT NULL UNIQUE,
  "title" text NOT NULL,
  "tag" text,
  "description" text NOT NULL,
  "price" varchar(32) NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "tour_images" (
  "id" serial PRIMARY KEY NOT NULL,
  "tour_id" integer NOT NULL REFERENCES "tours"("id") ON DELETE cascade,
  "image_url" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "reviews" (
  "id" serial PRIMARY KEY NOT NULL,
  "stars" integer DEFAULT 5 NOT NULL,
  "text" text NOT NULL,
  "name" text NOT NULL,
  "location" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "admin_users" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" varchar(254) NOT NULL UNIQUE,
  "role" varchar(32) DEFAULT 'admin' NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);
