"use server";

import { contactSchema } from "@/lib/validations/contact";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/contact";

export async function submitContact(
  formData: unknown
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data";
    return { success: false, error: firstError };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("contacts").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    service: parsed.data.service,
    budget: parsed.data.budget,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Contact submission error:", error);
    return {
      success: false,
      error: "Failed to submit your message. Please try again later.",
    };
  }

  return { success: true };
}
