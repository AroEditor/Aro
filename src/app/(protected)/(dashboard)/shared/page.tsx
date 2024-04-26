import { createClient } from "~/lib/supabase/server";
import DocumentSchema from "~/types/DocumentSchema";

import ProjectGrid from "../project-grid";

export const revalidate = 0;

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = (await supabase
    .from("documents")
    .select("*")
    .or(`shared_emails.cs.{"${user?.email}"}`)
    .order("last_edited", { ascending: false })) as {
    data: DocumentSchema[];
  };

  return (
    <div>
      <h2 className={"pl-7 pt-7 text-2xl font-semibold text-black"}>Shared with you</h2>
      <ProjectGrid documents={data} />
    </div>
  );
}
