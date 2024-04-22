import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const projects = [
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024" },
  { name: "Document name", edited: "00:00 AM - Apr 8, 2024" },
];

export default function ProjectGrid() {
  return (
    <div>
      <h2 className={"pl-7 pt-7 text-2xl font-semibold text-black"}>All Projects</h2>

      <div className={"grid grid-cols-3 items-start justify-center gap-6 p-6"}>
        <button className={cn(buttonVariants({ variant: "outline" }), "flex h-64 w-full bg-white")}>
          <PlusCircleIcon className={"w-16 text-muted-foreground"} />
        </button>
        {projects.map((project, index) => (
          <Link
            href={"/document"}
            key={index}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex h-64 w-full flex-col gap-2 rounded-lg bg-white p-4"
            )}
          >
            <div className={"flex w-full flex-1 items-center justify-center rounded-md bg-muted"}>
              <DocumentTextIcon className={"w-16 text-primary"} />
            </div>
            <div className={"w-full p-2 text-left text-black"}>
              <div className={"my-2 text-lg font-bold text-black"}>{project.name}</div>
              <div className={"text-sm text-black"}>Edited {project.edited}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
