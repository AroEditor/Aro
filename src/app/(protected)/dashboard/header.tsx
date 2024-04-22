import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "~/components/ui/input";

export default function Header() {
  return (
    <header className={"sticky top-0 flex h-20 items-center justify-between gap-6 overflow-hidden border-b px-6"}>
      <div className={"relative flex-grow"}>
        <div className={"flex items-center"}>
          <Input placeholder={"Search in Aro"} className={"border-0 bg-muted pl-9 text-base shadow-none"} />
          <MagnifyingGlassIcon className={"absolute ml-2 w-5 text-muted-foreground"} />
        </div>
      </div>
    </header>
  );
}
