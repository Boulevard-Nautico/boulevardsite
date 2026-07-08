import type { SiteImage } from "@/types/site";

export function imageToUrl(image: SiteImage): string {
  return typeof image === "string" ? image : image.src;
}

export function blurPlaceholderProps(image: SiteImage) {
  return typeof image === "string" ? {} : { placeholder: "blur" as const };
}
