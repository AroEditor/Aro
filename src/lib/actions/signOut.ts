"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

const signOut = async () => {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
};

export default signOut;
