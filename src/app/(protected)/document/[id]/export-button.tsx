"use client";

import { FaFileExport, FaFolderOpen } from "react-icons/fa6";
import ExportModal from "~/app/(protected)/document/[id]/export-modal";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

export default function ExportButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={"shadow-none"}>Export</Button>
      </PopoverTrigger>

      <PopoverContent className={"w-96 origin-top-right space-y-2 rounded-lg p-4"} align={"end"}>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={
                  "flex w-full items-center gap-4 rounded-md border border-primary bg-primary/10 px-4 py-2 opacity-50"
                }
                disabled
              >
                <FaFolderOpen className={"h-full w-8 text-primary"} />
                <div className={"flex-1 text-left"}>
                  <p className={"font-semibold"}>Templates</p>
                  <p className={"text-sm"}>Browse & pick a template.</p>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog>
          <DialogTrigger asChild>
            <button
              className={"flex w-full items-center gap-4 rounded-md border border-primary bg-primary/10 px-4 py-2"}
            >
              <FaFileExport className={"h-full w-8 text-primary"} />
              <div className={"flex-1 text-left"}>
                <p className={"font-semibold"}>Export to LaTeX</p>
                <p className={"text-sm"}>Prepare document as LaTeX project.</p>
              </div>
            </button>
          </DialogTrigger>
          <ExportModal />
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
