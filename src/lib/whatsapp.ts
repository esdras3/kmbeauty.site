export function getWhatsAppUrl(mensagem?: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5541984113970";
  const texto = mensagem ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
    ?? "Ola, quero comecar minha avaliacao";
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
