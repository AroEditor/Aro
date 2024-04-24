import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 405 });

  const { data, error } = await supabase
    .from("documents")
    .insert([{ author_id: user?.id }])
    .select("id");

  if (data) redirect("/document/" + data[0].id);

  return new Response("Error", { status: 500 });
}
