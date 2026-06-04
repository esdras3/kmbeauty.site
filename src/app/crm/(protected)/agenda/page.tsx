import { requireAuth } from "@/lib/crm/auth";
import { AgendaView } from "@/components/crm/AgendaView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda | KM Beauty CRM",
};

export default async function AgendaPage() {
  await requireAuth();
  return <AgendaView />;
}
