import { ArchiveBoxIcon, HomeIcon, TrashIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Logo } from "~/components/logo";
import { UserMenu } from "~/components/user-menu";
import { cn } from "~/lib/utils";

const links = [
  { title: "Home", icon: HomeIcon },
  { title: "Your documents", icon: UserIcon },
  { title: "Shared with you", icon: UserGroupIcon },
  { title: "Archive", icon: ArchiveBoxIcon },
  { title: "Trash", icon: TrashIcon },
];

export default function Sidebar() {
  return (
    <div className={"flex h-full w-full max-w-xs flex-shrink-0 flex-col border-r px-6"}>
      <div className={"flex h-20 items-center"}>
        <Logo className={"w-24 text-primary"} />
      </div>

      <div className={"w-full flex-grow space-y-1"}>
        {links.map(({ title, icon: Icon }, i) => (
          <Link
            key={i}
            href={"#"}
            className={cn(
              `-mx-3 flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-black transition-all hover:bg-primary/5`,
              i === 0 && "!bg-primary/10 text-primary"
            )}
          >
            <Icon className={"w-6"} />
            <p>{title}</p>
          </Link>
        ))}
      </div>
      <UserMenu />
    </div>
  );
}
