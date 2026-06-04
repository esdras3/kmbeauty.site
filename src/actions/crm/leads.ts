"use server";

import { revalidatePath } from "next/cache";
import { patchLead } from "@/lib/crm/api";

export async function updateLeadStatus(
  leadId: number,
  status: string
): Promise<void> {
  await patchLead(leadId, { status });
  revalidatePath("/crm/leads");
  revalidatePath(`/crm/leads/${leadId}`);
}
