import { createClient } from "~/lib/supabase/server";
import DocumentSchema from "~/types/DocumentSchema";

import Header from "./header";
import ProjectGrid from "./project-grid";
import Sidebar from "./sidebar";

export const revalidate = 0;

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = (await supabase
    .from("documents")
    .select("*")
    .eq("author_id", user?.id)
    .order("last_edited", { ascending: false })) as {
    data: DocumentSchema[];
  };

  console.log();

  return (
    <div className={"flex h-screen w-full"}>
      <Sidebar />
      <main className={"flex-grow overflow-y-auto bg-white"}>
        <Header />
        <ProjectGrid documents={data} />
      </main>
    </div>
  );
}
