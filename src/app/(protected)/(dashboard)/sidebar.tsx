"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import { ArchiveBoxIcon, HomeIcon, TrashIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "~/components/logo";
import { buttonVariants } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

const links = [
  { title: "Home", icon: HomeIcon, href: "/" },
  { title: "Your documents", icon: UserIcon, href: "/documents" },
  { title: "Shared with you", icon: UserGroupIcon, href: "/shared" },
  { title: "Archive", icon: ArchiveBoxIcon },
  { title: "Trash", icon: TrashIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={"flex h-full w-full max-w-xs flex-shrink-0 flex-col border-r px-6"}>
      <div className={"flex h-20 items-center"}>
        <Logo className={"w-24 text-primary"} />
      </div>

      <div className={"w-full flex-grow space-y-1"}>
        {links.map(({ title, icon: Icon, href }, i) => {
          const link = (
            <Link
              key={i}
              href={href || "#"}
              className={cn(
                `-mx-3 flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-black transition-all`,
                pathname === href && "!bg-primary/10 text-primary",
                !href ? "opacity-50" : "hover:bg-primary/5"
              )}
            >
              <Icon className={"w-6"} />
              <p>{title}</p>
            </Link>
          );

          return href ? (
            link
          ) : (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side={"right"}>
                  <p>Coming soon!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className={"w-full pb-6"}>
        <Link href={"/document"} className={cn(buttonVariants(), "flex h-12 w-full justify-start")}>
          <PlusIcon className={"w-6"} />
          <span className={"ml-2 text-base font-semibold"}>New Document</span>
        </Link>
      </div>
    </div>
  );
}
