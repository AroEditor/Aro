"use client";

import { useEffect, useState } from "react";

import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useEditorStore } from "~/app/(protected)/document/[id]/editor";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { createClient } from "~/lib/supabase/client";

export default function UserDisplay() {
  const { editor } = useEditorStore();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setId(user?.id || "");
    });
  }, []);

  const users: { name: string; id: string }[] = editor?.storage.collaborationCursor.users || [];

  if (!id) return null;

  return (
    <>
      {users
        .filter(user => !!user.id && user.id !== id)
        .map(user => (
          <TooltipProvider key={user.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <UserCircleIcon className={"w-8"} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </>
  );
}
