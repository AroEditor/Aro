import { AuthResponse } from "@supabase/auth-js/src/lib/types";
import { createClient } from "~/utils/supabase/server";

export default async function signIn({ email, password }: { email: string; password: string }) {
  "use server";

  const supabase = createClient();

  const res = (await supabase.auth.signInWithPassword({
    email,
    password,
  })) as AuthResponse;

  return { success: !res.error, data: res.data, error: res.error?.message };
}
