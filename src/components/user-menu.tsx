"use client";

import { useEffect, useState } from "react";

import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import signOut from "~/lib/actions/signOut";
import { createClient } from "~/lib/supabase/client";

export function UserMenu() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setName(user?.email || "");
    });
  }, []);

  return (
    <div className={"flex w-full items-center pb-6"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className={"h-14 w-full gap-4 bg-white"}>
            <UserCircleIcon className={"w-10 shrink-0 text-primary"} />
            <p className={"flex-1 truncate text-left"}>{name || "..."}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mb-1 w-56" align={"start"}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className={"font-medium !text-red-500"} onClick={() => signOut()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
