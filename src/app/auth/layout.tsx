import React from "react";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

export default async function ProtectedPage({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}
