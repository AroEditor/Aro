"use server";

import { createClient } from "~/lib/supabase/server";

export default async function saveDocContent({ id, content }: { id: string; content: object }) {
  "use server";

  const supabase = createClient();

  const res = await supabase.from("documents").update({ content, last_edited: new Date() }).eq("id", id);

  return { success: !res.error, data: res.data, error: res.error?.message };
}
