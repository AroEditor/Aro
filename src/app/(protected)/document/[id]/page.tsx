import { notFound } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import DocumentSchema from "~/types/DocumentSchema";
import ProfileSchema from "~/types/ProfileSchema";

import Appbar from "./appbar";
import Main from "./main";

export default async function EditorPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data } = (await supabase.from("documents").select("*").eq("id", params.id).single()) as {
    data?: DocumentSchema;
  };

  if (!data) return notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = (await supabase.from("profiles").select("*").eq("id", user?.id).single()) as {
    data?: ProfileSchema;
  };

  if (user?.id !== data.author_id && !data.shared_emails.includes(profile?.email || "")) return notFound();

  return (
    <div className={"flex w-full flex-1 flex-col"}>
      <Appbar title={data.title || "My Document"} />
      <Main id={params.id} content={data.content} profile={profile!} />
    </div>
  );
}
