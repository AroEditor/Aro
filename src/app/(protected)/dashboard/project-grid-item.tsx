import { TrashIcon } from "@heroicons/react/16/solid";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { createClient } from "~/lib/supabase/client";
import { cn } from "~/lib/utils";
import DocumentSchema from "~/types/DocumentSchema";

export default function ProjectGridItem({
  document,
  onDelete,
}: {
  document: DocumentSchema;
  onDelete: (id: string) => void;
}) {
  const supabase = createClient(); // Initialize the client-side Supabase instance

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href={"/document/" + document.id}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-64 w-full flex-col gap-2 rounded-lg bg-white p-4 transition hover:bg-white hover:shadow-md"
          )}
        >
          <div className={"flex w-full flex-1 items-center justify-center rounded-md bg-muted"}>
            <DocumentTextIcon className={"w-16 text-primary"} />
          </div>
          <div className={"w-full p-2 text-left text-black"}>
            <div className={"my-2 text-lg font-bold text-black"}>{document.title || "My Document"}</div>
            <div className={"truncate text-sm text-black opacity-50"}>
              Edited {dayjs().to(dayjs(document.last_edited as string))}
            </div>
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem className={"!text-red-500"} onSelect={() => onDelete(document.id)}>
          <TrashIcon className={"mr-2 w-4"} />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
