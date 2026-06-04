export type LuisaChatAction =
  | { label: string; type: "message"; value: string }
  | { label: string; type: "whatsapp"; value: string }
  | { label: string; type: "link"; value: string };

const AGENDAR: LuisaChatAction = {
  label: "Quero agendar",
  type: "message",
  value: "Quero agendar uma avaliação",
};

const QUANTO_CUSTA: LuisaChatAction = {
  label: "Quanto custa?",
  type: "message",
  value: "Quais são os valores dos procedimentos?",
};

const FALAR_EQUIPE: LuisaChatAction = {
  label: "Falar com a equipe",
  type: "whatsapp",
  value: "Olá! Vim pelo site da KM Beauty e gostaria de falar com a equipe.",
};

const VER_FACIAIS: LuisaChatAction = {
  label: "Ver faciais",
  type: "link",
  value: "/procedimentos-faciais",
};

const VER_CORPORAIS: LuisaChatAction = {
  label: "Ver corporais",
  type: "link",
  value: "/procedimentos-corporais",
};

const VER_PROCEDIMENTOS: LuisaChatAction = {
  label: "Ver procedimentos",
  type: "link",
  value: "/procedimentos",
};

const SAIBA_MAIS: LuisaChatAction = {
  label: "Saiba mais",
  type: "message",
  value: "Me conta mais sobre esse procedimento",
};

/**
 * Retorna ações contextuais baseadas na página atual.
 * Recebe `pathname` (ex: "/procedimentos", "/procedimentos-faciais", "/").
 */
export function getDefaultLuisaActions(pathname?: string): LuisaChatAction[] {
  switch (pathname) {
    case "/procedimentos":
      return [VER_FACIAIS, VER_CORPORAIS, AGENDAR, FALAR_EQUIPE];

    case "/procedimentos-faciais":
      return [SAIBA_MAIS, AGENDAR, QUANTO_CUSTA, FALAR_EQUIPE];

    case "/procedimentos-corporais":
      return [SAIBA_MAIS, AGENDAR, QUANTO_CUSTA, FALAR_EQUIPE];

    case "/contato":
      return [AGENDAR, FALAR_EQUIPE];

    default:
      // home e demais páginas
      return [VER_PROCEDIMENTOS, AGENDAR, QUANTO_CUSTA, FALAR_EQUIPE];
  }
}
