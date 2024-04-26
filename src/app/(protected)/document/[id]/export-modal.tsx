import Link from "next/link";
import { useEditorStore } from "~/app/(protected)/document/[id]/editor";
import { buttonVariants } from "~/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import convertNodeToLatex from "~/lib/convert-node-to-latex";
import createOverleafUrl from "~/lib/create-overleaf-url";
import { cn } from "~/lib/utils";

export default function ExportModal() {
  const { editor } = useEditorStore();

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Export document</DialogTitle>
        <DialogDescription>Choose the export destination for your document.</DialogDescription>
      </DialogHeader>
      <div className={"w-full space-y-2"}>
        <Link
          href={createOverleafUrl(convertNodeToLatex((editor?.getJSON() || {}) as any))}
          target={"_blank"}
          className={cn(buttonVariants(), "w-full bg-green-700 hover:bg-green-800")}
        >
          Export to Overleaf
        </Link>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(buttonVariants(), "w-full bg-gray-700 text-primary-foreground hover:bg-gray-800")}
                disabled
              >
                Download .zip file
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </DialogContent>
  );
}
