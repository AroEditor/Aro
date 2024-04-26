import { AuthResponse } from "@supabase/auth-js/src/lib/types";
import { headers } from "next/headers";
import { createClient } from "~/lib/supabase/server";

export default async function signUp({ email, password }: { email: string; password: string }) {
  "use server";

  const supabase = createClient();

  const origin = headers().get("origin");

  const res = (await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })) as AuthResponse;

  if (res.data) {
    await supabase.from("profiles").insert([
      {
        id: res.data.user?.id,
        name: email,
        email,
      },
    ]);
  }

  return { success: !res.error, data: res.data, error: res.error?.message };
}
