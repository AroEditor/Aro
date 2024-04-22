import Link from "next/link";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";

export default function Appbar() {
  return (
    <div className={"w-full"}>
      <div className={"flex h-20 w-full items-center justify-between px-6"}>
        <div>
          <Logo className={"w-24 text-primary"} />
        </div>
        <div className={"absolute left-1/2 flex -translate-x-1/2 gap-2 text-xl"}>
          <Link href={"/dashboard"} className={"text-primary/60 hover:underline"}>
            All documents
          </Link>
          <p className={"text-primary/60"}>/</p>
          <p className={"font-bold"}>My Document</p>
        </div>
        <div className={"flex gap-2"}>
          <Button variant={"outline"} className={"bg-transparent shadow-none"}>
            Export
          </Button>
          <Button className={"shadow-none"}>Share</Button>
        </div>
      </div>
    </div>
  );
}
