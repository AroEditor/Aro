"use server";

import { createClient } from "~/lib/supabase/server";

export default async function saveDocTitle({ id, title }: { id: string; title: string }) {
  "use server";

  const supabase = createClient();

  const res = await supabase.from("documents").update({ title }).eq("id", id);

  return { success: !res.error, data: res.data, error: res.error?.message };
}
