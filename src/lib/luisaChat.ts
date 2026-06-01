export type LuisaChatAction =
  | { label: string; type: "message"; value: string }
  | { label: string; type: "whatsapp"; value: string }
  | { label: string; type: "link"; value: string };

export function getDefaultLuisaActions(): LuisaChatAction[] {
  return [
    { label: "Ver procedimentos", type: "link", value: "/procedimentos" },
    { label: "Quero agendar", type: "message", value: "Quero agendar uma avaliação" },
    { label: "Quanto custa?", type: "message", value: "Quais são os valores dos procedimentos?" },
    { label: "Falar com a equipe", type: "whatsapp", value: "Olá! Vim pelo site da KM Beauty e gostaria de falar com a equipe." },
  ];
}
