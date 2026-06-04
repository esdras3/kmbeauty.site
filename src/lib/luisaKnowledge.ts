type LuisaKnowledgeKind = "procedure" | "price";

type LuisaKnowledgeMatch = {
  kind: LuisaKnowledgeKind;
  title: string;
  reply: string;
};

type ProcedureEntry = {
  title: string;
  keywords: string[];
  summary: string;
};

type PriceEntry = {
  title: string;
  keywords: string[];
  current: string;
  condition?: string;
};

const PROCEDURES: ProcedureEntry[] = [
  {
    title: "Endolaser",
    keywords: ["endolaser"],
    summary:
      "O Endolaser e um procedimento minimamente invasivo voltado para flacidez e gordura localizada, muito procurado para regioes como papada, contorno facial, abdomen e flancos.",
  },
  {
    title: "Botox",
    keywords: ["botox", "toxina botulinica", "toxina botulínica"],
    summary:
      "O Botox e indicado para suavizar rugas dinamicas, especialmente em testa, glabela e regiao dos olhos, preservando leveza e naturalidade.",
  },
  {
    title: "Preenchimento Labial",
    keywords: ["preenchimento labial", "labios", "lábios"],
    summary:
      "O preenchimento labial trabalha contorno, hidratacao e volume com acido hialuronico, sempre de forma personalizada e com foco em naturalidade.",
  },
  {
    title: "Preenchimento Facial",
    keywords: [
      "preenchimento facial",
      "preenchimento 3 ml",
      "preenchimento 3 mls",
      "preenchimento 3ml",
    ],
    summary:
      "O preenchimento facial restaura volume e contorno em regioes como malar, olheiras, labios, mento, mandibula e sulcos, conforme avaliacao presencial.",
  },
  {
    title: "Bioestimulador Facial (CAHA)",
    keywords: ["bioestimulador", "bioestimulador facial", "caha"],
    summary:
      "O bioestimulador facial com CAHA estimula colageno e ajuda na firmeza, sustentacao e melhora progressiva da qualidade da pele.",
  },
  {
    title: "Microagulhamento Facial com PDRN",
    keywords: [
      "microagulhamento",
      "microagulhamento facial",
      "microagulhamento com pdrn",
      "pdrn",
    ],
    summary:
      "O microagulhamento facial com PDRN estimula colageno e contribui para textura, vico, renovacao da pele e melhora global da qualidade cutanea.",
  },
  {
    title: "Black Peel",
    keywords: ["black peel"],
    summary:
      "O Black Peel e um peeling com foco em renovacao da pele, textura, oleosidade, acne e luminosidade.",
  },
  {
    title: "Harmonizacao de Orelhas",
    keywords: ["harmonizacao de orelhas", "harmonização de orelhas", "orelhas"],
    summary:
      "A harmonizacao de orelhas e um procedimento estetico voltado para melhorar proporcao e harmonia da regiao com abordagem personalizada.",
  },
  {
    title: "Protocolo para Estrias",
    keywords: ["estrias", "protocolo para estrias"],
    summary:
      "O protocolo para estrias da clinica trabalha melhora de textura e aparencia da pele em sessoes planejadas de forma individual.",
  },
];

const PRICES: PriceEntry[] = [
  {
    title: "Preenchimento Labial",
    keywords: ["preenchimento labial", "labios", "lábios"],
    current: "R$ 750,00",
    condition: "3x sem juros",
  },
  {
    title: "Botox Terco Superior",
    keywords: ["botox", "toxina botulinica", "toxina botulínica", "botox terco superior"],
    current: "R$ 820,00",
    condition: "4x sem juros",
  },
  {
    title: "Bioestimulador Facial (CAHA)",
    keywords: ["bioestimulador", "bioestimulador facial", "caha"],
    current: "R$ 1.190,00",
    condition: "4x sem juros",
  },
  {
    title: "Preenchimento (3 mls)",
    keywords: [
      "preenchimento facial",
      "preenchimento 3 ml",
      "preenchimento 3 mls",
      "preenchimento 3ml",
    ],
    current: "R$ 1.999,00",
    condition: "6x sem juros",
  },
  {
    title: "Microagulhamento Facial com PDRN",
    keywords: [
      "microagulhamento",
      "microagulhamento facial",
      "microagulhamento com pdrn",
      "pdrn",
    ],
    current: "R$ 299,00",
  },
  {
    title: "Protocolo para Estrias (3 sessoes)",
    keywords: ["estrias", "protocolo para estrias"],
    current: "R$ 1.999,00",
    condition: "6x sem juros",
  },
  {
    title: "Black Peel",
    keywords: ["black peel"],
    current: "R$ 299,00",
    condition: "2x sem juros",
  },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isPriceQuestion(message: string) {
  return /(valor|preco|quanto custa|quanto e|investimento|parcelamento|parcela)/.test(
    normalizeText(message)
  );
}

function findProcedure(message: string) {
  const normalized = normalizeText(message);
  return PROCEDURES.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(normalizeText(keyword)))
  );
}

function findPrice(message: string) {
  const normalized = normalizeText(message);
  return PRICES.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(normalizeText(keyword)))
  );
}

export function buildLocalLuisaReply(message: string): LuisaKnowledgeMatch | null {
  const price = findPrice(message);
  const procedure = findProcedure(message);

  if (isPriceQuestion(message) && price) {
    return {
      kind: "price",
      title: price.title,
      reply: [
        `O valor atual de ${price.title} e ${price.current}${
          price.condition ? `, com opcao de ${price.condition}` : ""
        }.`,
        "Para a indicacao do protocolo ideal para o seu caso, o proximo passo e uma avaliacao presencial com a Dra. Kelly.",
        "Se quiser, eu tambem posso te orientar sobre o agendamento. 🌸",
      ].join(" "),
    };
  }

  if (procedure) {
    return {
      kind: "procedure",
      title: procedure.title,
      reply: [
        procedure.summary,
        "Para a indicacao do protocolo ideal para o seu caso, o proximo passo e uma avaliacao presencial com a Dra. Kelly.",
        "Se voce quiser, eu posso te ajudar a seguir para o agendamento. 🌸",
      ].join(" "),
    };
  }

  return null;
}

export function shouldUseLocalLuisaReply(
  message: string,
  remoteReply: string,
  localMatch: LuisaKnowledgeMatch | null
) {
  if (!localMatch) return false;

  const normalizedReply = normalizeText(remoteReply);
  const normalizedTitle = normalizeText(localMatch.title);

  if (normalizedReply.includes("guia de procedimentos") && normalizedReply.includes("indisponivel")) {
    return true;
  }

  if (localMatch.kind === "price" && !normalizedReply.includes("r$")) {
    return true;
  }

  if (
    localMatch.kind === "procedure" &&
    !normalizedReply.includes(normalizedTitle) &&
    normalizedReply.includes("avaliacao presencial")
  ) {
    return true;
  }

  if (isPriceQuestion(message) && normalizedReply.includes("os valores")) {
    return true;
  }

  return false;
}
