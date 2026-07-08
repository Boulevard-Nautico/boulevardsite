import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdminAction } from "@/lib/admin-auth";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxBytes = 5 * 1024 * 1024;

function safeFilename(name: string) {
  const fallback = "imagem";
  const cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || fallback;
}

export async function POST(request: Request) {
  await requireAdminAction();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN nao configurado." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo ausente." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "Formato de imagem invalido." }, { status: 400 });
  }

  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Imagem maior que 5 MB." }, { status: 400 });
  }

  const blob = await put(`boulevard/${Date.now()}-${safeFilename(file.name)}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
