# Fase 5 — Site da Clínica KM Beauty (Plano A: Scaffold + Seções + Deploy)

> Documento historico. A decisao atual do repositorio e manter o CRM unificado em `src/app/crm/` dentro da mesma app.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar o site Next.js da clínica KM Beauty em `kmbeauty.site_app/`, publicar no GitHub (`kmbeauty.site`) e fazer deploy na Vercel com todas as seções estáticas funcionando.

**Architecture:** Next.js 16 App Router na raiz do repo. Seções adaptadas do `km_app` (curso), removendo tudo relacionado a mentorias e substituindo pela seção `ProcedimentosDestaque`. Brand colors do CRM: km-gold `#C49030`, km-dark `#1A1A1A`. Plano B (Luísa /api/chat) é sequencial a este.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v3, TypeScript, Vercel, GitHub CLI (`gh`)

**Spec:** `doc/especificacoes/2026-06-01-fase5-site-clinica-design.md`

---

## Mapa de arquivos

### Criar
```
package.json
next.config.ts
tailwind.config.ts
postcss.config.mjs
tsconfig.json
.gitignore
.env.local.example
src/app/layout.tsx
src/app/globals.css
src/app/page.tsx                        ← home landing
src/app/procedimentos/page.tsx
src/app/contato/page.tsx
src/components/sections/Header.tsx
src/components/sections/HeroSection.tsx
src/components/sections/AuthorityBar.tsx
src/components/sections/ProcedimentosDestaque.tsx   ← NOVO (não existe no km_app)
src/components/sections/AboutSection.tsx
src/components/sections/TestimonialsSection.tsx
src/components/sections/DifferentialsSection.tsx
src/components/sections/FaqSection.tsx
src/components/sections/LeadFormSection.tsx
src/components/sections/FinalCtaSection.tsx
src/components/sections/Footer.tsx
src/components/sections/WhatsAppFab.tsx
src/lib/whatsapp.ts
```

### Referência (adaptar do km_app — NÃO copiar cegamente)
```
km_app/components/sections/Header.tsx
km_app/components/sections/HeroSection.tsx
km_app/components/sections/AuthorityBar.tsx
km_app/components/sections/AboutSection.tsx
km_app/components/sections/TestimonialsSection.tsx
km_app/components/sections/DifferentialsSection.tsx
km_app/components/sections/FaqSection.tsx
km_app/components/sections/LeadFormSection.tsx
km_app/components/sections/FinalCtaSection.tsx
km_app/components/sections/Footer.tsx
km_app/components/sections/WhatsAppFab.tsx
km_app/lib/whatsapp.ts
```

> **Regra de adaptação:** Remover toda referência a mentorias, cursos, checkout, Asaas, alunos. Trocar tokens de cor (`cta`, `champagne-gold`) pelos tokens da clínica (`km-gold`, `km-dark`). Atualizar textos para o contexto da clínica.

### LuisaChatWidget — deixar para o Plano B
O widget requer `/api/chat` → n8n. Sem ele o site não quebra — placeholder simples por ora.

---

## Task 1: Inicializar projeto Next.js e git

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `.gitignore`

- [ ] **Step 1.1: Criar package.json**

```bash
cd "C:/Users/Esdras/sites_app/kmbeauty.com.br/kmbeauty.site_app"
```

Criar `package.json`:
```json
{
  "name": "kmbeauty-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10",
    "postcss": "^8",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "latest"
  }
}
```

- [ ] **Step 1.2: Criar next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 1.3: Criar tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "km-gold":       "#C49030",
        "km-gold-hover": "#A97A28",
        "km-dark":       "#1A1A1A",
        "km-surface":    "#FFFFFF",
        "km-bg":         "#F6F6F6",
        "km-text":       "#1A1A1A",
        "km-muted":      "#6B6B6B",
        "km-border":     "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn:  "10px",
      },
      boxShadow: {
        card: "0 8px 32px rgba(26, 26, 26, 0.08)",
        gold: "0 4px 16px rgba(196, 144, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 1.4: Criar postcss.config.mjs**

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 1.5: Criar tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules", "legacy", "doc/legado/clone_estatico"]
}
```

- [ ] **Step 1.6: Criar .gitignore**

```
node_modules/
.next/
.env.local
.env*.local
legacy/dashboard_app_referencia/node_modules/
legacy/dashboard_app_referencia/.next/
doc/legado/clone_estatico/.git/
.superpowers/
```

- [ ] **Step 1.7: Instalar dependências**

```bash
npm install
```

Esperado: `node_modules/` criado sem erros.

- [ ] **Step 1.8: Inicializar git e primeiro commit**

```bash
git init
git add package.json next.config.ts tailwind.config.ts postcss.config.mjs tsconfig.json .gitignore
git commit -m "chore: scaffold Next.js 16 para site da clínica kmbeauty.com.br"
```

---

## Task 2: Layout base e globals

**Files:**
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `.env.local.example`

- [ ] **Step 2.1: Criar src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-playfair: 'Playfair Display', Georgia, serif;
  --font-inter: 'Inter', Arial, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-km-bg text-km-text font-body antialiased;
}

@layer utilities {
  .section-padding {
    @apply py-16 md:py-24 px-4 md:px-8;
  }
  .container-km {
    @apply max-w-6xl mx-auto;
  }
  .btn-primary {
    @apply bg-km-gold hover:bg-km-gold-hover text-white font-semibold px-6 py-3 rounded-btn transition-colors duration-200 shadow-gold;
  }
  .btn-outline {
    @apply border-2 border-km-gold text-km-gold hover:bg-km-gold hover:text-white font-semibold px-6 py-3 rounded-btn transition-colors duration-200;
  }
}
```

- [ ] **Step 2.2: Criar src/app/layout.tsx**

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KM Beauty — Estética Avançada | Dra. Kelly Macedo",
  description:
    "Clínica de estética avançada em Curitiba. Endolaser, harmonização facial, botox e muito mais. Agende sua avaliação com a Dra. Kelly Macedo.",
  keywords: ["estética", "Curitiba", "harmonização facial", "botox", "endolaser", "Dra Kelly Macedo"],
  openGraph: {
    title: "KM Beauty — Estética Avançada",
    description: "Realce sua beleza com a Dra. Kelly Macedo em Curitiba.",
    url: "https://kmbeauty.com.br",
    siteName: "KM Beauty",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2.3: Criar .env.local.example**

```bash
# Webhook n8n para o chat da Luísa (Plano B)
KMBEAUTY_N8N_WEBHOOK_URL=https://personalpay.com.br/webhook/kmbeauty/chat
KMBEAUTY_N8N_WEBHOOK_SECRET=

# WhatsApp da clínica
NEXT_PUBLIC_WHATSAPP_NUMBER=5541XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Vim pelo site da KM Beauty e gostaria de informações sobre os procedimentos.
```

- [ ] **Step 2.4: Commit**

```bash
git add src/ .env.local.example
git commit -m "feat: layout base, globals CSS e tokens de marca"
```

---

## Task 3: Header

**Files:**
- Create: `src/components/sections/Header.tsx`
- Reference: `C:/Users/Esdras/sites_app/km/km_app/components/sections/Header.tsx`

- [ ] **Step 3.1: Criar src/components/sections/Header.tsx**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-km-surface/95 backdrop-blur-sm border-b border-km-border shadow-sm">
      <div className="container-km flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="font-heading font-bold text-xl text-km-dark tracking-tight">
          <span className="text-km-gold">KM</span> Beauty
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-km-muted">
          <Link href="/#procedimentos" className="hover:text-km-gold transition-colors">Procedimentos</Link>
          <Link href="/#sobre" className="hover:text-km-gold transition-colors">Sobre</Link>
          <Link href="/contato" className="hover:text-km-gold transition-colors">Contato</Link>
        </nav>

        {/* CTA desktop */}
        <Link
          href="/contato"
          className="hidden md:inline-flex btn-primary text-sm"
        >
          Agendar Avaliação
        </Link>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-km-dark"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-km-surface border-t border-km-border px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/#procedimentos" onClick={() => setMenuOpen(false)} className="text-km-muted hover:text-km-gold">Procedimentos</Link>
          <Link href="/#sobre" onClick={() => setMenuOpen(false)} className="text-km-muted hover:text-km-gold">Sobre</Link>
          <Link href="/contato" onClick={() => setMenuOpen(false)} className="text-km-muted hover:text-km-gold">Contato</Link>
          <Link href="/contato" onClick={() => setMenuOpen(false)} className="btn-primary text-center">Agendar Avaliação</Link>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3.2: Commit**

```bash
git add src/components/sections/Header.tsx
git commit -m "feat: Header responsivo com nav e CTA"
```

---

## Task 4: HeroSection + AuthorityBar

**Files:**
- Create: `src/components/sections/HeroSection.tsx`, `src/components/sections/AuthorityBar.tsx`

- [ ] **Step 4.1: Criar HeroSection.tsx**

```typescript
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen bg-km-dark flex items-center pt-16">
      <div className="container-km section-padding text-center md:text-left">
        <div className="max-w-2xl">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Dra. Kelly Macedo — Curitiba/PR
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-6">
            Realce sua <span className="text-km-gold">beleza</span>{" "}
            com quem entende
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed">
            Estética avançada com tecnologia de ponta e cuidado personalizado.
            Do Endolaser à harmonização facial — resultados naturais e duradouros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/contato" className="btn-primary text-base px-8 py-4">
              Agendar Avaliação Gratuita
            </Link>
            <Link href="/#procedimentos" className="btn-outline text-base px-8 py-4 border-white text-white hover:bg-white hover:text-km-dark">
              Ver Procedimentos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.2: Criar AuthorityBar.tsx**

```typescript
const stats = [
  { value: "10+", label: "Anos de experiência" },
  { value: "5.000+", label: "Pacientes atendidas" },
  { value: "15+", label: "Procedimentos especializados" },
  { value: "98%", label: "Taxa de satisfação" },
];

export function AuthorityBar() {
  return (
    <section className="bg-km-gold py-8">
      <div className="container-km px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.3: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/components/sections/AuthorityBar.tsx
git commit -m "feat: HeroSection e AuthorityBar"
```

---

## Task 5: ProcedimentosDestaque (seção nova)

**Files:**
- Create: `src/components/sections/ProcedimentosDestaque.tsx`

- [ ] **Step 5.1: Criar ProcedimentosDestaque.tsx**

```typescript
import Link from "next/link";

const procedimentos = [
  {
    slug: "endolaser",
    nome: "Endolaser",
    descricao: "Lipólise a laser minimamente invasiva para papada, abdômen e flancos. Resultados definitivos com recuperação rápida.",
    icone: "✦",
    destaque: true,
  },
  {
    slug: "harmonizacao-facial",
    nome: "Harmonização Facial",
    descricao: "Reequilíbrio dos traços do rosto com ácido hialurônico. Resultado natural que respeita sua identidade.",
    icone: "✦",
    destaque: false,
  },
  {
    slug: "botox",
    nome: "Toxina Botulínica",
    descricao: "Suavização de rugas dinâmicas para um olhar mais descansado e jovial, com naturalidade garantida.",
    icone: "✦",
    destaque: false,
  },
  {
    slug: "preenchimento",
    nome: "Preenchimento Labial",
    descricao: "Definição e volume nos lábios com ácido hialurônico. Resultado harmonioso e personalizado.",
    icone: "✦",
    destaque: false,
  },
];

export function ProcedimentosDestaque() {
  return (
    <section id="procedimentos" className="section-padding bg-km-surface">
      <div className="container-km">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Especialidades
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-km-dark font-bold mb-4">
            Procedimentos em destaque
          </h2>
          <p className="text-km-muted max-w-xl mx-auto">
            Cada tratamento é personalizado para o seu caso. A Dra. Kelly indica
            o protocolo ideal após avaliação presencial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {procedimentos.map((p) => (
            <div
              key={p.slug}
              className={`rounded-card p-6 flex flex-col gap-4 shadow-card border transition-shadow hover:shadow-gold ${
                p.destaque
                  ? "bg-km-dark text-white border-km-gold"
                  : "bg-km-bg text-km-dark border-km-border"
              }`}
            >
              <span className={`text-2xl ${p.destaque ? "text-km-gold" : "text-km-gold"}`}>
                {p.icone}
              </span>
              <h3 className={`font-heading font-bold text-xl ${p.destaque ? "text-white" : "text-km-dark"}`}>
                {p.nome}
              </h3>
              <p className={`text-sm leading-relaxed flex-1 ${p.destaque ? "text-white/75" : "text-km-muted"}`}>
                {p.descricao}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/procedimentos" className="btn-outline">
            Ver todos os procedimentos →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5.2: Commit**

```bash
git add src/components/sections/ProcedimentosDestaque.tsx
git commit -m "feat: ProcedimentosDestaque com 4 cards"
```

---

## Task 6: AboutSection + TestimonialsSection

**Files:**
- Create: `src/components/sections/AboutSection.tsx`, `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 6.1: Criar AboutSection.tsx**

```typescript
export function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-km-bg">
      <div className="container-km">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Placeholder foto */}
          <div className="rounded-card bg-km-border aspect-[4/5] flex items-center justify-center">
            <span className="text-km-muted text-sm">Foto Dra. Kelly Macedo</span>
          </div>

          <div>
            <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-4">
              Sobre a médica
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-km-dark mb-6">
              Dra. Kelly Macedo
            </h2>
            <div className="space-y-4 text-km-muted leading-relaxed">
              <p>
                Médica especialista em estética avançada, com mais de 10 anos dedicados
                a transformar a autoestima das suas pacientes em Curitiba.
              </p>
              <p>
                Formada em medicina com especialização em dermatologia estética,
                a Dra. Kelly combina técnica apurada e sensibilidade artística
                para resultados naturais e duradouros.
              </p>
              <p>
                Cada procedimento é precedido de uma avaliação personalizada,
                garantindo que o tratamento escolhido seja o mais adequado
                para a sua pele e o seu momento de vida.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-km-surface rounded-card px-5 py-3 text-center shadow-card">
                <div className="font-heading font-bold text-xl text-km-gold">CRM/PR</div>
                <div className="text-xs text-km-muted mt-1">Registro ativo</div>
              </div>
              <div className="bg-km-surface rounded-card px-5 py-3 text-center shadow-card">
                <div className="font-heading font-bold text-xl text-km-gold">10+</div>
                <div className="text-xs text-km-muted mt-1">Anos de prática</div>
              </div>
              <div className="bg-km-surface rounded-card px-5 py-3 text-center shadow-card">
                <div className="font-heading font-bold text-xl text-km-gold">15+</div>
                <div className="text-xs text-km-muted mt-1">Especializações</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.2: Criar TestimonialsSection.tsx**

```typescript
const depoimentos = [
  {
    nome: "Ana Paula S.",
    procedimento: "Harmonização Facial",
    texto: "Resultado incrível e muito natural. A Dra. Kelly entendeu exatamente o que eu queria e superou minhas expectativas.",
  },
  {
    nome: "Mariana C.",
    procedimento: "Endolaser",
    texto: "Fiz o Endolaser para papada e fiquei encantada. Recuperação rápida e resultado que eu não esperava tão bom.",
  },
  {
    nome: "Fernanda R.",
    procedimento: "Botox",
    texto: "Já é minha terceira vez com a Dra. Kelly. Resultado sempre natural, nunca aquela cara de frozen. Super indico!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-km-dark">
      <div className="container-km">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Depoimentos
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            O que dizem nossas pacientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((d) => (
            <div key={d.nome} className="bg-white/5 border border-white/10 rounded-card p-6 flex flex-col gap-4">
              <p className="text-km-gold text-xl font-heading">"</p>
              <p className="text-white/80 text-sm leading-relaxed flex-1">{d.texto}</p>
              <div>
                <div className="font-semibold text-white text-sm">{d.nome}</div>
                <div className="text-km-gold text-xs mt-0.5">{d.procedimento}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6.3: Commit**

```bash
git add src/components/sections/AboutSection.tsx src/components/sections/TestimonialsSection.tsx
git commit -m "feat: AboutSection e TestimonialsSection"
```

---

## Task 7: DifferentialsSection + FaqSection

**Files:**
- Create: `src/components/sections/DifferentialsSection.tsx`, `src/components/sections/FaqSection.tsx`

- [ ] **Step 7.1: Criar DifferentialsSection.tsx**

```typescript
const diferenciais = [
  {
    icone: "🔬",
    titulo: "Tecnologia de ponta",
    descricao: "Equipamentos certificados e técnicas atualizadas com as últimas evidências da medicina estética.",
  },
  {
    icone: "👩‍⚕️",
    titulo: "Atendimento médico exclusivo",
    descricao: "Todos os procedimentos realizados pela própria Dra. Kelly — sem delegação para técnicos.",
  },
  {
    icone: "✨",
    titulo: "Resultado natural",
    descricao: "A nossa filosofia é realçar a sua beleza, não transformar você em outra pessoa.",
  },
  {
    icone: "🤝",
    titulo: "Avaliação personalizada",
    descricao: "Cada paciente recebe um protocolo exclusivo, pensado para o seu caso e seu momento de vida.",
  },
];

export function DifferentialsSection() {
  return (
    <section className="section-padding bg-km-surface">
      <div className="container-km">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Por que nos escolher
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-km-dark">
            Nossos diferenciais
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="text-center p-6 rounded-card bg-km-bg shadow-card">
              <div className="text-4xl mb-4">{d.icone}</div>
              <h3 className="font-heading font-bold text-lg text-km-dark mb-3">{d.titulo}</h3>
              <p className="text-km-muted text-sm leading-relaxed">{d.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7.2: Criar FaqSection.tsx**

```typescript
"use client";

import { useState } from "react";

const faqs = [
  {
    pergunta: "Qual é o primeiro passo para fazer um procedimento?",
    resposta: "O primeiro passo é uma avaliação presencial com a Dra. Kelly. Nessa consulta, ela analisa a sua pele, entende seus objetivos e indica o protocolo mais adequado para o seu caso.",
  },
  {
    pergunta: "Quanto tempo dura a recuperação dos procedimentos?",
    resposta: "Depende do procedimento. Botox e preenchimento têm recuperação mínima (1–3 dias). Endolaser e peelings mais profundos podem exigir de 5 a 14 dias. A Dra. Kelly orienta cada caso individualmente.",
  },
  {
    pergunta: "Os resultados são permanentes?",
    resposta: "A duração varia por procedimento. Botox dura em média 4–6 meses, preenchimento 12–18 meses, e procedimentos como Endolaser têm resultados mais duradouros. Manutenções periódicas potencializam os resultados.",
  },
  {
    pergunta: "Como sei qual procedimento é indicado para mim?",
    resposta: "Só uma avaliação presencial pode indicar o protocolo correto. Cada pele e cada objetivo é único — nunca indicamos procedimentos sem avaliação.",
  },
  {
    pergunta: "Como é feito o agendamento?",
    resposta: "Você pode agendar pelo nosso site (formulário de contato), pelo WhatsApp ou conversar com a Luísa, nossa assistente virtual, que te orienta e agenda.",
  },
];

export function FaqSection() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="section-padding bg-km-bg">
      <div className="container-km max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-km-dark">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-km-surface rounded-card shadow-card overflow-hidden">
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-km-dark hover:text-km-gold transition-colors"
              >
                <span>{faq.pergunta}</span>
                <span className={`text-km-gold transition-transform ${aberto === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {aberto === i && (
                <div className="px-6 pb-5 text-km-muted text-sm leading-relaxed">
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7.3: Commit**

```bash
git add src/components/sections/DifferentialsSection.tsx src/components/sections/FaqSection.tsx
git commit -m "feat: DifferentialsSection e FaqSection"
```

---

## Task 8: LeadFormSection + FinalCtaSection + Footer + WhatsAppFab

**Files:**
- Create: `src/components/sections/LeadFormSection.tsx`, `src/components/sections/FinalCtaSection.tsx`, `src/components/sections/Footer.tsx`, `src/components/sections/WhatsAppFab.tsx`, `src/lib/whatsapp.ts`

- [ ] **Step 8.1: Criar src/lib/whatsapp.ts**

```typescript
export function getWhatsAppUrl(mensagem?: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5541999999999";
  const texto = mensagem ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
    ?? "Olá! Vim pelo site da KM Beauty e gostaria de informações sobre os procedimentos.";
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
```

- [ ] **Step 8.2: Criar LeadFormSection.tsx**

```typescript
"use client";

import { useState } from "react";

const procedimentos = [
  "Endolaser",
  "Harmonização Facial",
  "Toxina Botulínica (Botox)",
  "Preenchimento Labial",
  "Preenchimento Facial",
  "Bioestimulador de Colágeno",
  "Peeling Químico",
  "Microagulhamento",
  "Limpeza de Pele Premium",
  "Outro",
];

export function LeadFormSection() {
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    const form = e.currentTarget;
    const dados = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
      procedimento: (form.elements.namedItem("procedimento") as HTMLSelectElement).value,
    };
    // Plano B: integrar com /api/chat. Por ora, simula sucesso.
    await new Promise((r) => setTimeout(r, 800));
    console.log("Lead capturado:", dados);
    setEnviado(true);
    setCarregando(false);
  }

  return (
    <section id="agendar" className="section-padding bg-km-dark">
      <div className="container-km max-w-xl text-center">
        <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
          Primeiro passo
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Agende sua avaliação
        </h2>
        <p className="text-white/70 mb-10">
          Preencha o formulário e entraremos em contato para confirmar o horário.
        </p>

        {enviado ? (
          <div className="bg-km-gold/10 border border-km-gold rounded-card p-8 text-white">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-heading text-xl font-bold mb-2">Solicitação recebida!</h3>
            <p className="text-white/70 text-sm">
              Em breve entraremos em contato para confirmar sua avaliação com a Dra. Kelly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Nome</label>
              <input
                name="nome"
                type="text"
                required
                placeholder="Seu nome completo"
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-km-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">WhatsApp</label>
              <input
                name="telefone"
                type="tel"
                required
                placeholder="(41) 99999-9999"
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-km-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Procedimento de interesse</label>
              <select
                name="procedimento"
                required
                className="w-full bg-white/5 border border-white/20 text-white rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-km-gold transition-colors"
              >
                <option value="">Selecione...</option>
                {procedimentos.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={carregando}
              className="btn-primary mt-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? "Enviando..." : "Quero agendar minha avaliação →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 8.3: Criar FinalCtaSection.tsx**

```typescript
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="section-padding bg-km-gold">
      <div className="container-km text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Sua beleza merece cuidado especializado
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Dê o primeiro passo. Agende sua avaliação gratuita com a Dra. Kelly
          e descubra o protocolo ideal para você.
        </p>
        <Link
          href="/contato"
          className="inline-block bg-white text-km-gold font-bold px-8 py-4 rounded-btn hover:bg-km-bg transition-colors shadow-card"
        >
          Agendar agora — é gratuito
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 8.4: Criar Footer.tsx**

```typescript
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-km-dark text-white/60 py-12 px-4">
      <div className="container-km grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="font-heading font-bold text-lg text-white mb-3">
            <span className="text-km-gold">KM</span> Beauty
          </div>
          <p className="text-sm leading-relaxed">
            Estética avançada com a Dra. Kelly Macedo em Curitiba/PR.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Navegação</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#procedimentos" className="hover:text-km-gold transition-colors">Procedimentos</Link></li>
            <li><Link href="/#sobre" className="hover:text-km-gold transition-colors">Sobre a Dra. Kelly</Link></li>
            <li><Link href="/contato" className="hover:text-km-gold transition-colors">Contato e agendamento</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Contato</div>
          <ul className="space-y-2 text-sm">
            <li>Curitiba / PR</li>
            <li><Link href="/contato" className="hover:text-km-gold transition-colors">Agendar avaliação</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-km border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <span>© {new Date().getFullYear()} KM Beauty — Dra. Kelly Macedo. Todos os direitos reservados.</span>
        {/* Link admin discreto — não indexado */}
        <Link
          href="/crm"
          className="text-white/20 hover:text-white/40 transition-colors"
          target="_blank"
          rel="noopener noreferrer noindex"
        >
          Área restrita
        </Link>
      </div>
    </footer>
  );
}
```

- [ ] **Step 8.5: Criar WhatsAppFab.tsx**

```typescript
"use client";

import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
```

- [ ] **Step 8.6: Garantir link interno para `/crm` no footer**

- [ ] **Step 8.7: Commit**

```bash
git add src/components/sections/ src/lib/
git commit -m "feat: LeadFormSection, FinalCta, Footer, WhatsAppFab e lib/whatsapp"
```

---

## Task 9: Páginas — home, /procedimentos, /contato

**Files:**
- Create: `src/app/page.tsx`, `src/app/procedimentos/page.tsx`, `src/app/contato/page.tsx`

- [ ] **Step 9.1: Criar src/app/page.tsx (home)**

```typescript
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AuthorityBar } from "@/components/sections/AuthorityBar";
import { ProcedimentosDestaque } from "@/components/sections/ProcedimentosDestaque";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AuthorityBar />
        <ProcedimentosDestaque />
        <AboutSection />
        <TestimonialsSection />
        <DifferentialsSection />
        <FaqSection />
        <LeadFormSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
      {/* LuisaChatWidget — Plano B */}
    </>
  );
}
```

- [ ] **Step 9.2: Criar src/app/procedimentos/page.tsx**

```typescript
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procedimentos | KM Beauty — Dra. Kelly Macedo",
  description: "Conheça todos os procedimentos estéticos da clínica KM Beauty: Endolaser, harmonização facial, botox, preenchimento e muito mais.",
};

const todos = [
  { nome: "Endolaser", descricao: "Lipólise a laser minimamente invasiva para papada, abdômen e flancos. Resultados definitivos com mínima recuperação." },
  { nome: "Harmonização Facial", descricao: "Reequilíbrio dos traços com ácido hialurônico. Preenchimento de olheiras, malar, mandíbula e queixo." },
  { nome: "Toxina Botulínica (Botox)", descricao: "Suavização de rugas dinâmicas. Olhar descansado e natural, com duração de 4–6 meses." },
  { nome: "Preenchimento Labial", descricao: "Volume e definição nos lábios com ácido hialurônico. Resultado harmonioso e personalizado." },
  { nome: "Preenchimento Facial", descricao: "Restauração de volumes perdidos no rosto. Tratamento de olheiras, bochechas e mandíbula." },
  { nome: "Harmonização de Orelhas", descricao: "Procedimento estético para correção da proporção e formato das orelhas." },
  { nome: "Bioestimulador de Colágeno", descricao: "Sculptra e Radiesse para tratar flacidez facial e corporal, estimulando colágeno natural." },
  { nome: "Peelings Químicos", descricao: "Renovação celular, melhora da textura, controle de oleosidade e clareamento de manchas." },
  { nome: "Microagulhamento", descricao: "Estímulo de colágeno para poros dilatados, cicatrizes e melhora geral da textura da pele." },
  { nome: "Limpeza de Pele Premium", descricao: "Higienização profunda, remoção de impurezas e cravos com hidratação e nutrição intensiva." },
];

export default function ProcedimentosPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="section-padding bg-km-dark text-center">
          <div className="container-km max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Procedimentos
            </h1>
            <p className="text-white/70 text-lg">
              Cada tratamento é personalizado para o seu caso após avaliação presencial com a Dra. Kelly.
            </p>
          </div>
        </section>

        <section className="section-padding bg-km-bg">
          <div className="container-km grid grid-cols-1 md:grid-cols-2 gap-6">
            {todos.map((p) => (
              <div key={p.nome} className="bg-km-surface rounded-card p-6 shadow-card">
                <h3 className="font-heading font-bold text-xl text-km-dark mb-3">{p.nome}</h3>
                <p className="text-km-muted text-sm leading-relaxed mb-4">{p.descricao}</p>
                <Link href="/contato" className="text-km-gold text-sm font-semibold hover:underline">
                  Agendar avaliação →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
```

- [ ] **Step 9.3: Criar src/app/contato/page.tsx**

```typescript
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato e Agendamento | KM Beauty",
  description: "Agende sua avaliação gratuita com a Dra. Kelly Macedo. Entre em contato pelo WhatsApp ou formulário.",
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <LeadFormSection />
        {/* LuisaChatWidget seção dedicada — Plano B */}
        <section className="section-padding bg-km-bg text-center">
          <div className="container-km max-w-xl">
            <h2 className="font-heading text-2xl font-bold text-km-dark mb-4">
              Prefere falar agora?
            </h2>
            <p className="text-km-muted mb-6">
              Clique no botão verde e converse diretamente pelo WhatsApp.
              A nossa assistente Luísa também está disponível no chat ao lado.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
```

- [ ] **Step 9.4: Testar o build local**

```bash
npm run build
```

Esperado: build sem erros. Se houver erro de tipos, corrigir antes de continuar.

- [ ] **Step 9.5: Rodar dev e confirmar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:3000` e verificar:
- [ ] Home carrega com todas as seções
- [ ] `/procedimentos` lista todos os procedimentos
- [ ] `/contato` mostra o formulário
- [ ] Header fixo no topo funciona
- [ ] WhatsAppFab visível no canto inferior direito
- [ ] Menu mobile funciona

- [ ] **Step 9.6: Commit**

```bash
git add src/app/
git commit -m "feat: páginas home, /procedimentos e /contato"
```

---

## Task 10: GitHub repo + Vercel deploy

**Files:** nenhum novo — só configuração externa

- [ ] **Step 10.1: Criar repositório GitHub**

```bash
gh repo create kmbeauty.site --public --description "Site da clínica KM Beauty (kmbeauty.com.br) — Next.js 16" --source=. --remote=origin --push
```

Esperado: repositório criado em `github.com/esdras3/kmbeauty.site` e todos os commits enviados.

- [ ] **Step 10.2: Verificar que o push foi feito**

```bash
git log --oneline origin/main | head -5
```

Esperado: os commits das Tasks 1–9 listados.

- [ ] **Step 10.3: Criar .env.local com as variáveis**

```bash
# Copiar o exemplo e preencher
cp .env.local.example .env.local
```

Editar `.env.local` — deixar `KMBEAUTY_N8N_WEBHOOK_SECRET` vazio por ora (Plano B):
```
NEXT_PUBLIC_WHATSAPP_NUMBER=5541999999999
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Vim pelo site da KM Beauty e gostaria de informações sobre os procedimentos.
Link interno do CRM: `/crm`
```

- [ ] **Step 10.4: Deploy na Vercel via CLI**

```bash
npx vercel --yes --name kmbeauty-site
```

Na sequência de perguntas:
- Framework: Next.js (detectado automaticamente)
- Root directory: `.` (raiz)
- Build command: `npm run build` (padrão)

Anotar a URL de preview gerada (ex: `kmbeauty-site-xxxx.vercel.app`).

- [ ] **Step 10.5: Configurar variáveis de ambiente na Vercel**

```bash
npx vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
# digitar: 5541999999999

npx vercel env add NEXT_PUBLIC_WHATSAPP_MESSAGE production
# digitar: Olá! Vim pelo site da KM Beauty e gostaria de informações sobre os procedimentos.

# nao e mais necessario publicar `NEXT_PUBLIC_ADMIN_URL`
```

- [ ] **Step 10.6: Deploy de produção**

```bash
npx vercel --prod
```

Esperado: URL de produção no formato `kmbeauty-site.vercel.app`.

- [ ] **Step 10.7: Acessar o site e verificar**

Abrir a URL de produção e confirmar:
- [ ] Home carrega sem erros
- [ ] Todas as seções aparecem
- [ ] WhatsApp abre no número correto
- [ ] Link "Área restrita" no footer aponta para o dashboard

- [ ] **Step 10.8: Commit final com URL documentada**

```bash
git commit --allow-empty -m "chore: deploy Vercel produção — Plano A concluído"
```

---

## Self-Review

### Cobertura do spec

| Requisito do spec | Tarefa |
|------------------|--------|
| Estrutura híbrida (home + /procedimentos + /contato) | Task 9 |
| Header com CTA "Agendar Avaliação" | Task 3 |
| HeroSection | Task 4 |
| AuthorityBar | Task 4 |
| ProcedimentosDestaque (4 cards) | Task 5 |
| AboutSection | Task 6 |
| TestimonialsSection | Task 6 |
| DifferentialsSection | Task 7 |
| FaqSection | Task 7 |
| LeadFormSection | Task 8 |
| FinalCtaSection | Task 8 |
| Footer com link admin discreto | Task 8 |
| WhatsAppFab | Task 8 |
| Brand colors km-gold #C49030 | Task 1 |
| GitHub repo kmbeauty.site | Task 10 |
| Vercel deploy | Task 10 |
| LuisaChatWidget | ⏳ Plano B |
| /api/chat → n8n | ⏳ Plano B |
| Dual write PostgreSQL + Notion | ⏳ Plano B |

### Tipos e interfaces consistentes

- `getWhatsAppUrl()` definida em `src/lib/whatsapp.ts` (Task 8.1) e usada em `WhatsAppFab.tsx` (Task 8.5) — ✅ consistente
- Todos os componentes exportados como named exports — ✅
- Imports `@/*` mapeados para `./src/*` via tsconfig — ✅
