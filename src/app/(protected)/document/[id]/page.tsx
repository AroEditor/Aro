import { notFound } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

import Appbar from "./appbar";
import Editor from "./editor";

export default async function EditorPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data } = await supabase.from("documents").select("*").eq("id", params.id).single();

  if (!data) return notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id !== data.author_id) return notFound();

  return (
    <div className={"flex w-full flex-1 flex-col"}>
      <Appbar />
      <div className={"mx-auto flex w-full flex-1"}>
        <div className={"w-full max-w-xs border-r p-8"}></div>
        <div className={"flex flex-1"}>
          <div className={"flex-1 bg-white"}>
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}
