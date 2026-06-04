"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getDefaultLuisaActions, type LuisaChatAction } from "@/lib/luisaChat";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface Message {
  id: string;
  sender: "user" | "luisa";
  text: string;
}

export function LuisaChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "luisa",
      text: "Olá! Seja bem-vinda à KM Beauty. 🌸\n\nSou a Luísa, assistente da Dra. Kelly Macedo. Posso te ajudar a conhecer nossos procedimentos e agendar sua avaliação.\n\nComo posso te ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    return (
      window.localStorage.getItem("luisa_kmbeauty_session") ??
      `site_${Math.random().toString(36).slice(2, 11)}`
    );
  });
  const [tooltipDismissed, setTooltipDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("luisa_kmbeauty_opened") === "true";
  });
  const [actions, setActions] = useState<LuisaChatAction[]>(() =>
    getDefaultLuisaActions(typeof window !== "undefined" ? window.location.pathname : undefined)
  );

  // Atualiza ações quando a página muda (navegação sem reload)
  useEffect(() => {
    setActions(getDefaultLuisaActions(pathname));
  }, [pathname]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!sessionId) return;
    window.localStorage.setItem("luisa_kmbeauty_session", sessionId);
  }, [sessionId]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    setInput("");
    setMessages((p) => [...p, { id: Math.random().toString(), sender: "user", text }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId, page: window.location.pathname }),
      });
      const data = (await res.json()) as { reply?: string; session_id?: string };
      if (data.session_id) {
        setSessionId(data.session_id);
        localStorage.setItem("luisa_kmbeauty_session", data.session_id);
      }
      setMessages((p) => [...p, {
        id: Math.random().toString(),
        sender: "luisa",
        text: data.reply ?? "Peço desculpas, tive uma oscilação. Pode repetir?",
      }]);
    } catch {
      setMessages((p) => [...p, {
        id: Math.random().toString(),
        sender: "luisa",
        text: "Peço desculpas, tive uma oscilação na conexão. Tente novamente. 🤍",
      }]);
    } finally {
      setIsTyping(false);
      setActions(getDefaultLuisaActions(pathname));
    }
  }

  function handleAction(action: LuisaChatAction) {
    if (action.type === "whatsapp") {
      window.open(getWhatsAppUrl(action.value), "_blank", "noopener,noreferrer");
      return;
    }
    if (action.type === "link") {
      window.location.assign(action.value);
      return;
    }
    sendMessage(action.value);
  }

  function handleToggle() {
    setIsOpen((o) => !o);
    setTooltipDismissed(true);
    sessionStorage.setItem("luisa_kmbeauty_opened", "true");
  }

  return (
    <>
      {/* Tooltip de convite */}
      {!isOpen && !tooltipDismissed && (
        <div className="fixed bottom-36 right-2 z-50 select-none md:bottom-7 md:right-40">
          <div
            onClick={handleToggle}
            className="relative flex max-w-[220px] cursor-pointer items-center gap-2 rounded-xl border border-km-border bg-white px-4 py-2.5 text-xs font-medium text-km-dark shadow-card md:max-w-[240px]"
          >
            <span>Dúvidas? Fale com a Luísa! 🌸</span>
            <button
              onClick={(e) => { e.stopPropagation(); setTooltipDismissed(true); }}
              className="flex h-7 w-7 items-center justify-center rounded-full p-0.5 text-km-muted transition-colors hover:bg-km-bg hover:text-km-dark"
              aria-label="Fechar"
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="absolute -bottom-[6px] right-6 h-3 w-3 rotate-45 border-r border-b border-km-border bg-white md:-right-[6px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:border-b-0 md:border-t" />
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={handleToggle}
        className="fixed bottom-[4.5rem] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-km-gold text-white shadow-gold transition-all duration-300 hover:scale-110 hover:bg-km-gold-hover md:bottom-6 md:right-24"
        aria-label="Conversar com a Luísa"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <div className="relative flex items-center justify-center w-full h-full">
            <span className="text-xl">🌸</span>
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
          </div>
        )}
      </button>

      {/* Painel do chat */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-[8.5rem] z-50 flex h-[min(68vh,520px)] flex-col overflow-hidden rounded-card border border-km-border bg-km-surface shadow-soft md:inset-x-auto md:bottom-24 md:right-24 md:h-[540px] md:w-[400px]">
          {/* Header */}
          <div className="bg-km-dark text-white px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-km-gold/20 rounded-full flex items-center justify-center text-lg border border-km-gold/40">
              🌸
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white leading-none">
                Luísa | KM Beauty
              </h4>
              <span className="text-xs text-white/60 mt-1 block">
                Assistente da Dra. Kelly Macedo
              </span>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-km-bg">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.sender === "user"
                    ? "bg-km-gold text-white"
                    : "bg-white text-km-dark border border-km-border"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-km-border rounded-2xl px-4 py-3 text-sm flex items-center gap-1.5 text-km-muted">
                  <span>Digitando</span>
                  <span className="flex gap-0.5 mt-0.5">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className="w-1.5 h-1.5 bg-km-gold rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Ações sugeridas */}
          {!isTyping && actions.length > 0 && (
            <div className="px-4 py-2 bg-white border-t border-km-border flex flex-wrap gap-1.5">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleAction(action)}
                  className="px-2.5 py-1.5 bg-km-bg hover:bg-km-border text-xs font-medium text-km-dark rounded-full border border-km-border transition-colors cursor-pointer"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="p-3 border-t border-km-border bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre procedimentos..."
              className="flex-1 bg-km-bg border border-km-border text-sm px-4 py-2.5 rounded-btn focus:outline-none focus:border-km-gold text-km-dark placeholder:text-km-muted transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-km-gold hover:bg-km-gold-hover text-white rounded-btn transition-colors disabled:opacity-40 disabled:cursor-not-allowed w-10 h-10 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
