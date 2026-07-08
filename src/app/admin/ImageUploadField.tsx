"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

interface ImageUrlInputProps {
  label: string;
  name: string;
  defaultValue: string;
}

interface AppendImageUploadProps {
  label: string;
  targetId: string;
}

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/admin/api/upload", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json()) as { url?: string; error?: string };

  if (!response.ok || !payload.url) {
    throw new Error(payload.error ?? "Falha no upload.");
  }

  return payload.url;
}

export function ImageUrlInput({ label, name, defaultValue }: ImageUrlInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFileChange(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      setValue(await uploadImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Falha no upload.");
    } finally {
      setUploading(false);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  return (
    <label className="grid gap-2 text-sm text-ink">
      <span className="font-semibold text-navy">{label}</span>
      <div className="flex gap-2 max-md:flex-col">
        <input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-h-11 flex-1 border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-gold"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(event) => onFileChange(event.target.files?.[0])}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-navy px-4 text-xs font-semibold uppercase tracking-[0.08em] text-navy transition hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload
        </button>
      </div>
      {error && <span className="text-xs font-semibold text-red-700">{error}</span>}
    </label>
  );
}

export function AppendImageUpload({ label, targetId }: AppendImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFileChange(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const url = await uploadImage(file);
      const textarea = document.getElementById(targetId) as HTMLTextAreaElement | null;

      if (textarea) {
        textarea.value = textarea.value.trim()
          ? `${textarea.value.trim()}\n${url}`
          : url;
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Falha no upload.");
    } finally {
      setUploading(false);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  return (
    <div className="grid gap-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => onFileChange(event.target.files?.[0])}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
        className="inline-flex min-h-10 items-center justify-center gap-2 border border-navy px-4 text-xs font-semibold uppercase tracking-[0.08em] text-navy transition hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {label}
      </button>
      {error && <span className="text-xs font-semibold text-red-700">{error}</span>}
    </div>
  );
}
