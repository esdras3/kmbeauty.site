export function getWhatsAppUrl(mensagem?: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5541999999999";
  const texto = mensagem ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
    ?? "Olá! Vim pelo site da KM Beauty e gostaria de informações sobre os procedimentos.";
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
