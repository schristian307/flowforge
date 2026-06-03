"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

export type LoginResult =
  | { success: true }
  | { success: false; error: string };

export async function loginAdmin(
  email: string,
  password: string,
  redirectTo = "/dashboard"
): Promise<LoginResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const userEmail = data.user?.email;
  if (!userEmail || !isAdminEmail(userEmail)) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: "This email is not authorized for admin access.",
    };
  }

  redirect(redirectTo);
}

export async function checkIsAdminEmail(email: string): Promise<boolean> {
  return isAdminEmail(email);
}
