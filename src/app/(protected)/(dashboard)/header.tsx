import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "~/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { UserMenu } from "~/components/user-menu";

export default function Header() {
  return (
    <header className={"sticky top-0 flex h-20 items-center justify-between gap-6 overflow-hidden border-b px-6"}>
      <div className={"relative flex-grow"}>
        <div className={"flex items-center"}>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  placeholder={"Search in Aro"}
                  className={"border-0 bg-muted pl-9 text-base shadow-none"}
                  disabled
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <MagnifyingGlassIcon className={"absolute ml-2 w-5 text-muted-foreground"} />
        </div>
      </div>
      <div>
        <UserMenu />
      </div>
    </header>
  );
}
