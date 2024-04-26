import Link from "next/link";
import ExportButton from "~/app/(protected)/document/[id]/export-button";
import ShareButton from "~/app/(protected)/document/[id]/share-button";
import TitleEditor from "~/app/(protected)/document/[id]/title-editor";
import UserDisplay from "~/app/(protected)/document/[id]/user-display";
import { Logo } from "~/components/logo";

export default async function Appbar({ title }: { title: string }) {
  return (
    <div className={"w-full border-b"}>
      <div className={"flex h-20 w-full items-center justify-between px-6"}>
        <div>
          <Logo className={"w-24 text-primary"} />
        </div>
        <div className={"absolute left-1/2 flex -translate-x-1/2 gap-2 text-xl"}>
          <Link href={"/"} className={"text-primary/60 hover:underline"}>
            All documents
          </Link>
          <p className={"text-primary/60"}>/</p>
          <TitleEditor title={title} />
        </div>
        <div className={"flex gap-2"}>
          <UserDisplay />
          <ExportButton />
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
