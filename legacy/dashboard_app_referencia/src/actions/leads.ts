"use server";

import { revalidatePath } from "next/cache";
import { patchLead } from "@/lib/api";

export async function updateLeadStatus(
  leadId: number,
  status: string
): Promise<void> {
  await patchLead(leadId, { status });
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);
}
