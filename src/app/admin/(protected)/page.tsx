import type { Metadata } from "next";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  deleteHeroSlide,
  deleteReview,
  deleteTour,
  saveHeroSlide,
  saveReview,
  saveSiteSettings,
  saveTour,
  seedFallbackContent,
} from "@/app/admin/actions";
import { AppendImageUpload, ImageUrlInput } from "@/app/admin/ImageUploadField";
import { getEditableSiteContent, imageListToTextarea } from "@/lib/content";
import { imageToUrl } from "@/lib/images";
import type { HeroSlide, Review, Tour } from "@/types/site";

export const metadata: Metadata = {
  title: "Painel admin | Boulevard Nautico",
  robots: { index: false, follow: false },
};

const inputClass =
  "min-h-11 w-full border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-gold";
const textareaClass =
  "min-h-28 w-full border border-black/10 bg-white px-3 py-3 text-sm outline-none transition focus:border-gold";
const labelClass = "grid gap-2 text-sm text-ink";
const labelTextClass = "font-semibold text-navy";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      <span className={labelTextClass}>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={inputClass}
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  defaultValue,
  required = true,
  id,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  id?: string;
}) {
  return (
    <label className={labelClass}>
      <span className={labelTextClass}>{label}</span>
      <textarea
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={textareaClass}
      />
    </label>
  );
}

function ActiveOrderFields({
  active,
  order,
}: {
  active?: boolean;
  order?: number;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 max-sm:grid-cols-1">
      <Field label="Ordem" name="sortOrder" type="number" defaultValue={order ?? 0} />
      <label className="flex min-h-11 items-center gap-3 self-end text-sm font-semibold text-navy">
        <input
          name="active"
          type="checkbox"
          defaultChecked={active !== false}
          className="h-4 w-4 accent-gold"
        />
        Ativo
      </label>
    </div>
  );
}

function DeleteButton({
  action,
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  label: string;
}) {
  return (
    <button
      type="submit"
      formAction={action}
      className="inline-flex min-h-11 items-center justify-center gap-2 border border-red-200 px-5 text-xs font-semibold uppercase tracking-[0.08em] text-red-700 transition hover:bg-red-700 hover:text-white"
    >
      <Trash2 className="h-4 w-4" />
      {label}
    </button>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border border-black/10 bg-white p-6 shadow-soft">
      <h2 className="mb-6 text-2xl text-navy">{title}</h2>
      {children}
    </section>
  );
}

function HeroForm({ slide, index }: { slide?: HeroSlide; index: number }) {
  return (
    <form action={saveHeroSlide} className="grid gap-4 border-t border-black/10 py-6 first:border-t-0 first:pt-0">
      {slide?.id && <input type="hidden" name="id" value={slide.id} />}
      <ImageUrlInput
        label="Imagem"
        name="imageUrl"
        defaultValue={slide ? imageToUrl(slide.image) : ""}
      />
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field label="Subtitulo" name="subtitle" defaultValue={slide?.subtitle} required={false} />
        <Field label="Titulo" name="title" defaultValue={slide?.title} />
      </div>
      <TextareaField
        label="Descricao"
        name="description"
        defaultValue={slide?.description}
        required={false}
      />
      <ActiveOrderFields active={slide?.active} order={slide?.order ?? index} />
      <div className="flex flex-wrap gap-3 pt-2">
        <button className="inline-flex min-h-11 items-center justify-center gap-2 bg-navy px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-navy">
          <Save className="h-4 w-4" />
          Salvar slide
        </button>
        {slide?.id && <DeleteButton action={deleteHeroSlide} label="Excluir" />}
      </div>
    </form>
  );
}

function TourForm({ tour, index }: { tour?: Tour; index: number }) {
  const textareaId = `tour-images-${tour?.id ?? "new"}`;

  return (
    <form action={saveTour} className="grid gap-4 border-t border-black/10 py-6 first:border-t-0 first:pt-0">
      {tour?.id && <input type="hidden" name="id" value={tour.id} />}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field label="Titulo" name="title" defaultValue={tour?.title} />
        <Field label="Slug" name="slug" defaultValue={tour?.slug} required={false} />
      </div>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Field label="Tag" name="tag" defaultValue={tour?.tag} required={false} />
        <Field label="Preco" name="price" defaultValue={tour?.price} />
      </div>
      <TextareaField label="Descricao" name="description" defaultValue={tour?.description} />
      <TextareaField
        id={textareaId}
        label="Imagens da galeria, uma URL por linha"
        name="imageUrls"
        defaultValue={tour ? imageListToTextarea(tour.images) : ""}
      />
      <AppendImageUpload label="Adicionar imagem" targetId={textareaId} />
      <ActiveOrderFields active={tour?.active} order={tour?.order ?? index} />
      <div className="flex flex-wrap gap-3 pt-2">
        <button className="inline-flex min-h-11 items-center justify-center gap-2 bg-navy px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-navy">
          <Save className="h-4 w-4" />
          Salvar passeio
        </button>
        {tour?.id && <DeleteButton action={deleteTour} label="Excluir" />}
      </div>
    </form>
  );
}

function ReviewForm({ review, index }: { review?: Review; index: number }) {
  return (
    <form action={saveReview} className="grid gap-4 border-t border-black/10 py-6 first:border-t-0 first:pt-0">
      {review?.id && <input type="hidden" name="id" value={review.id} />}
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        <Field label="Nome" name="name" defaultValue={review?.name} />
        <Field label="Local" name="location" defaultValue={review?.location} />
        <Field
          label="Estrelas"
          name="stars"
          type="number"
          defaultValue={review?.stars ?? 5}
        />
      </div>
      <TextareaField label="Texto" name="text" defaultValue={review?.text} />
      <ActiveOrderFields active={review?.active} order={review?.order ?? index} />
      <div className="flex flex-wrap gap-3 pt-2">
        <button className="inline-flex min-h-11 items-center justify-center gap-2 bg-navy px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-navy">
          <Save className="h-4 w-4" />
          Salvar depoimento
        </button>
        {review?.id && <DeleteButton action={deleteReview} label="Excluir" />}
      </div>
    </form>
  );
}

export default async function AdminPage() {
  const { content, dbConfigured, usingFallback } = await getEditableSiteContent();

  return (
    <main className="mx-auto grid max-w-[1280px] gap-6 px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Conteudo do site
          </p>
          <h1 className="text-3xl text-navy">Painel Boulevard Nautico</h1>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
          <a href="#settings" className="border border-black/10 bg-white px-3 py-2 text-navy">
            Geral
          </a>
          <a href="#hero" className="border border-black/10 bg-white px-3 py-2 text-navy">
            Hero
          </a>
          <a href="#tours" className="border border-black/10 bg-white px-3 py-2 text-navy">
            Passeios
          </a>
          <a href="#reviews" className="border border-black/10 bg-white px-3 py-2 text-navy">
            Depoimentos
          </a>
        </div>
      </div>

      {!dbConfigured && (
        <div className="border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          Configure DATABASE_URL para salvar conteudo no painel.
        </div>
      )}

      {dbConfigured && usingFallback && (
        <form action={seedFallbackContent} className="flex flex-wrap items-center justify-between gap-4 border border-gold/40 bg-white p-4 text-sm text-ink-soft">
          <span>
            O banco ainda nao tem conteudo completo. Use a copia atual do site
            como ponto de partida.
          </span>
          <button className="inline-flex min-h-10 items-center justify-center gap-2 bg-gold px-4 text-xs font-semibold uppercase tracking-[0.08em] text-navy transition hover:bg-navy hover:text-white">
            <Plus className="h-4 w-4" />
            Popular banco
          </button>
        </form>
      )}

      <Section id="settings" title="Geral, contato e SEO">
        <form action={saveSiteSettings} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Field label="Nome da marca" name="brandName" defaultValue={content.brand.name} />
            <ImageUrlInput
              label="Logo"
              name="logoUrl"
              defaultValue={imageToUrl(content.brand.logo)}
            />
          </div>
          <Field label="Titulo SEO" name="seoTitle" defaultValue={content.seo.title} />
          <TextareaField
            label="Descricao SEO"
            name="seoDescription"
            defaultValue={content.seo.description}
          />
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Field label="WhatsApp, apenas digitos" name="whatsapp" defaultValue={content.contact.whatsapp} />
            <Field label="WhatsApp exibido" name="whatsappDisplay" defaultValue={content.contact.whatsappDisplay} />
          </div>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Field label="Instagram URL" name="instagramUrl" defaultValue={content.contact.instagramUrl} />
            <Field label="Instagram handle" name="instagramHandle" defaultValue={content.contact.instagramHandle} />
          </div>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Field label="E-mail" name="email" type="email" defaultValue={content.contact.email} />
            <Field label="Localizacao" name="location" defaultValue={content.contact.location} />
          </div>
          <TextareaField
            label="Descricao do rodape"
            name="footerDescription"
            defaultValue={content.contact.footerDescription}
          />
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Field label="Nome do concierge" name="conciergeName" defaultValue={content.contact.conciergeName} />
            <ImageUrlInput
              label="Foto do concierge"
              name="conciergeAvatarUrl"
              defaultValue={imageToUrl(content.contact.conciergeAvatar)}
            />
          </div>
          <button className="inline-flex min-h-11 w-fit items-center justify-center gap-2 bg-navy px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-gold hover:text-navy">
            <Save className="h-4 w-4" />
            Salvar geral
          </button>
        </form>
      </Section>

      <Section id="hero" title="Hero">
        {content.hero.map((slide, index) => (
          <HeroForm key={slide.id ?? `${slide.title}-${index}`} slide={slide} index={index} />
        ))}
        <HeroForm index={content.hero.length} />
      </Section>

      <Section id="tours" title="Passeios">
        {content.tours.map((tour, index) => (
          <TourForm key={tour.id ?? tour.slug} tour={tour} index={index} />
        ))}
        <TourForm index={content.tours.length} />
      </Section>

      <Section id="reviews" title="Depoimentos">
        {content.reviews.map((review, index) => (
          <ReviewForm key={review.id ?? `${review.name}-${index}`} review={review} index={index} />
        ))}
        <ReviewForm index={content.reviews.length} />
      </Section>
    </main>
  );
}
