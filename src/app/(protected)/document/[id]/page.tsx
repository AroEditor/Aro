import { notFound } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import DocumentSchema from "~/types/DocumentSchema";

import Appbar from "./appbar";
import Editor from "./editor";

export default async function EditorPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data } = (await supabase.from("documents").select("*").eq("id", params.id).single()) as {
    data?: DocumentSchema;
  };

  if (!data) return notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id !== data.author_id) return notFound();

  return (
    <div className={"flex w-full flex-1 flex-col"}>
      <Appbar title={data.title || "My Document"} />
      <div className={"mx-auto flex w-full flex-1"}>
        <div className={"w-full max-w-xs border-r p-8"}></div>
        <div className={"flex flex-1"}>
          <div className={"flex-1 bg-white"}>
            <Editor id={params.id} content={data.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
