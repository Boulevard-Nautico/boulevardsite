/**
 * Monta um link da API do WhatsApp (wa.me) com mensagem pré-preenchida.
 * @param phone Apenas dígitos: país + DDD + número (ex: "5524999999999")
 * @param message Texto opcional da mensagem
 */
export function whatsappLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const DEFAULT_WA_MESSAGE =
  "Olá, gostaria de informações sobre os passeios do Boulevard Náutico.";
