"use client";

import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
import ShareModal from "~/app/(protected)/document/[id]/share-modal";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";

export default function ShareButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={"px-2 shadow-none"}>
          <ArrowUpOnSquareIcon className={"w-5"} />
        </Button>
      </DialogTrigger>

      <ShareModal />
    </Dialog>
  );
}
